import utils from '../utils/utils.js'
import bb from '../utils/blackboard.js'

export default class ClipboardManager {
    _clipboard;
    _collection;

    constructor(){
        this._collection = [];
    }

    push(item){
        this._clipboard = item;
        this._collection.push(item);
    }

    top(){
        return this._clipboard;
    }

    getCollection(){
        return this._collection;
    }

    copy(){
        let obj = bb.fastGet('state','focusedObject');
        if(!obj)return;
        console.log(obj);
        let newObj = JSON.parse(obj+'');
        delete newObj._id;
        this.push(newObj);
        console.log(this.getCollection());
    }

    paste(){
        let obj = this.top();
        if(!obj)return;
        obj._name = obj._name+'_'+Math.floor(Math.random() * 1000);
        utils.createObject(obj);
    }
}