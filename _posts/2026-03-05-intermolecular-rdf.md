---
title: 利用GROMACS计算RDF时避免分子内峰的Fortran脚本
tags: 
- Code
- Fortran
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/Adobe_Photoshop_CC_icon.png
---
在分子动力学模拟后计算径向分布函数（RDF）时，分子内峰和分子间峰有可能会同时出现，分子内峰还可能会遮蔽分子间峰造成分析困难。利用GROMACS的`pairdist`命令结合Fortran程序可以有效分离分子内峰的影响，对分子间峰进行单独分析。
<!--more-->

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
            print *, "./rdf -f file -o output -n n_mol -v volume [-r rmax(4)] [-dr dr(0.002)] [-s start line(25)]"
            stop
        end select

        i = i + 1
    end do

    ! 检查必要参数
    if (filename == "" .or. n_mol <= 0 .or. box_volume <= 0.0_dp) then
        print *, "Usage:"
        print *, "./rdf -f file -o output -n n_mol -v volume [-r rmax(4)] [-dr dr(0.002)] [-s start line(25)]"
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

