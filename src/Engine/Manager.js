/**
 * @class Manager: Every Manager shall extend this class
 * Provides the hook-methods the engine can use to interact with the Manager
 */
export default class Manager {
  constructor() {}

  onLoad() {}

  onUpdate() {}

  onClose() {}

  onSave() {
    return "";
  }

  onRetrieve() {}
}
