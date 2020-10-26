import bb from '../../utils/blackboard.js'

import logManager from '../../utils/logs.js'

function renameObject(obj,newName){
    if(bb.fastGet('liveObjects',newName)){
        logManager.logError("Name " + newName + " already exists");
        return;
    }
    obj.setName(newName);
}

bb.fastInstall('actions','renameObject',renameObject);