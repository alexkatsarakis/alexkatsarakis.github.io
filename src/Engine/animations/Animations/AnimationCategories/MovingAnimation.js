import Animation from '../Animation.js'

export default class MovingAnimation extends Animation {
    _reps; // -1 = forever
    _dx;
    _dy;
    _delay;


    constructor({id,reps = 1,dx = 0,dy = 0,delay = 100}){
        super(id);
        this._reps = reps;
        this._dx = dx;
        this._dy = dy;
        this._delay = delay;
    }

    get dx(){
        return this._dx;
    }

    set dx(newDx){
        this._dx = newDx;
    }

    get dy(){
        return this._dy;
    }

    set dy(newDy){
        this._dy = newDy;
    }

    get delay(){
        return this._delay;
    }

    set delay(newDelay){
        this._delay = newDelay;
    }

    get reps(){
        return this._reps;
    }

    set reps(newReps){
        this._reps = newReps;
    }

    isForever(){
        return !this._delay;
    }
}