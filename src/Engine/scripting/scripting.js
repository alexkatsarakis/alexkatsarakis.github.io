import blScr from "./blockly/blockly.js";
import pureJS from "./pureJS/pureJS.js";
// import './pyodide/pyodide.js'

import bb from "../../utils/blackboard.js";

import Manager from "../Manager.js";

export default class ScriptingManager extends Manager {
  _installedMechanisms;
  _currentEditor;

  constructor() {
    super();
    this._installedMechanisms = {};
    this._installedMechanisms[blScr.id] = blScr;
    this._installedMechanisms[pureJS.id] = pureJS;
    this._currentEditor = blScr;
  }

  onSave() {
    return this._currentEditor.id;
  }

  onRetrieve(id) {
    if (!this._installedMechanisms[id]) return;
    this._currentEditor = this._installedMechanisms[id];
  }

  getCurrentEditorID() {
    return this._currentEditor.id;
  }

  setNewEditor(editorID) {
    if (!this._installedMechanisms[editorID]) return;
    this._currentEditor = this._installedMechanisms[editorID];
    this._div.innerHTML = "";
    this.injectInDiv(this._div);
  }

  currentScriptAsText() {
    return this._currentEditor.currentScriptAsText();
  }

  currentScriptAsCode() {
    return this._currentEditor.currentScriptAsCode();
  }

  executeCode(codes, currentObject) {
    if (bb.fastGet("state", "mode") === "paused") return;
    this._currentEditor.executeCode(codes, currentObject);
  }

  clearAndLoadFromText(codes) {
    this._currentEditor.clearAndLoadFromText(codes);
  }

  injectInDiv(div) {
    this._div = div;
    div.style.height = 500 + "px";
    div.style.width = 750 + "px";
    if (window.innerWidth < 1250) {
      div.style.width = window.innerWidth - 425 + "px";
      div.style.height = window.innerHeight - 50 + "px";

      const infoBar = document.getElementById("infoBar");
      infoBar.style.width = window.innerWidth - 275 + "px";

      const eventsTab = document.getElementById("eventsTab");
      eventsTab.style.height = window.innerHeight - 50 + "px";
    }
    this._currentEditor.injectInDiv(div);
  }
}
