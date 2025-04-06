"use strict";

import bb from "./blackboard.js";
import "./translator.js";

bb.fastSet("state", "mode", "editing");
bb.fastSet("state", "focusedObject", undefined);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
urlParams.forEach((val, key) => {
  bb.fastSet("urlParams", key, val);
});

bb.fastSet("settings", "Dragging Objects", true); // !urlParams.get('play'));
bb.fastSet("settings", "Clicking Through Objects", false);
bb.fastSet("settings", "Move UI with Control", true);
bb.fastSet("settings", "Only show objects in search", false);
bb.fastSet("settings", "Show Prompt On Actions", false);
bb.fastSet("settings", "Focus Object On Click", false);
// <Engine>
import "../Engine.js";
// <EngineExtra>
import "../EngineExtensions/EngineExtensions.js";
// </EngineExtra>
// </Engine>

// <Required>
import "../actions/actions.js";
// </Required>

// <Extra>
import "../UI/UI.js";
// </Extra>
