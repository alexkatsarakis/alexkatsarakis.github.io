import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'


if(Engine.hasManager('PauseManager')){
    bb.fastInstall('actions', 'Pause Game', ()=>{
        if(Engine.TimewarpManager?.isRecording()){
            Engine.TimewarpManager.stopRecording();
        }else{
            Engine.PauseManager.pause();
        }
    });
    bb.fastInstall('actions', 'Resume Game', ()=>Engine.PauseManager.resume());

    bb.fastInstall('actions', 'Pause/Resume Toggle', ()=>{
        if(Engine.PauseManager.isPaused()){
            bb.fastSet('events','showFeedback',`Resume`);
            Engine.PauseManager.resume();
        }else{
            Engine.PauseManager.pause();
            bb.fastSet('events','showFeedback',`Pause`);
        }
    });
}