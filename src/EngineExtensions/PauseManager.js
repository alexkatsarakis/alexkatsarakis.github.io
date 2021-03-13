import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

export default class PauseManager {
    _timePaused
    _prevGameState

    constructor(){
        this._timePaused = undefined;
    }

    pause(){
        if(this._timePaused) throw Error('Pause while paused');
        this._timePaused = bb.fastGet('state','gameTime'); //TODO change this to Engine.TimeManager
        Engine.game.pause();
        this._prevGameState = bb.fastGet('state','mode');
        bb.fastSet('state', 'mode', 'paused');
    }

    resume(){
        if(!this._timePaused) throw Error('Resume without pause');
        Engine.AnimationManager.timeShift(bb.fastGet('state','gameTime') - this._timePaused);
        Engine.game.unpause();
        this._timePaused = undefined;
        bb.fastSet('state', 'mode', this._prevGameState);
        this._prevGameState = undefined;
    }
}