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

    _name;
    _anim;

    _finish(){
        if (!this.hasFinished()) {
            this.notifyStopped();
        }
    }

    constructor(){
        this._name = 'Animator';
        this._lastTime = 0;
        this._state = this.animatorStates.FINISHED;
        animatorManager.register(this);
    }

    destroy(){
        animatorManager.markAsSuspended(this);
        this._state = this.animatorStates.STOPPED;
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

    get animation(){
        return this._anim;
    }

    notifyAction(){
        if(this._onAction)this._onAction(this, this._anim);
    }

    notifyStopped(){
        animatorManager.markAsSuspended(this);
        if(this._onFinish)this._onFinish(this, this._anim);
    }

    notifyStarted(){
        animatorManager.markAsRunning(this);
        if(this._onStart)this._onStart(this, this._anim);
    }

}