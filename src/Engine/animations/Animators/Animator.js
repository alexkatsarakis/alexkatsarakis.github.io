import animatorManager from './AnimatorManager.js'

export default class Animator {
    animatorStates = {
        RUNNING: 0,
        FINISHED: 1,
        STOPPED: 2
    }
    _onStart;
    _onFinish;
    _onAction;

    _lastTime;
    _state;

    _finish(){
        if (!this.hasFinished()) {
            this.notifyStopped();
        }
    }

    constructor(){
        this._lastTime = 0;
        this._state = this.animatorStates.FINISHED;
        animatorManager.register(this);
    }

    destroy(){
        animatorManager.markAsSuspended(this);
    }

    stop(){
        this._finish();
        this._state = this.animatorStates.STOPPED;
    }

    timeShift(offset){
        this._lastTime += offset;
    }

    hasFinished(){
        return !(this._state === this.animatorStates.RUNNING);
    }

    set onStart(f){
        this._onStart = f;
    }

    set onFinish(f){
        this._onFinish = f;
    }

    set onAction(f){
        this._onAction = f;
    }

    notifyAction(){
        if(this._onAction)this._onAction(this);
    }

    notifyStopped(){
        animatorManager.markAsSuspended(this);
        if(this._onFinish)this._onFinish();
    }

    notifyStarted(){
        animatorManager.markAsRunning(this);
        if(this._onStart)this._onStart();
    }

}