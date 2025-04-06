import bb from "../../utils/blackboard.js";
import tr from "../../utils/translator.js";

export default {
  name: "promptWindow",
  link: "./src/UI/promptWindow/promptWindow.ahtml",
  cb: onPromptViewLoaded,
  removable: true,
  loadOnInstall: true,
};

function closePrompt() {
  const wrap = document.getElementById("promptWindow-wrap");
  wrap.style.display = "none";
}

function openPrompt({ title, description, onAccept, onDecline }) {
  const top = document.getElementById("promptWindow-title");
  const desc = document.getElementById("promptWindow-description");
  const acce = document.getElementById("promptWindow-accept");
  const decl = document.getElementById("promptWindow-decline");
  const BG = document.getElementById("promptWindow-BG");

  top.innerHTML = title || "Generic Title";
  desc.innerHTML = description || "Generic Description";

  acce.onclick = () => {
    closePrompt();
    if (onAccept) onAccept();
  };

  decl.onclick = () => {
    closePrompt();
    if (onDecline) onDecline();
  };

  BG.onclick = () => {
    closePrompt();
    if (onDecline) onDecline();
  };

  const wrap = document.getElementById("promptWindow-wrap");
  wrap.style.display = "block";

  bb.installWatch("events", "openPrompt", (promptInfo) =>
    openPrompt(promptInfo)
  );
}

function onPromptViewLoaded() {
  document.getElementById("promptWindow-accept").innerHTML = tr.get("Accept");
  document.getElementById("promptWindow-decline").innerHTML = tr.get("Decline");
  bb.fastSet("settings", "Show Prompt On Actions", true);
  bb.installWatch("events", "openPrompt", (promptInfo) =>
    openPrompt(promptInfo)
  );
}
