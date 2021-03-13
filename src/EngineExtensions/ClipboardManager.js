import utils from '../utils/utils.js'
import bb from '../utils/blackboard.js'

export default class ClipboardManager {
    _clipboard;
    _collection;

    constructor(){
        this._collection = [];
    }

    push(item,saveToCollection){
        this._clipboard = item;
        if(saveToCollection)this._collection.push(item);
    }

    top(){
        return this._clipboard;
    }

    getCollection(){
        return this._collection;
    }

    copy(obj = bb.fastGet('state', 'focusedObject'),saveToCollection){
        if(!obj)return;
        console.log(obj);
        let newObj = JSON.parse(obj+'');
        delete newObj._id;
        this.push(newObj,saveToCollection);
        console.log(this.getCollection());
    }

    paste(){
        let obj = this.top();
        if(!obj)return;
        let oldName = obj._name;
        obj._name = obj._name+'_'+Math.floor(Math.random() * 10000000000);
        let newObj = utils.createObject(obj);
        obj._name = oldName;
        return newObj;
    }
}