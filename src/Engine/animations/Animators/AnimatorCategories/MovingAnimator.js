import Animator from '../Animator.js'

export default class MovingAnimator extends Animator {

    _currentRep;
    _anim; // MovingAnimation

    constructor(){
        super();
        this._currentRep = 0;
    }

    progress(currTime){
        if(this.hasFinished())return;

        while(currTime > this._lastTime && (currTime - this._lastTime) >= this._anim.delay){
            this._lastTime += this._anim.delay;
            this.notifyAction();// this.notifyAction(this._anim);
            if(!this._anim.isForever() && ++this._currentRep == this._anim.reps){
                this._state = this.animatorStates.FINISHED;
                this.notifyStopped();
                return;
            }
        }
    }

    get animation(){
        return this._anim;
    }

    start({animation,timestamp}){
        this._anim = animation;
        this._lastTime = timestamp;
        this._state = this.animatorStates.RUNNING;
        this._currentRep = 0;
        this.notifyStarted();
    }

}