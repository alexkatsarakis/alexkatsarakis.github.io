
import rand from '../../utils/randomGenerator.js'

import EventManager from './Event.js'
import StateManager from './State.js'
import OptionManager from './Option.js'
import ValueManager from './Value.js'
import CollisionManager from './Collision.js'

const ObjectState = {
    LOADED: 'loaded',
    ALIVE: 'alive',
    REMOVED: 'removed'
}

export default class Object {
    _id 
    _name 
    renderer
    _state

    data = {};

    _category;
    _animator;

    constructor(_name, _id) {
        this._name = _name;
        this.id = _id || rand.generateGameID();

        this._state = ObjectState.ALIVE;

        this._isPrototype = false;

        this.data.eventHandler     = new EventManager(true, this.id);
        this.data.stateHandler     = new StateManager(this.id);
        this.data.valueHandler     = new ValueManager(this.id);
        this.data.optionHandler    = new OptionManager(true, this.id); 
        this.data.collisionHandler = new CollisionManager(this);

    }

    toString(){
        const toSave = {
            events:     this.getEvents(),        
            states:     this.getStates(),
            options:    this.getOptions(),
            values:     this.getValues(),
            collisions: this.getCollisions(),
            _name:      this.name,
            _category:  this._category,
            _id:        this.id,
            _currState: this.getCurrentState()
        }
        for(let i in this.values){
            toSave.values[i].val = this.getValue(i);
        }

        return JSON.stringify(toSave);
    }

    getCategory() {
        return this._category;
    }

    getPositional() {
        const handler = this.data.valueHandler;
        let toReturn = {};
        for (let i in handler.getValues()) { 
            if (handler.getValueTag(i) === "positional") 
                toReturn[i] = this.getValue(i);
            
        }
        return toReturn;
    }

    getCodes() {
        let toReturn = {};

        const events = this.getEvents();
        toReturn.events = {};
        for (let i in events) {
            toReturn.events[i] = {};
            toReturn.events[i].get = () => {
                return this.getEvent(i)
            } 
            toReturn.events[i].set = (code) => {
                this.setEvent(i, code)
            }
        }

        const states = this.getStates();
        toReturn.states = {};
        for(let i in states){
            const state = this.getState(i);
            toReturn.states[i] = {};
            toReturn.states[i]['on state exit: '+i] = {};
            toReturn.states[i]['on state exit: '+i].get = () => {
                return state.transitionFrom;
            } 
            toReturn.states[i]['on state exit: '+i].set = (code) => {
                this.setState(i,code,undefined);
            }
            toReturn.states[i]['on state: '+i] = {};
            toReturn.states[i]['on state: '+i].get = () => {
                return state.whileInState;
            } 
            toReturn.states[i]['on state: '+i].set = (code) => {
                this.setState(i,undefined,undefined,code);
            }
            toReturn.states[i]['on state enter: '+i] = {};
            toReturn.states[i]['on state enter: '+i].get = () => {
                return state.transitionTo;
            } 
            toReturn.states[i]['on state enter: '+i].set = (code) => {
                this.setState(i,undefined,code);
            }
        }

        const values = this.getValues();
        toReturn.values = {};
        for(let i in values){
            if(this.getValueTag(i) === 'user'){
                toReturn.values['on '+i+' Change'] = {};
                toReturn.values['on '+i+' Change'].get = () => {
                    return this.getValueCode(i);
                }
                toReturn.values['on '+i+' Change'].set = (code) => {
                    this.setValueCode(i, code);
                };
            }
        }

        const options = this.getOptions();
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

        const collisions = this.getCollisions();
        toReturn.collisions = {};
        for(let i in collisions){
            toReturn.collisions[i] = {};
            toReturn.collisions[i].set = (code) => {
                this.setCollision(i, code);
            };
            toReturn.collisions[i].get = () => {
                return this.getCollisionCode(i);
            };
        };

        return toReturn;
    }
    
    setPosition(x,y){
        if(!this.getOption('isMovable'))return;
        this.setValue('x', x);
        this.setValue('y', y);
    }

    move(x,y){
        if(!this.getOption('isMovable'))return;
        if(x !== 0) this.setValue('x', this._x + x);
        if(y !== 0) this.setValue('y', this._y + y);
        if(x !== 0 || y !== 0)
            this.triggerEvent('onMove');
    }

    getObject() {
        throw Error("getObject needs to be implemented");
    }


    setAnimator(animator){
        if(this._animator !== undefined)this._animator.stop();
        this._animator = animator;
    }

    getAnimator(){
        return this._animator;
    }

    destroyAnimator(){
        if(this._animator !== undefined)this._animator.destroy();
        this._animator = undefined;
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

    newFrame(){
        this.triggerEvent('onEachFrame');
        this.executeInState();
    }

    add() { // Add this item on renderer
        throw Error("add needs to be implemented");
    }

    clear() {
        for (let i in this.data.stateHandler) {
            delete this.data.stateHandler[i];
        }
        
        for (let i in this.data.eventHandler) {
            delete this.data.eventHandler[i];
        }

        for (let i in this.data.optionHandler) {
            delete this.data.optionHandler[i];
        }

        for (let i in this.data.valueHandler) {
            delete this.data.valueHandler[i];
        }

        for (let i in this.data.collisionHandler.getCollisions()) {
            this.data.collisionHandler.removeCollision(i);
        }

    }

    get isAlive(){
        return this._state !== ObjectState.REMOVED;
    }

    remove() { 
        this._state = ObjectState.REMOVED;
        this.clear();
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

Object.prototype.executeInState = function () {
    this.data.stateHandler.executeInState();
}

Object.prototype.setState = function(state, transitionFrom, transitionTo, whileInState) {
    this.data.stateHandler.setState({state,transitionFrom,transitionTo, whileInState});
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

///////////COLLISION FUNCTIONS///////////////
Object.prototype.addCollision = function(colObjName){
    this.data.collisionHandler.registerCollision(colObjName);
}

Object.prototype.setCollision = function(colObjName, code){
    this.data.collisionHandler.setCollision(colObjName, code);
}

Object.prototype.getCollision = function(colObjName){
    return this.data.collisionHandler.getCollision(colObjName);
}

Object.prototype.getCollisions = function() {
    return this.data.collisionHandler.getCollisions();
}

Object.prototype.getCollisionCode = function(colObjName) {
    return this.data.collisionHandler.getCollisionCode(colObjName);
}

Object.prototype.removeCollision = function(colObjName) {
    return this.data.collisionHandler.removeCollision(colObjName);
}
