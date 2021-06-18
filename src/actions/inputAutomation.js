import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

if(Engine.hasManager('InputAutomationManager')){
    bb.fastInstall('actions','start input',()=>Engine.InputAutomationManager.startInputAutomation());
}