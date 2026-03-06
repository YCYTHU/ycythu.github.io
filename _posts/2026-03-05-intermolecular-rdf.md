---
title: 利用GROMACS计算RDF时避免分子内峰的Fortran脚本
tags: 
- Code
- Fortran
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/Adobe_Photoshop_CC_icon.png
---
在分子动力学模拟后计算径向分布函数（RDF）时，分子内峰和分子间峰有可能会同时出现，分子内峰还可能会遮蔽分子间峰造成分析困难。利用GROMACS的`pairdist`命令结合Fortran程序可以有效分离分子内峰的影响，对分子间峰进行单独分析。
<!--more-->

该方法仅适用于分子内距离仅由两个原子（片段）产生的情况。

##  使用方法

假设**原始RDF**使用如下命令产生：
```
gmx rdf -f traj.xtc -s system.tpr -n index.ndx -ref 'res_com of group A' -sel 'res_com of group B' -o rdf.xvg
```

### 准备必要文件与参数

首先使用如下命令计算组`A`和组`B`之间的距离，并保存为 `pairdist.xvg`文件：
```
gmx pairdist -f traj.xtc -s system.tpr -n index.ndx -ref 'res_com of group A' -sel 'res_com of group B' -o pairdist.xvg -pbc -refgrouping res -selgrouping res
```

随后使用`energy`命令获得体系的体积，得到平均体积（该脚本目前使用平均体积进行RDF计算，因此不适用于体系体积剧烈波动时的RDF）。

```
gmx energy -f energy.edr -b begin_time -e end_time

Energy                      Average   Err.Est.       RMSD  Tot-Drift
-------------------------------------------------------------------------------
Volume                      534.849       0.14   0.929486  -0.992984  (nm^3)
```

### 文件检查（可选）

首先通过`head -n 24 pairdist.xvg`和`head -n 25 pairdist.xvg`命令确认是否前24行是注释行，第25行是第一行数据，如果不是则需要记录第一行数据是第几行。

然后通过`head -n 25 pairdist.xvg | tail -n 1 | tr -s ' ' '\n' | wc -l`命令确定每行数据的列数，输出应为（参与计算RDF的分子数的平方+2）。如果第25行不是第一行数据，则此处的`25`应该改为第一行数据的行号。

### 计算RDF

```
inter_rdf -f pairdist.xvg -n n_mol -v volume [-o output (inter_rdf.txt)] [-rmax rmax(4)] [-bin bin width(0.002)] [-s start line(25)]
```

其中`n_mol`为参与计算RDF的分子数，`volume`为之前计算得到的平均体积(以nm<sup>3</sup>为单位)。其余可选参数包括：

- `-o` 输出文件，默认为`inter_rdf.txt`
- `-rmax` 最大距离，超过此距离的数据不参与RDF计算，默认为4 nm
- `-bin` bin宽度，默认为0.002 nm
- `-s` 第一行数据的行号，默认为25

### 输出

输出文件的第一行记录了在`pairdist.xvg`文件中一共有多少行数据被处理。第二行之后是RDF部分，第一列是距离，第二列是不包含分子内峰的RDF，第三列是包含分子内峰的RDF，可用于与原始RDF进行对比验证。

```text
# Frames: 5001
#         r          inter-g(r)        g(r)
       0.001000       0.000000       0.000000
       0.003000       0.000000       0.000000
       0.005000       0.000000       0.000000
...
       3.993000       1.006620       1.004611
       3.995000       1.007425       1.005414
       3.997000       1.006536       1.004527
       3.999000       1.006465       1.004456
```

## 源代码

```fortran
program inter_rdf
    implicit none
    integer, parameter :: dp = kind(1.0d0)

    ! 默认参数
    character(len=256) :: filename = ""
    character(len=256) :: outfile  = "inter_rdf.txt"
    integer :: n_mol = -1
    real(dp) :: box_volume = -1.0_dp
    real(dp) :: r_max = 4.0_dp
    real(dp) :: dr = 0.002_dp
    integer :: start_line = 25

    ! 变量
    integer :: nargs, i
    character(len=256) :: arg

    integer :: unit, ios
    integer :: n_col, nbin
    integer :: n_frame
    integer :: j, bin
    integer :: total_excl, total_full
    integer :: out_unit

    real(dp) :: rho, r, shell_volume, pi
    real(dp) :: r_left, w1, w2

    real(dp), allocatable :: hist_excl(:)
    real(dp), allocatable :: hist_full(:)
    real(dp), allocatable :: buffer(:)

    logical :: file_exists
    integer :: backup_id
    character(len=256) :: backup_name

    ! 解析命令行
    nargs = command_argument_count()
    i = 1
    do while (i <= nargs)
        call get_command_argument(i, arg)

        select case (trim(arg))
        case ("-f")
            i = i + 1
            call get_command_argument(i, filename)
        case ("-o")
            i = i + 1
            call get_command_argument(i, outfile)
        case ("-n")
            i = i + 1
            call get_command_argument(i, arg)
            read(arg, *) n_mol
        case ("-v")
            i = i + 1
            call get_command_argument(i, arg)
            read(arg, *) box_volume
        case ("-r")
            i = i + 1
            call get_command_argument(i, arg)
            read(arg, *) r_max
        case ("-dr")
            i = i + 1
            call get_command_argument(i, arg)
            read(arg, *) dr
        case ("-s")
            i = i + 1
            call get_command_argument(i, arg)
            read(arg, *) start_line
        case default
            print *, "Unknown:", trim(arg)
            print *, "Usage:"
            print *, "./inter_rdf -f file -o output -n n_mol -v volume [-r rmax(4)] [-dr dr(0.002)] [-s start line(25)]"
            stop
        end select

        i = i + 1
    end do

    ! 检查必要参数
    if (filename == "" .or. n_mol <= 0 .or. box_volume <= 0.0_dp) then
        print *, "Usage:"
        print *, "./inter_rdf -f file -o output -n n_mol -v volume [-r rmax(4)] [-dr dr(0.002)] [-s start line(25)]"
        stop
    end if

    ! 备份输出文件
    inquire(file=trim(outfile), exist=file_exists)
    if (file_exists) then
        backup_id = 1
        do
            write(arg,'(I0)') backup_id
            backup_name = "#" // trim(outfile) // "." // trim(adjustl(arg)) // "#"
            inquire(file=trim(backup_name), exist=file_exists)
            if (.not. file_exists) exit
            backup_id = backup_id + 1
        end do
        call rename(trim(outfile), trim(backup_name))
        print *, "Back off! ", trim(backup_name)
    end if

    ! 初始化
    n_col = n_mol * n_mol
    nbin = int(r_max / dr)
    pi = acos(-1.0_dp)
    rho = n_mol / box_volume

    allocate(hist_excl(nbin)); hist_excl=0.0_dp
    allocate(hist_full(nbin)); hist_full=0.0_dp
    allocate(buffer(n_col))

    total_excl = 0
    total_full = 0
    n_frame = 0

    open(newunit=unit, file=trim(filename), status='old', action='read')

    ! 跳过注释行
    do i = 1, start_line-1
        read(unit, *, iostat=ios)
        if (ios /= 0) then
            print *, "Wrong start line"
            stop
        end if
    end do

    ! 主循环逐帧读取
    do
        read(unit, *, iostat=ios) buffer
        if (ios /= 0) exit

        n_frame = n_frame + 1
        if (mod(n_frame,100) == 0) then
            write(*,'(A,I10)',advance='no') CHAR(13)//'Processed frames: ', n_frame
        end if

        do j = 2, n_col
            r = buffer(j)

            ! 普通 RDF
            if (r < r_max) then
                bin = int(r / dr) + 1
                if (bin <= nbin) then
                    r_left = (bin-1)*dr
                    w2 = (r - r_left)/dr
                    w1 = 1.0_dp - w2
                    hist_full(bin) = hist_full(bin) + w1
                    hist_full(bin+1) = hist_full(bin+1) + w2
                end if
            end if
            total_full = total_full + 1

            ! 跳过对角线元素
            if (mod(j-2, n_mol+1) == 0) cycle
            if (r < r_max) then
                bin = int(r/dr) + 1
                if (bin <= nbin) then
                    r_left = (bin-1)*dr
                    w2 = (r - r_left)/dr
                    w1 = 1.0_dp - w2
                    hist_excl(bin)   = hist_excl(bin) + w1
                    hist_excl(bin+1) = hist_excl(bin+1) + w2
                end if
            end if
            total_excl = total_excl + 1
        end do
    end do
    write(*,*)
    close(unit)

    ! 输出 RDF
    open(newunit=out_unit, file=trim(outfile), status='replace')
    write(out_unit,'(A)') "# Frames: "//trim(adjustl(to_string(n_frame)))
    write(out_unit,'(A)') "#         r          inter-g(r)        g(r)"

    do i = 1, nbin
        r = (i - 0.5_dp) * dr
        shell_volume = 4.0_dp * pi * r*r * dr
        hist_excl(i)=n_mol*hist_excl(i)/(shell_volume*rho*total_excl)
        hist_full(i)=n_mol*hist_full(i)/(shell_volume*rho*total_full)
        write(out_unit,'(3F15.6)') r, hist_excl(i), hist_full(i)
    end do
    close(out_unit)

contains

function to_string(i) result(str)
    integer,intent(in)::i
    character(len=32)::str
    write(str,'(I0)') i
end function

end program inter_rdf
```

