const BLUR_KEY_SETTINGS = "blur_settings";
const BLUR_KEY_CURRENT = "current_blur_state";
const LANGUAGE_KEY = "selected_language";

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
      const res = await new Promise(r =>
        chrome.storage.local.get([key], r)
      );
      return res?.[key] !== false;
    } catch {
      return defaultValue;
    }
  },

  setValue(key, value) {
    chrome.storage.local.set({ [key]: value });
  }
};
