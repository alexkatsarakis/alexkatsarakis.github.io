import Rect from './objects/Rectangle.js'

import scene from './objects/Scene.js'
import mouseEvents from './mouseEvents.js'

class Object454Manager {
    _constructors;
    _mouseEvents;

    constructor(){
        this._constructors = {
            'Rectangle': Rect
        }
        this._mouseEvents = mouseEvents;
    }

    render(){
        scene.renderObjects()
    }

    get constructors() {
        return this._constructors;
    }

    get mouseEvents() {
        return this._mouseEvents;
    }
}

const object454Manager = new Object454Manager();

export default object454Manager;