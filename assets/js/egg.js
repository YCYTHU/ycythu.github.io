const TARGET_HASH = "15871a2e317cd380b101ba92e5758440137df962582198a0ec3de25d04e3f04f";
const SEQ_LEN = 10;

async function hashKeys(keys) {
  const text = keys.join("|");
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

const buffer = [];
let active = false;

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

    //const h = await hashKeys(buffer);
    if (targetHash === TARGET_HASH) {
      triggerEgg();
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
      triggerEgg();
    }
  }
});

function triggerEgg() {
  if (active) return;
  active = true;
  document.documentElement.classList.add("egg-active");
  document.body.classList.add("egg-active");
}

function closeEgg() {
  if (!active) return;
  document.documentElement.classList.remove("egg-active");
  document.body.classList.remove("egg-active");
  localStorage.removeItem("eggActivated");
  active = false;
}