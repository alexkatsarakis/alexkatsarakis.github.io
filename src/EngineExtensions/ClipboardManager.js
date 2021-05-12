import utils from '../utils/utils.js'
import bb from '../utils/blackboard.js'
import Engine from '../Engine.js';

import Manager from '../Engine/Manager.js'
export default class ClipboardManager extends Manager{
    _clipboard;
    _collection;

    constructor(){
        super();
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
        return [...this._collection];
    }

    copy(obj = bb.fastGet('state', 'focusedObject'),saveToCollection){
        if(!obj || Engine.ObjectManager.isSystemObject(obj.id))return;
        const newObj = JSON.parse(obj+'');
        delete newObj._id;
        newObj._time = Engine.ClockManager.getTime();
        this.push(newObj,saveToCollection);
    }

    paste(){
        const obj = this.top();
        const oldName = obj._name;
        obj._name = obj._name.replace(/\(.*\)/,'');
        obj._name = obj._name+'('+Math.floor(Math.random() * 1000000)+')';
        const newObj = utils.createObject(obj);
        newObj.triggerEvent('onGameStart');
        obj._name = oldName;
        return newObj;
    }
}