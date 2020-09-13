import funcName from "../utils/logs.js"

export default class Object {
    name
    renderer

    values = {}

    options = []

    isMovable

    constructor(_name){
        if(!_name)name = "Unnamed Object"+Math.random(5);
        this.name = _name;
    
        this.isMovable = true;

        this.values['log me'] = {
            onChange: () => {
                funcName(this.name);
            }
        }

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