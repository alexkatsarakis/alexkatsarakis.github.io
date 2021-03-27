import bb from '../../utils/blackboard.js'

import idCreator from '../../utils/randomGenerator.js'

import Engine from '../../Engine.js'

class Callback {
    _id

    _timeInitiated
    _timeToFire
    _delay
    _function
    _arguments

    constructor({cb, args, delay = 1000}){
        if(!cb && typeof cb !== 'function') throw Error('Created callback without a valid function');
        this._id = idCreator.randomString({capital: true, small: true, number: true, length: 10});
        this._delay = delay;
        this._timeInitiated = bb.fastGet('state','gameTime');
        this._timeToFire = this._timeInitiated + delay;
        this._arguments = args;
        this._function = cb;
    }

    get id(){
        return this._id;
    }

    get timeToFire(){
        return this._timeToFire;
    }

    timeShift(time){
        this._timeToFire = this._timeToFire + time;
    }

    fireCallback() {
        this._function(this._arguments);
    }
}

export default class ClockManager {
    _lastTime
    _sinceLastCount

    _callbacks
    
    _checkForCB

    constructor() {
        let d = new Date();
        this._lastTime = d.getTime();
        this._sinceLastCount = 0;

        this._checkForCB = true;

        this._callbacks = {};
    }

    onLoad(){
        this.update();

        Engine.PauseManager.addOnPause(()=>{
            this._checkForCB = false;
        });

        Engine.PauseManager.addOnResume((time)=>{
            for(let i in this._callbacks){
                this._callbacks[i].timeShift(time);
            }
            this._checkForCB = true;
        });
    }

    getTime(){
        let d = new Date();
        return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getDate()}/${d.getMonth()}`;
    }

    update() {
        let currTime = new Date().getTime();
        if(currTime > this._lastTime + 1000){
            this._lastTime = currTime;
            bb.fastSet('state','FPS',this._sinceLastCount);
            this._sinceLastCount = 0;
        }else {
            this._sinceLastCount++;
        }
        bb.fastSet('state','gameTime',currTime);
        if(this._checkForCB)this.checkForCallbacks(currTime);
    }

    checkForCallbacks(currTime){
        for(let i in this._callbacks){
            let item = this._callbacks[i];
            if(item.timeToFire <= currTime){
                delete this._callbacks[i];
                item.fireCallback();
            }
        }
    }

    callIn(callback, args, delay){
        let cbObject = new Callback({cb: callback, args: args, delay: delay});
        this._callbacks[cbObject.id] = cbObject;
        return cbObject;
    }

    cancelCallBack(cbObject){
        if(this._callbacks[cbObject.id])
            delete this._callbacks[cbObject.id];
    }

}