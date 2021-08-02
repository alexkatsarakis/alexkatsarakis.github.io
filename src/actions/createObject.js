import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

import Engine from '../Engine.js'

function createObject({category,name,color,position}){
    const catO = Engine.ObjectManager.getConstructor(category);
    if(typeof catO !== "function"){console.log("There is no category "+category);return;}
    const it = new catO({name});
    if(color)it.setValue('color',color);
    if(position)it.setPosition(position.x,position.y);
    it.add();
    logManager.logAction("Created Object ["+name+"]");
}

bb.fastInstall('actions','createObject',createObject)