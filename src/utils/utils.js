import Engine from '../Engine.js'

import bb from './blackboard.js'


function Utils(){
    return {
        createObject,
        resetObject,
        inputHandler,
        msToString
    }
}

function createObject(item){
    if(!item._name)return;
    let it;
    if(Engine.ObjectManager.getObjectByName(item._name)){
        it = Engine.ObjectManager.getObjectByName(item._name);
    }else{ 
        const category = Engine.ObjectManager.getConstructor(item._category);
        it = new category({name:item._name,...item.extra},item._id);
    }
    const values = item.values;
    const options = item.options;
    const events = item.events;
    const states = item.states;
    const colls  = item.collisions;
    
    for(let a in options){
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
        it.setState(s,states[s].transitionFrom,states[s].transitionTo,states[s].whileInState);
    }

    for(let c in colls){
        it.addCollision(c);
        it.setCollision(c,colls[c].code);
    }

    if(item._currState){
        it.setCurrentState(item._currState);
    }

    it.add();

    return it;
}

function resetObject(item){
    const it = Engine.ObjectManager.objects[item._id];
    if(!it){
        createObject(item);
        return;
    }
    const values = item.values;
    const options = item.options;
    const events = item.events;
    const states = item.states;
    const colls  = item.collisions;

    for(let a in options){
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
        it.setState(s,states[s].transitionFrom,states[s].transitionTo,states[s].whileInState);
    }

    for(let c in colls){
        it.setCollision(c,colls[c].code);
    }

    if(item.values['film']){
        item._film = item.values['film'].val; 
    }

    if(item.values['frame']){
        item._frame = item.values['frame'].val; 
    }

    if(item._film){
        it.setFilm(item._film);
    }

    if(item._frame){
        it.setFrame(item._frame);
    }

    if(item._currState){
        it.setCurrentState(item._currState);
    }

}

function inputHandler(key) {
    if(bb.fastGet('actions',key.substring(7))){
        console.log(key);
        bb.fastGet('actions',key.substring(7))();
    }else {
        if(bb.fastGet('state','mode') !== 'editing'
        && bb.fastGet('state','mode') !== 'play'
        && bb.fastGet('state','mode') !== 'paused')
            return;
        Engine.ObjectManager.getObjectByName('Keyboard').triggerEvent(key);
    }
    // if(bb.fastGet('state','mode') === 'editing')return;
    // if(keyToAction[key]){
    //     keyToAction[key].forEach((action)=>bb.fastGet('actions',action)());
    // }
}

function msToString(ms1,ms2){
    let diff = Math.abs(ms1 - ms2);
    const secs = Number.parseInt(diff / 1000);
    diff = diff - secs*1000;
    return `${secs},${diff}s`;
}

const utils = new Utils();

export default utils;