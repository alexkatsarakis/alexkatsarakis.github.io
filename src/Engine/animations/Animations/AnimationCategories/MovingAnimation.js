import Animation from '../Animation.js'

export default class MovingAnimation extends Animation {
    _reps; // -1 = forever
    _dx;
    _dy;
    _delay;


    constructor({id,reps,dx,dy,delay}){
        super(id);
        this._reps = (reps)?reps:1;
        this._dx = (dx)?dx:0;
        this._dy = (dy)?dy:0;
        this._delay = (delay)?delay:100;
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