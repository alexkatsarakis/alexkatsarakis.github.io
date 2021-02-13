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
    if(Engine.ObjectManager.getObjectByName(item._category)){
        it = Engine.ObjectManager.getObjectByName(item._category);
    }else{ 
        let category = Engine.ObjectManager.getConstructor(item._category);
        it = new category({name:item._name},item._id);
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
        if(!it.getValue(v) === undefined)it.addValue(v,values[v].val);
        else it.setValue(v,values[v].val);
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

    //TODO 
    if(it.name === 'player')
        bb.fastInstall('state','player',it);

    it.add();
    if(Engine.PhysicsManager)Engine.PhysicsManager.addToWorld(it);
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
        if(!it.getValue(v) === undefined)it.addValue(v,values[v].val);
        else it.setValue(v,values[v].val);
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
    if(key === 'Copy' || key === 'Paste'){
        console.log(key);
        bb.fastGet('actions',key)();
    }else {
        Engine.ObjectManager.getObjectByName('Keyboard').triggerEvent(key);
    }
    // if(bb.fastGet('state','mode') === 'editing')return;
    // if(keyToAction[key]){
    //     keyToAction[key].forEach((action)=>bb.fastGet('actions',action)());
    // }
}

function createObjectSmall(item){
        //     let category = Engine.ObjectManager.getConstructor(item.category);
    //     if(!category || typeof category !== "function"){console.log("There is no category "+item.category)}
    //     if(item.meta.name !== undefined){
    //         let it = new category(item.meta,item.id);
    //         if(item.color)it.setColor(item.color);
    //         if(item.position)it.setPosition(item.position.x,item.position.y);
    //         if(item.attributes){
    //             for(let a in item.attributes){
    //                 if(typeof item.attributes[a] !== "boolean")throw Error('Attributes must be boolean');
    //                 it.setOption(a,item.attributes[a]);
    //             }
    //         }
    //         if(item.fields){
    //             for(let f in item.fields){
    //                 it.addValue(f,item.fields[f]);
    //             }
    //         }
    //         if(item.events){
    //             for(let e in item.events){
    //                 it.addEvent(item.events[e]);
    //             }
    //         }
    //         if(item.states){
    //             for(let e in item.states){
    //                 it.addState(item.states[e]);
    //             }
    //         }
    //         it.add();
    //         if(Engine.PhysicsManager)Engine.PhysicsManager.addToWorld(it);
    //     }
    // });
}

const utils = new Utils();

export default utils;