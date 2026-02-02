const toggle = document.getElementById("toggle");

chrome.storage.local.get([BLUR_KEY_SETTINGS], (res) => {
  toggle.checked = res[BLUR_KEY_SETTINGS] !== false;
});

toggle.addEventListener("change", () => {
  chrome.storage.local.set({ [BLUR_KEY_SETTINGS]: toggle.checked });
});