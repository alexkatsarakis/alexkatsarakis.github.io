import MovingAnimation from './MovingAnimation.js'

export default class FrameRangeAnimation extends MovingAnimation {
    _start;
    _end;

    constructor({id,start,end,reps,dx,dy,delay}){
        super({id:id,delay:delay,dx:dx,dy:dy,reps:reps});
        this._start = start;
        this._end = end;
    }

    get startFrame(){
        return this._start;
    }

    set startFrame(sf){
        this._start = sf;
    }

    get endFrame(){
        return this._end;
    }

    set endFrame(ef){
        this._end = ef;
    }

}