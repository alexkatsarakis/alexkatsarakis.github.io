import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

export default class PauseManager {
    _timePaused

    constructor(){
        this._timePaused = undefined;
    }

    pause(){
        if(this._timePaused) throw Error('Pause while paused');
        this._timePaused = bb.fastGet('state','gameTime');
        Engine.game.pause();
    }

    resume(){
        if(!this._timePaused) throw Error('Resume without pause');
        Engine.AnimationManager.timeShift(bb.fastGet('state','gameTime') - this._timePaused);
        Engine.game.unpause();
        this._timePaused = undefined;
    }
}