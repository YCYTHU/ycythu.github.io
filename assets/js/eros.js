const TARGET_HASH = [
  "5e21e31f4ad0ebad53de659b20930a951c5a18dcd17adf3597d0bfd199718303",
  "64bb6a5364bf13f7c52d566b677f37268c095686d503f4a5b9d01354a9ff901c",
  "21623482698e1b200d7987c865e7400c776ed929f42dfbfc2fd5630fb9360245",
];
const SEQ_LEN = 16;
const SWITCH_INTERVAL = 10000;

let eggTimer = null;
let eggQueue = [];
let eggIndex = 0;
const buffer = [];
let active = false;

function triggerEgg(bufferHash, targetHash) {
  if (active) return;
  active = true;

  const key = bufferHash.substring(0,32);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/assets/${targetHash}.aes`, true);
  xhr.responseType = "text";

  xhr.onload = function() {
    if (xhr.status === 200) {
      var txtContent = xhr.responseText;
      const eggImages = decrypt(txtContent.split('\n'), key);
      document.documentElement.classList.add("egg-active");
  		document.body.classList.add("egg-active");
  		startEggSlideshow(eggImages);
    }
  };
  xhr.send();
}

function closeEgg() {
  if (!active) return;
  document.documentElement.classList.remove("egg-active");
  document.body.classList.remove("egg-active");
  localStorage.removeItem("eggActivated");
  stopEggSlideshow();
  active = false;
}

function decrypt(encry_arr, serverKey) {
    var result = [];
    const key = CryptoJS.enc.Utf8.parse(serverKey);
    for (let index = 0; index < encry_arr.length; index++) {
        var decryptedData = CryptoJS.AES.decrypt(encry_arr[index].substring(16), key, {
            iv: CryptoJS.enc.Utf8.parse(encry_arr[index].substring(0,16)),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        result.push(decryptedData.toString(CryptoJS.enc.Utf8));
    }
    return result
}

async function hashKeys(keys) {
  const text = keys.join("|");
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function applyEggImage(src) {
  requestAnimationFrame(() => {
    document.documentElement.style.setProperty(
      "--egg-image",
      `url("data:image/jpeg;base64,${src.substring(12)}")`
    );
  });
}

function startEggSlideshow(eggImages) {
  if (eggTimer) return;

  eggQueue = shuffleArray(eggImages);
  eggIndex = 0;
  applyEggImage(eggQueue[eggIndex]);

  eggTimer = setInterval(() => {
    eggIndex++;
    if (eggIndex >= eggQueue.length) {
      eggQueue = shuffleArray(eggImages);
      eggIndex = 0;
    }
    applyEggImage(eggQueue[eggIndex]);
  }, SWITCH_INTERVAL);
}

function stopEggSlideshow() {
  if (!eggTimer) return;
  clearInterval(eggTimer);
  eggTimer = null;
  document.documentElement.style.removeProperty("--egg-image");
}

document.addEventListener("keydown", async e => {
  if (e.key === "Escape") {
    closeEgg();
    return;
  }
  if (active) return;

  buffer.push(e.key);
  if (buffer.length > SEQ_LEN) buffer.shift();

  if (buffer.length === SEQ_LEN) {
    const bufferHash = await hashKeys(buffer);
    const targetHash = await hashKeys([bufferHash]);
    if (TARGET_HASH.includes(targetHash)) {
      triggerEgg(bufferHash, targetHash);
      localStorage.setItem("eggActivated", bufferHash);
      buffer.length = 0;
    }
  }
});

window.addEventListener("load", async function () {
  const storedBufferHash = localStorage.getItem("eggActivated");
  if (storedBufferHash) {
    const checkHash = await hashKeys([storedBufferHash]);
    if (TARGET_HASH.includes(checkHash)) {
      triggerEgg(storedBufferHash, checkHash);
    }
  }
});
