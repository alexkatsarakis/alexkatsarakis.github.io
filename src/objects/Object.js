import bb from '../utils/blackboard.js'

export default class Object {
    name
    renderer

    values = {}

    events = {}

    options = {}

    constructor(_name){
        this.name = _name;

        this.events['onClick'] = localStorage.getItem(this.name+"_onClick");
        this.events['onRightClick'] = localStorage.getItem(this.name+"_onRightClick");
        this.events['onRemove'] = localStorage.getItem(this.name+"_onRemove");
        this.events['onMove'] = localStorage.getItem(this.name+"_onMove");

        this.options['isMovable'] = true;
        this.options['isRemovable'] = true;
        this.options['isVisible'] = true;

    }

    setColor(col){
        throw Error("setColor needs to be implemented");
    }

    setPosition(x,y,z){
        throw Error("setPosition needs to be implemented");
    }

    getPosition(){
        throw Error("getPosition needs to be implemented");
    }

    getObject(){
        throw Error("getObject needs to be implemented");
    }

    getCategory(){
        throw Error("getCategory needs to be implemented");
    }

    getName(){
        return this.name;
    }

    setName(newName){
        bb.fastRemove('liveObjects',this.name);
        if(bb.fastGet('state','player') === this.name)bb.fastSet('state','player',newName);
        this.name = newName;
        bb.fastSet('liveObjects',this.name);
    }

    getOptions(){
        return this.options;
    }

    addOption(opt){
        this.options[opt] = true;
    }

    getOption(opt){
        return this.options[opt];
    }

    setOption(opt,val){
        this.options[opt] = val;
    }

    getValues(){
        return this.values;
    }

    addValue(val,v=""){
        if(this.values[val])return;
        this.values[val] = {};
        this.values[val].val = v;
    }

    setValue(val,v){
        this.values[val].val = v;
        if(this.values[val].onChange)this.values[val].onChange(v);
    }
    
    getValue(val){
        if(this.values[val].getValue)return this.values[val].getValue();
        return this.values[val].val;
    }

    getEvents(){
        return this.events;
    }

    addEvent(ev){
        this.events[ev] = "";
    }

    getEvent(ev){
        return this.events[ev];
    }

    setEvent(ev,code){
        localStorage.setItem(this.name+"_"+ev,code);
        this.events[ev] = code;
    }

    triggerEvent(ev){
        if(!this.events[ev])return;
        bb.fastGet('scripting','executeText')(this.events[ev]);
    }

    move(x,y){
        throw Error("move needs to be implemented");
    }

    animate(){
        throw Error("animate needs to be implemented");
    }

    newFrame(){
        throw Error("newFrame needs to be implemented");
    }

    add(){  //Add this item on renderer
        throw Error("add needs to be implemented");
    }

    remove(){ // Remove this item from blackboard and from renderer to.
        throw Error("remove needs to be implemented");
    }

}