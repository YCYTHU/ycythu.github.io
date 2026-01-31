const TARGET_HASH = "c1ccd0b6b1b14a2220d67ea2d19bf16cd038d14dd0250a977313c11e3267558b";
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
    const h = await hashKeys(buffer);
    if (h === TARGET_HASH) {
      triggerEgg();
      localStorage.setItem("eggActivated", buffer);
      buffer.length = 0;
    }
  }
});

window.addEventListener("load", function () {
  localValue = localStorage.getItem("eggActivated");
  if (!localValue) return;

  h = await hashKeys(localValue);
  if (h === TARGET_HASH) {
    triggerEgg();
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