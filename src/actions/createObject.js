import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

import Engine from '../Engine.js'

function createObject({category,name,colour,position}){
    let catO = Engine.ObjectManager.getConstructor(category);
    if(typeof catO !== "function"){console.log("There is no category "+category);return;}
    let it = new catO({name});
    if(colour)it.setValue('colour',colour);
    if(position)it.setPosition(position.x,position.y);
    it.add();
    if(Engine.PhysicsManager)Engine.PhysicsManager.addToWorld(it);
    logManager.logAction("Created Object ["+name+"]");
}

bb.fastInstall('actions','createObject',createObject)