const toggle = document.getElementById("toggle");
const popupLabel = document.getElementById("popupLabel");
const languageSelect = document.getElementById("languageSelect");
const extensionApi = typeof browser !== "undefined" ? browser : chrome;

const BLUR_KEY_SETTINGS = "blur_settings";
const LANGUAGE_KEY = "selected_language";

function storageGet(keys) {
  if (extensionApi.storage?.local?.get.length <= 1) {
    return extensionApi.storage.local.get(keys);
  }

  return new Promise((resolve) => {
    extensionApi.storage.local.get(keys, resolve);
  });
}

function storageSet(value) {
  if (extensionApi.storage?.local?.set.length <= 1) {
    return extensionApi.storage.local.set(value);
  }

  return new Promise((resolve) => {
    extensionApi.storage.local.set(value, resolve);
  });
}

popupLabel.textContent = extensionApi.i18n.getMessage("blurToggle");

storageGet([LANGUAGE_KEY]).then((res) => {
  const savedLanguage = res[LANGUAGE_KEY] || extensionApi.i18n.getUILanguage().split("-")[0];
  languageSelect.value = savedLanguage;
  storageSet({ [LANGUAGE_KEY]: savedLanguage });
});

storageGet([BLUR_KEY_SETTINGS]).then((res) => {
  toggle.checked = res[BLUR_KEY_SETTINGS] !== false;
});

toggle.addEventListener("change", () => {
  storageSet({ [BLUR_KEY_SETTINGS]: toggle.checked });
});

languageSelect.addEventListener("change", (e) => {
  const selectedLanguage = e.target.value;
  storageSet({ [LANGUAGE_KEY]: selectedLanguage });
  location.reload();
});
