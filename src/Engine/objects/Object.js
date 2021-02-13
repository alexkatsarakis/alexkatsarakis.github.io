
import rand from '../../utils/randomGenerator.js'

import EventManager from './Event.js'
import StateManager from './State.js'
import OptionManager from './Option.js'
import ValueManager from './Value.js'

export default class Object {
    _id 
    _name 
    renderer

    data = {};

    _category;

    _isPrototype;

    constructor(_name, _id) {
        this._name = _name;
        this.id = _id || rand.generateGameID();

        this._isPrototype = false;

        this.data.eventHandler  = new EventManager(true, this.id);
        this.data.stateHandler  = new StateManager(this.id);
        this.data.valueHandler  = new ValueManager(this.id);
        this.data.optionHandler = new OptionManager(true, this.id); 

    }

    toString(){
        this.events  = this.getEvents();
        this.states  = this.getStates();
        this.options = this.getOptions();
        this.values  = this.getValues();
        for(let i in this.values){
            this.values[i].val = this.getValue(i);
        }
        let string = JSON.stringify(this);
        delete this.events; 
        delete this.states;
        delete this.options;
        delete this.values;
        return string;
    }

    getCategory() {
        return this._category;
    }

    getPositional() {
        let handler = this.data.valueHandler;
        let toReturn = {};
        for (let i in handler.getValues()) { 
            if (handler.getValueTag(i) === "positional") 
                toReturn[i] = this.getValue(i);
            
        }
        return toReturn;
    }

    getCodes() {
        let toReturn = {};

        let events = this.getEvents();
        toReturn.events = {};
        for (let i in events) {
            toReturn.events[i] = {};
            toReturn.events[i].get = () => {
                return this.getEvent(i).text
            } 
            toReturn.events[i].set = (code) => {
                this.setEvent(i, code)
            }
        }

        let states = this.getStates();
        toReturn.states = {};
        for(let i in states){
            let state = this.getState(i);
            toReturn.states[i] = {};
            toReturn.states[i]['out of '+i] = {};
            toReturn.states[i]['out of '+i].get = () => {
                return state.transitionFrom.text;
            } 
            toReturn.states[i]['out of '+i].set = (code) => {
                this.setState(i,code,undefined);
            }
            toReturn.states[i]['go to '+i] = {};
            toReturn.states[i]['go to '+i].get = () => {
                return state.transitionTo.text;
            } 
            toReturn.states[i]['go to '+i].set = (code) => {
                this.setState(i,undefined,code);
            }
        }

        let values = this.getValues();
        toReturn.values = {};
        for(let i in values){
            if(this.getValueTag(i) === 'user'){
                toReturn.values['on '+i+' Change'] = {};
                toReturn.values['on '+i+' Change'].set = (code) => {
                    this.setValueCode(i, code);
                };
                toReturn.values['on '+i+' Change'].get = () => {
                    return this.getValueCode(i).text;
                }
            }
        }

        let options = this.getOptions();
        toReturn.options = {};
        for(let i in options){
            if(this.getOptionTag(i) === 'user'){
                toReturn.options['on '+i+' Change'] = {};
                toReturn.options['on '+i+' Change'].set = (code) => {
                    this.setOptionCode(i, code);
                };
                toReturn.options['on '+i+' Change'].get = () => {
                    return this.getOptionCode(i).text;
                }
            }
        }

        // console.log(toReturn);
        return toReturn;
    }

    setColor(col) {
        throw Error("setColor needs to be implemented");
    }

    setPosition(x, y) {
        throw Error("setPosition needs to be implemented");
    }

    getPosition() {
        throw Error("getPosition needs to be implemented");
    }

    getObject() {
        throw Error("getObject needs to be implemented");
    }

    get id() {
        return this._id;
    }

    set id(newID) {
        this._id = newID;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    move(x, y) {
        throw Error("move needs to be implemented");
    }

    animate() {
        throw Error("animate needs to be implemented");
    }

    newFrame() {
        throw Error("newFrame needs to be implemented");
    }

    add() { // Add this item on renderer
        throw Error("add needs to be implemented");
    }

    clear() {
        delete this.data.eventHandler;

        for (let i in this.data.optionHandler) {
            delete this.data.optionHandler[i];
        }

        for (let i in this.data.valueHandler) {
            delete this.data.valueHandler[i];
        }

    }

    remove() { // Remove this item from blackboard and from renderer to.
        throw Error("remove needs to be implemented");
    }

}

/////////EVENT FUNCTIONS/////////////////
Object.prototype.getEvents = function(){
    return this.data.eventHandler.getEvents();
}

Object.prototype.addEvent = function(ev, code) {
    this.data.eventHandler.registerEvent(ev,{code:code})
}

Object.prototype.getEvent = function(ev) {
    return this.data.eventHandler.getEvent(ev);
}

Object.prototype.setEvent = function(ev, code) {
    this.data.eventHandler.setEvent(ev,code);
}

Object.prototype.triggerEvent = function(ev) {
    this.data.eventHandler.triggerEvent(ev);
}

Object.prototype.removeEvent = function(ev) {
    this.data.eventHandler.removeEvent(ev);
}

Object.prototype.getEventTag = function(ev) {
    this.data.eventHandler.getEventTag(ev);
}


////////STATE FUNCTIONS////////////////////
Object.prototype.getCurrentState = function() {
    return this.data.stateHandler.getCurrentState();
}

Object.prototype.setCurrentState = function(newState) {
    this.data.stateHandler.setCurrentState(newState);
}

Object.prototype.getStates = function() {
    return this.data.stateHandler.getStates();
}

Object.prototype.addState = function(state) {
    this.data.stateHandler.registerState(state);
}

Object.prototype.getState = function(state) {
    return this.data.stateHandler.getState(state);
}

Object.prototype.setState = function(state, transitionFrom, transitionTo) {
    this.data.stateHandler.setState(state,transitionFrom,transitionTo);
}

//////////OPTION FUNCTIONS ////////////////////
Object.prototype.getOptions = function() {
    return this.data.optionHandler.getOptions();
}

Object.prototype.addOption = function(opt) {
    this.data.optionHandler.registerOption(opt);
}

Object.prototype.getOption = function(opt) {
    return this.data.optionHandler.getOption(opt);
}

Object.prototype.setOption = function(opt, val) {
    this.data.optionHandler.setOption(opt,val);
}

Object.prototype.getOptionTag = function(opt) {
    return this.data.optionHandler.getOptionTag(opt);
}

Object.prototype.removeOption = function(opt) {
    return this.data.optionHandler.removeOption(opt);
}

Object.prototype.setOptionCode = function(opt, code) {
    this.data.optionHandler.setOptionCode(opt, code);
}

Object.prototype.getOptionCode = function(opt) {
    return this.data.optionHandler.getOptionCode(opt);
}

Object.prototype.hasOption = function(opt) {
    return this.data.optionHandler.hasOption(opt);
}

//////////VALUE FUNCTIONS////////////////////
Object.prototype.getValues = function() {
    return this.data.valueHandler.getValues();
}

Object.prototype.addValue = function(val, v = "") {
    this.data.valueHandler.registerValue(val,{value:v});
}

Object.prototype.setValue = function(val, v) {
    this.data.valueHandler.setValue(val, v);
}

Object.prototype.getValue = function(val) {
    return this.data.valueHandler.getValue(val);
}

Object.prototype.getValueTag = function(val) {
    return this.data.valueHandler.getValueTag(val);
}

Object.prototype.setValueCode = function(val, code) {
    this.data.valueHandler.setValueCode(val, code);
}

Object.prototype.getValueCode = function(val) {
    return this.data.valueHandler.getValueCode(val);
}

Object.prototype.removeValue = function(val) {
    this.data.valueHandler.removeValue(val);
}