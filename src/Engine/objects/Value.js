import log from '../../utils/logs.js'

import Engine from '../../Engine.js'

import bb from '../../utils/blackboard.js'

class Value {
    val
    tag
    constructor({tag,value,onChange,getValue}){
        this.tag = tag;
        this.val = value;
        this.onChange = onChange;
        this.getValue = getValue;
    }
}

export default class ValueManager{
    _regValues = {}

    _parent;

    constructor(parent){
        this._parent = parent;
    }

    getValues() {
        return this._regValues;
    }

    registerValue(val, {tag = 'user',value = '',onChange = {text: "", code: ""},getValue}) {
        this._regValues[val] = new Value({
            tag: tag,
            value: value,
            onChange: onChange,
            getValue: getValue
        });
    }

    setValue(val, v) {
        if (!this._regValues[val]) {
            this.registerValue(val, {value:v});
            return;
        }
        const event = {
            type: 'setValue',
            objectID: this._parent,
            data: {
                type: val,
                value: v,
                oldVal: this._regValues[val].val
            }
        };
        this._regValues[val].val = v;
        if (typeof this._regValues[val].onChange === 'function') 
        this._regValues[val].onChange(v);
        if (typeof this._regValues[val].onChange === 'object')
        Engine.ScriptingManager.executeCode(this._regValues[val].onChange, this._parent); // TODO
        
        bb.fastSet('events', 'last', event );
    }

    setValueCode(val, code) {
        if(this._regValues[val])
            this._regValues[val].onChange = code;
    }

    getValueCode(val) {
        let value = this._regValues[val];
        console.log(value);
        if(value)
            return value.onChange;
        return {text: "", code: ""}
    }

    getValue(val) {
        let value = this._regValues[val];
        
        if (!value) { 
            // log.logError('Couldn\'t get value '+val+' because it doesn\'t exists');
            return;
        }
        if (value.getValue) 
            return value.getValue();
        
        return value.val;
    }

    removeValue(val){
        let value = this._regValues[val];
        if(!value){
            log.logError('Tried to remove unregistered value '+val);
            return;
        }
        delete this._regValues[val];
    }

    getValueTag(val){
        let value = this._regValues[val];
        if(!value) throw Error('Tried to get value tag from unregistered');
        return value.tag;
    }
}