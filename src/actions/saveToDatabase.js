import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

if(Engine.hasManager('SaveManager')){
    bb.fastInstall('actions','saveToDatabase',()=>Engine.SaveManager.saveObjects());
}
