import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'


if(Engine.hasManager('PauseManager')){
    bb.fastInstall('actions', 'pauseGame', ()=>{
        debugger;
        if(Engine.TimewarpManager?.isRecording()){
            Engine.TimewarpManager.stopRecording();
        }else{
            Engine.PauseManager.pause();
        }
    });
    bb.fastInstall('actions', 'resumeGame', ()=>Engine.PauseManager.resume());
}