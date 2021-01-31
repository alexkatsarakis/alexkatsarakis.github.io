import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

function pauseGame(){
    Engine.pause();
    //TODO: add pause Window;
}

bb.fastInstall('actions','pauseGame',pauseGame);

function resumeGame(){
    //TODO: destroy pause Window;
    Engine.resume();
}

bb.fastInstall('actions','resumeGame',resumeGame);