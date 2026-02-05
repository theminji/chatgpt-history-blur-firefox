const BLUR_KEY_SETTINGS = "blur_settings";
const BLUR_KEY_CURRENT = "current_blur_state";
const LANGUAGE_KEY = "selected_language";
const storageApi = typeof browser !== "undefined" ? browser : chrome;

function storageGet(key) {
  if (storageApi.storage?.local?.get.length <= 1) {
    return storageApi.storage.local.get([key]);
  }

  return new Promise((resolve) => {
    storageApi.storage.local.get([key], resolve);
  });
}

function storageSet(value) {
  if (storageApi.storage?.local?.set.length <= 1) {
    return storageApi.storage.local.set(value);
  }

  return new Promise((resolve) => {
    storageApi.storage.local.set(value, resolve);
  });
}

const storage = {
  async getBlurSettings() {
    return this.getValue(BLUR_KEY_SETTINGS);
  },

  async setBlurSettings(value) {
    return this.setValue(BLUR_KEY_SETTINGS, value);
  },

  async getBlurState() {
    return this.getValue(BLUR_KEY_CURRENT);
  },

  setBlurState(value) {
    this.setValue(BLUR_KEY_CURRENT, value);
  },

  async getValue(key, defaultValue = true) {
    try {
      const res = await storageGet(key);
      return res?.[key] !== false;
    } catch {
      return defaultValue;
    }
  },

  setValue(key, value) {
    storageSet({ [key]: value });
  }
};
