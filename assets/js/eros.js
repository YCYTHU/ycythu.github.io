const TARGET_HASH = "1746f23ae7175d5d16a11024be28bf212d4b517861c3e2cf20ddcb9af5f3aaf4";
const SEQ_LEN = 10;
const SWITCH_INTERVAL = 10000;

let eggTimer = null;
let eggQueue = [];
let eggIndex = 0;
const buffer = [];
let active = false;

function triggerEgg(bufferHash) {
  if (active) return;
  active = true;

  const key = bufferHash.substring(0,32);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/assets/${TARGET_HASH}.aes`, true);
  xhr.responseType = "text";

  xhr.onload = function() {
    if (xhr.status === 200) {
      var txtContent = xhr.responseText;
      const EGG_IMAGES = decrypt(txtContent.split('\n'), key);
      document.documentElement.classList.add("egg-active");
  		document.body.classList.add("egg-active");
  		startEggSlideshow(EGG_IMAGES);
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

function startEggSlideshow(EGG_IMAGES) {
  if (eggTimer) return;

  eggQueue = shuffleArray(EGG_IMAGES);
  eggIndex = 0;
  applyEggImage(eggQueue[eggIndex]);

  eggTimer = setInterval(() => {
    eggIndex++;
    if (eggIndex >= eggQueue.length) {
      eggQueue = shuffleArray(EGG_IMAGES);
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
    if (targetHash === TARGET_HASH) {
      triggerEgg(bufferHash);
      localStorage.setItem("eggActivated", bufferHash);
      buffer.length = 0;
    }
  }
});

window.addEventListener("load", async function () {
  const storedBufferHash = localStorage.getItem("eggActivated");
  if (storedBufferHash) {
    const checkHash = await hashKeys([storedBufferHash]);
    if (checkHash === TARGET_HASH) {
      triggerEgg(storedBufferHash);
    }
  }
});
