import Engine from '../../Engine.js'

class State {
    tag
    transitionFrom
    transitionTo
    constructor({tag,transitionFrom = {},transitionTo = {}, whileInState = {}}){
        if(typeof tag !== 'string')
            throw Error('Error creating State')

        this.tag = tag;
        this.transitionFrom = transitionFrom;
        this.transitionTo = transitionTo;
        this.whileInState = whileInState;
    }
}

export default class StateManager{
    _currState;
    _regStates = {}

    _parent

    constructor(parent){
        this.registerState('idle');

        this._currState = this.getState('idle');
        this._parent = parent;
    }

    getCurrentState() {
        return this._currState.tag;
    }

    setCurrentState(newState) {
        if (!this._regStates[newState]) 
            return;
         // TODO
        let oldState = this.getState(this.getCurrentState());
        let nState = this.getState(newState);
        Engine.ScriptingManager.executeCode(oldState.transitionFrom, this._parent); // TODO
        this._currState = this._regStates[newState];
        Engine.ScriptingManager.executeCode(nState.transitionTo, this._parent); // TODO

    }

    executeInState() {
        Engine.ScriptingManager.executeCode(this._currState.whileInState, this._parent); // TODO
    }

    getStates() {
        return this._regStates;
    }

    registerState(state) {
        this._regStates[state] = new State({tag: state})
    }

    getState(state) {
        return this._regStates[state];
    }

    setState({state, transitionFrom, transitionTo, whileInState}) {
        if(transitionFrom) this._regStates[state].transitionFrom = transitionFrom;
        if(transitionTo) this._regStates[state].transitionTo = transitionTo;
        if(whileInState) this._regStates[state].whileInState = whileInState;
    }

    removeState(state) {
        if(!this._regStates[state])throw Error('Tried to delete a state that isn\'t registered');
        delete this._regStates[state]
    }

}