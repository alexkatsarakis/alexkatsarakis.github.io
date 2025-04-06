"use strict";

import "./utils/initializationManager.js";

import Engine from "./Engine.js";

setTimeout(() => {
  Engine.SaveManager.setEngine(() => {
    Engine.start();
  });
  document.getElementById("loading-screen").remove();
}, 1000);
