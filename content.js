function setItemBlur(item, enabled) {
  const isActive = item.hasAttribute("data-active");
  item.style.filter = (!enabled || isActive) ? "none" : "blur(3.2px)";
}

async function applyBlur() {
  const enabled = await storage.getBlurState();

  document.querySelectorAll("#history > a").forEach((item) => {
    setItemBlur(item, enabled);

    if (item.dataset.blurListenerAttached) return;
    item.dataset.blurListenerAttached = "true";
    item.style.transition = "filter 0.2s ease";

    item.addEventListener("mouseenter", () => {
      const isBlurEnabled = item.dataset.blurEnabled === "true";
      if (isBlurEnabled && !item.hasAttribute("data-active")) {
        item.style.filter = "none";
      }
    });

    item.addEventListener("mouseleave", () => {
      const isBlurEnabled = item.dataset.blurEnabled === "true";
      setItemBlur(item, isBlurEnabled);
    });
  });

  document.querySelectorAll("#history > a").forEach((item) => {
    item.dataset.blurEnabled = enabled ? "true" : "false";
  });
}

async function injectToggleText() {
  if (document.querySelector(".blur-toggle-wrapper")) return;

  const candidates = [...document.querySelectorAll("h2, span, div")];
  const titleEl = candidates.find(el => el.textContent?.trim() === "Your chats");
  if (!titleEl || !titleEl.parentElement) return;

  const wrapper = document.createElement("div");
  wrapper.className = "blur-toggle-wrapper";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "space-between";
  wrapper.style.width = "100%";

  const titleClone = titleEl.cloneNode(true);
  titleClone.style.margin = "0";
  titleClone.style.display = "block";

  const toggle = document.createElement("span");
  toggle.className = "blur-toggle-text";
  toggle.style.cssText = "cursor: pointer; font-size: 12px; opacity: 0.7; user-select: none; white-space: nowrap;";

  let currentState = await storage.getBlurState();
  toggle.textContent = currentState ? "Show chats" : "Hide chats";

  toggle.addEventListener("mouseenter", () => {
    toggle.style.opacity = "1";
  });

  toggle.addEventListener("mouseleave", () => {
    toggle.style.opacity = "0.7";
  });

  toggle.addEventListener("click", async (e) => {
    e.stopPropagation();
    currentState = !currentState;
    storage.setBlurState(currentState);
    toggle.textContent = currentState ? "Show chats" : "Hide chats";
    applyBlur();
  });

  wrapper.appendChild(titleClone);
  wrapper.appendChild(toggle);
  titleEl.replaceWith(wrapper);
}
const observer = new MutationObserver(() => {
  injectToggleText();
  applyBlur();
});

observer.observe(document.body, { childList: true, subtree: true });

initBlurState().then(() => {
  injectToggleText();
  applyBlur();
});

async function initBlurState() {
  const initial = await storage.getBlurSettings();
  storage.setBlurState(initial);
  return initial;
}
