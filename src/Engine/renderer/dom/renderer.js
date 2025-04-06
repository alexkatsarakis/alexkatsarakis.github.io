import mouseEvents from "./mouseEvents.js";

import Scene from "./objects/Scene.js";
import Circle from "./objects/Circle.js";
import Square from "./objects/Square.js";
import Text from "./objects/Text.js";
import Humanoid from "./objects/Humanoid.js";

class ObjectDomManager {
  _constructors;
  _mouseEvents;

  constructor() {
    this._constructors = {
      Circle: Circle,
      Square: Square,
      Text: Text,
      Humanoid: Humanoid,
    };
    this._mouseEvents = mouseEvents;
  }

  render() {
    Scene.renderObjects();
  }

  get constructors() {
    return this._constructors;
  }

  get mouseEvents() {
    return this._mouseEvents;
  }
}

const objectDomManager = new ObjectDomManager();

export default objectDomManager;
