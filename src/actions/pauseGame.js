import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'


if(Engine.hasManager('PauseManager')){
    bb.fastInstall('actions', 'pauseGame', ()=>{
        if(Engine.TimewarpManager?.isRecording()){
            Engine.TimewarpManager.stopRecording();
        }else{
            Engine.PauseManager.pause();
        }
    });
    bb.fastInstall('actions', 'resumeGame', ()=>Engine.PauseManager.resume());

    bb.fastInstall('actions', 'togglePause', ()=>{
        if(Engine.PauseManager.isPaused()){
            bb.fastSet('events','showFeedback',`Resume`);
            Engine.PauseManager.resume();
        }else{
            Engine.PauseManager.pause();
            bb.fastSet('events','showFeedback',`Pause`);
        }
    });
}