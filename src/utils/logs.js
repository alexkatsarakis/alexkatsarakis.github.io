import bb from "./blackboard.js";

function logManager() {
  function logAction(message) {
    bb.fastSet("state", "lastAction", message);
  }

  function logError(message) {
    bb.fastSet("state", "lastAction", "Error: " + message);
  }

  function logWarning(message) {
    bb.fastSet("state", "lastAction", "Warning: " + message);
  }

  return {
    logAction,
    logError,
    logWarning,
  };
}

export default logManager();
