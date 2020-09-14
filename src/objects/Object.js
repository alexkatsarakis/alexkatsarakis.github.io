import logAction from "../utils/logs.js"

import bb from '../utils/blackboard.js'

export default class Object {
    name
    renderer

    values = {}

    events = {}

    options = []

    isMovable

    constructor(_name){
        if(!_name)name = "Unnamed Object"+Math.random(5);
        this.name = _name;
    
        this.isMovable = true;

        this.values['log me'] = {
            val: this.name,
            onChange: () => {
                logAction(this.name);
            }
        }

        this.events['onClick'] = localStorage.getItem(this.name+"_onClick");
        this.events['onRightClick'] = localStorage.getItem(this.name+"_onRightClick");
        this.events['onRemove'] = localStorage.getItem(this.name+"_onRemove");
        this.events['onMove'] = localStorage.getItem(this.name+"_onMove");

    }

    setColor(col){
        throw Error("setColor needs to be implemented");
    }

    setPosition(x,y){
        throw Error("setPosition needs to be implemented");
    }

    getPosition(){
        throw Error("getPosition needs to be implemented");
    }

    getObject(){
        throw Error("getObject needs to be implemented");
    }

    getOptions(){
        return this.options;
    }

    getValues(){
        return this.values;
    }

    setValue(val,v){
        this.values[val].val = v;
        this.values[val].onChange(v);
    }
    
    getValue(val){
        return this.values[val].val;
    }

    getEvents(){
        return this.events;
    }

    getEvent(ev){
        return this.events[ev];
    }

    setEvent(ev,code){
        localStorage.setItem(this.name+"_"+ev,code);
        this.events[ev] = code;
    }

    triggerEvent(ev){
        bb.fastGet('scripting','executeText')(this.events[ev]);
    }

    move(x,y){
        throw Error("move needs to be implemented");
    }

    animate(){
        throw Error("animate needs to be implemented");
    }

    add(){
        throw Error("add needs to be implemented");
    }

    remove(){
        throw Error("remove needs to be implemented");
    }

}