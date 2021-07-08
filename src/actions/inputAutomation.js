import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

if(Engine.hasManager('InputAutomationManager')){
    bb.fastInstall('actions','start input',()=>Engine.InputAutomationManager.startInputAutomation());
    bb.fastInstall('actions','start recording inputs', ()=>Engine.InputAutomationManager.startRecording());
    bb.fastInstall('actions','stop recording inputs',()=>Engine.InputAutomationManager.stopRecording());
}