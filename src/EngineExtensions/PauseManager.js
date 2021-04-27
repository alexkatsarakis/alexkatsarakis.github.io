import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

import Manager from '../Engine/Manager.js'

export default class PauseManager extends Manager{
    
    _timePaused
    _prevGameState

    _onPauseCB
    _onResumeCB

    constructor(){
        super();
        this._timePaused = undefined;
        this._onPauseCB = [];
        this._onResumeCB = [];

        // window.onfocus = ()=>{
        //     this.resume();
        // }
        
        // window.onblur = ()=>{
        //     this.pause();
        // }

    }


    addOnPause(cb){
        this._onPauseCB.push(cb);
    }

    addOnResume(cb){
        this._onResumeCB.push(cb);
    }

    pause(){
        if(this._timePaused) throw Error('Pause while paused');
        this._timePaused = bb.fastGet('state','gameTime');
        Engine.game.pause();

        this._onPauseCB.forEach((cb)=>{
            cb();
        });       
        const objects = Engine.ObjectManager.objects;
        for(let i in objects){
            objects[i].triggerEvent('onResume');
        }
        
        this._prevGameState = bb.fastGet('state','mode');
        bb.fastSet('state', 'mode', 'paused');
    }

    resume(){
        if(!this._timePaused) throw Error('Resume without pause');
        let timePassed = bb.fastGet('state','gameTime') - this._timePaused;

        Engine.AnimationManager.timeShift(timePassed);
        
        Engine.game.unpause();
        this._timePaused = undefined;
        bb.fastSet('state', 'mode', this._prevGameState);
        this._prevGameState = undefined;
        
        this._onResumeCB.forEach((cb)=>{
            cb(timePassed);
        });
        const objects = Engine.ObjectManager.objects;
        for(let i in objects){
            objects[i].triggerEvent('onResume');
        }
    }
}