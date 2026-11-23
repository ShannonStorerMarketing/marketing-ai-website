/*
  Chatbot loader, used on both pages.

  OPTION A (best): paste your Chatling chatbot ID below.
  Find it in Chatling: Deploy -> Website (embed code) -> the number in chatbotId: "...".
  The official Chatling bubble will then load.

  OPTION B (automatic fallback): if CHATLING_ID is empty, a chat bubble
  opens your bot's public share link in a panel.
*/
const CHATLING_ID = "";
const CHATLING_SHARE_URL = "https://share.chatling.ai/s/RWPBl8TT7FrGC4c";

(function () {
  if (CHATLING_ID) {
    window.chtlConfig = { chatbotId: CHATLING_ID };
    const s = document.createElement("script");
    s.async = true;
    s.id = "chtl-script";
    s.type = "text/javascript";
    s.setAttribute("data-id", CHATLING_ID);
    s.src = "https://chatling.ai/js/embed.js";
    document.body.appendChild(s);
    return;
  }

  const launcher = document.createElement("button");
  launcher.id = "chat-launcher";
  launcher.setAttribute("aria-label", "Open chat");
  launcher.textContent = "💬";

  const panel = document.createElement("div");
  panel.id = "chat-panel";
  panel.innerHTML =
    '<header>Marketing Assistant <button aria-label="Close chat">×</button></header>';

  let loaded = false;
  function toggle() {
    if (!loaded) {
      const frame = document.createElement("iframe");
      frame.src = CHATLING_SHARE_URL;
      frame.title = "Chatbot";
      frame.allow = "clipboard-write";
      panel.appendChild(frame);
      loaded = true;
    }
    panel.classList.toggle("open");
  }

  launcher.addEventListener("click", toggle);
  panel.querySelector("header button").addEventListener("click", toggle);
  document.body.appendChild(panel);
  document.body.appendChild(launcher);
})();
