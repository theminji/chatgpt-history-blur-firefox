const toggle = document.getElementById("toggle");
const popupLabel = document.getElementById("popupLabel");
const languageSelect = document.getElementById("languageSelect");

const BLUR_KEY_SETTINGS = "blur_settings";
const LANGUAGE_KEY = "selected_language";

popupLabel.textContent = chrome.i18n.getMessage("blurToggle");

chrome.storage.local.get([LANGUAGE_KEY], (res) => {
  const savedLanguage = res[LANGUAGE_KEY] || chrome.i18n.getUILanguage().split('-')[0];
  languageSelect.value = savedLanguage;
  chrome.storage.local.set({ [LANGUAGE_KEY]: savedLanguage });
});

chrome.storage.local.get([BLUR_KEY_SETTINGS], (res) => {
  toggle.checked = res[BLUR_KEY_SETTINGS] !== false;
});

toggle.addEventListener("change", () => {
  chrome.storage.local.set({ [BLUR_KEY_SETTINGS]: toggle.checked });
});

languageSelect.addEventListener("change", (e) => {
  const selectedLanguage = e.target.value;
  chrome.storage.local.set({ [LANGUAGE_KEY]: selectedLanguage });
  location.reload();
});