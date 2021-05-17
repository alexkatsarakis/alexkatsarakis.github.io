import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

if(Engine.hasManager('SaveManager')){
    bb.fastInstall('actions','saveToDatabase',()=>Engine.SaveManager.saveGame());
}

if(Engine.hasManager('SaveManager')){
    bb.fastInstall('actions','saveToLocal',()=>Engine.SaveManager.saveToLocal());
}