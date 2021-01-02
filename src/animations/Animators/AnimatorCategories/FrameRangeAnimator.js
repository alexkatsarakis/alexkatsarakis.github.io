import MovingAnimator from './MovingAnimator.js'

export default class FrameRangeAnimator extends MovingAnimator{
    _currentFrame;
    _currentRep;

    progress(currTime){
        if(this.hasFinished())return;

        while(currTime > this._lastTime && (currTime - this._lastTime) >= this._anim.delay){
            if(this._currentFrame == this._anim.endFrame){
                this._currentFrame = this._anim.startFrame;
            }else{
                ++this._currentFrame;
            }
            
            this._lastTime += this._anim.delay;
            this.notifyAction();
            if(this._currentFrame == this._anim.endFrame){
                if(!this._anim.isForever() && ++this._currentRep == this._anim.reps){
                    this._state = this.animatorStates.FINISHED;
                    this.notifyStopped();
                    return;
                }
            }
        }
    }

    start({animation,timestamp}){
        this._anim = animation;
        this._lastTime = timestamp;
        this._state = this.animatorStates.RUNNING;
        this._currentFrame = animation.startFrame;
        this._currentRep = 0;
        this.notifyStarted();
        this.notifyAction();
    }

    get currentFrame(){
        return this._currentFrame;
    }

    get currentRep(){
        return this._currentRep;
    }

}