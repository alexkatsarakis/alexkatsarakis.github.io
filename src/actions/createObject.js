import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

function createObject({category,name,colour,position}){
    let catO = bb.fastGet('objects',category);
    if(typeof catO !== "function"){console.log("There is no category "+category);return;}
    let it = new catO({name});
    if(colour)it.setColor(colour);
    if(position)it.setPosition(position.x,position.y);
    it.add();
    if(bb.fastGet('physics','addToWorld'))bb.fastGet('physics','addToWorld')(it);
    logManager.logAction("Created Object ["+name+"]");
}

bb.fastInstall('actions','createObject',createObject)