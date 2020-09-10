import Object from './ObjectDom.js'

export default class ActionObject extends Object{

    action;

    constructor(name){
        super(name);
    }
    animate(){
        throw Error("animate needs to be implemented");
    }

    setAction(str){
        this.action = str;
    }

    getAction(){
        return this.action;
    }

}