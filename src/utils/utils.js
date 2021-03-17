import Engine from '../Engine.js'

import bb from './blackboard.js'


function Utils(){
    return {
        createObject,
        resetObject,
        inputHandler
    }
}

function createObject(item){
    if(!item._name)return;
    let it;
    if(Engine.ObjectManager.getObjectByName(item._name)){
        it = Engine.ObjectManager.getObjectByName(item._name);
    }else{ 
        let category = Engine.ObjectManager.getConstructor(item._category);
        it = new category({name:item._name,...item.extra},item._id);
    }
    let values = item.values;
    let options = item.options;
    let events = item.events;
    let states = item.states;

    for(let a in options){
        if(!it.hasOption(a))it.addOption(a);
        it.setOption(a,options[a].val);
        if(options[a].onChange){
            it.setOptionCode(a, options[a].onChange);
        }
    }

    for(let v in values){
        it.setValue(v,values[v].val);
        if(values[v].onChange){
            it.setValueCode(v, values[v].onChange);
        }
    }

    for(let f in events){
        if(it.getEvent(f) === undefined)
            it.addEvent(f,events[f].val);
        else 
            it.setEvent(f,events[f].val);
    }

    for(let s in states){
        it.addState(s);
        it.setState(s,states[s].transitionFrom,states[s].transitionTo);
    }

    it.add();
    if(Engine.PhysicsManager && !Engine.ObjectManager.isSystemObject(it.id))Engine.PhysicsManager.addToWorld(it);

    return it;
}

function resetObject(item){
    let it = Engine.ObjectManager.objects[item._id];
    let values = item.values;
    let options = item.options;
    let events = item.events;
    let states = item.states;

    for(let a in options){
        if(typeof options[a] !== "boolean")throw Error('Attributes must be boolean');
        it.setOption(a,options[a]);
    }

    for(let v in values){
        it.setValue(v,values[v].val);
        if(values[v].onChange){
            it.setValueCode(v, values[v].onChange);
        }
    }

    for(let f in events){
        if(it.getEvent(f) === undefined)
            it.addEvent(f,events[f].val);
        else 
            it.setEvent(f,events[f].val);
    }

    for(let s in states){
        it.addState(s);
        it.setState(s,states[s].transitionFrom,states[s].transitionTo);
    }

}

// import keyToAction from '../assets/json/keyToActions.js' //json
function inputHandler(key) {
    if(key === 'PressedCopy' || key === 'PressedPaste' || key === 'PresseddummyAction'){
        console.log(key);
        bb.fastGet('actions',key.substring(7))();
    }else {
        Engine.ObjectManager.getObjectByName('Keyboard').triggerEvent(key);
    }
    // if(bb.fastGet('state','mode') === 'editing')return;
    // if(keyToAction[key]){
    //     keyToAction[key].forEach((action)=>bb.fastGet('actions',action)());
    // }
}

const utils = new Utils();

export default utils;