import utils from '../utils/utils.js'
import bb from '../utils/blackboard.js'
import Engine from '../Engine.js';

import Manager from '../Engine/Manager.js'

export default class TimewarpManager extends Manager{
    _timeWarping;

    _inter;
    _playBackInter;

    _startedRecordedTime;

    constructor(){
        super();
        this._playBackInter = {};
        this._timeWarping = {};
        this._startedRecordedTime = undefined;
    }

    async saveTimeFrame(){
        const gameTime = bb.fastGet('state','gameTime');
        const objects = Engine.SaveManager.saveObjectsLocal();
        
        const animators = [];
        Engine.AnimationManager.getAnimators().forEach((an)=>{
            animators.push({
                _onAction: an._onAction,
                _onFinish: an._onFinish,
                _onStart: an._onStart,
                _lastTime: an._lastTime,
                _currentRep: an._currentRep,
                _name: an._name,
                _anim: an._anim
            });
        });

        this._timeWarping[gameTime] = {
            timeStamp: gameTime,
            objects: objects,
            animators: animators
        }
    }

    startRecording(interval) {
        this._timeWarping = {};
        this._inter = Engine.ClockManager.callIn(this.saveTimeFrame.bind(this),[],interval,true);
        this.saveTimeFrame();
        this._startedRecordedTime = bb.fastGet('state','gameTime');
    }

    stopRecording(){
        Engine.ClockManager.cancelCallBack(this._inter);
        Engine.PauseManager.pause();
    }

    stopPlayback(){
        for(let i in this._playBackInter){
            Engine.ClockManager.cancelCallBack(this._playBackInter[i]);
        }
        this._playBackInter = {};
        bb.fastSet('game','mode','timeWarp');
    }

    playForward(fromTimestamp,speedFactor = 1){
        this.stopPlayback();
        const ts = Object.keys(this._timeWarping);

        const index = ts.indexOf(fromTimestamp+'');

        if(index === -1) throw Error('Tried to play forward from a timestamp that doesn\'t exist');
        if(speedFactor === 0) throw Error('');

        const factor = 1/speedFactor;

        for(let i = index; i < ts.length; i++){
            const realTS = Number.parseInt(ts[i]);
            let dt = realTS - fromTimestamp;
            dt = dt * factor;
            this._playBackInter[realTS] = Engine.ClockManager.callIn(()=>this.showSnapshot(realTS,i),[],dt);
        }
    }

    playBackward(fromTimestamp,speedFactor = 1){
        this.stopPlayback();
        const ts = Object.keys(this._timeWarping);

        const index = ts.indexOf(fromTimestamp+'');

        if(index === -1) throw Error('Tried to play forward from a timestamp that doesn\'t exist');
        if(speedFactor === 0) throw Error('');

        const factor = 1/speedFactor;
        for(let i = index; i >= 0; --i){
            const realTS = Number.parseInt(ts[i]);
            let dt = fromTimestamp - realTS;
            dt = dt * factor;
            this._playBackInter[realTS] = Engine.ClockManager.callIn(()=>this.showSnapshot(realTS,i),[],dt);
        }
    
    }

    showSnapshot(timeStamp,frame){
        const timeWarp = this._timeWarping[timeStamp];
        if(!timeWarp)throw Error('Tried to resume a time that was not recorded');
        
        const objs = timeWarp.objects;
        // find if an object has been deleted; and if it has then delete if from map;
        const liveObjs = Engine.ObjectManager.objects;
        for(let i in liveObjs){
            if(!objs[i])liveObjs[i].remove();
        }

        for(let i in objs){
            const obj = objs[i];
            utils.resetObject(obj);
        }
        
        if(this._playBackInter[timeStamp])delete this._playBackInter[timeStamp];

        document.getElementById('timewarp-showRecords').value = timeStamp - this._startedRecordedTime;

        document.getElementById('timewarp-currFrame').innerHTML = `Frame: ${frame}`;
    
        document.getElementById('timewarp-currFrameTime').innerHTML = `Time: ${utils.msToString(this._startedRecordedTime,timeStamp)}`;
    
    }

    getRecordedTimestamps(){
        return Object.keys(this._timeWarping);
    }

    resumeFromRecording(timeStamp){

        const timeWarp = this._timeWarping[timeStamp];
        if(!timeWarp)throw Error('Tried to resume a time that was not recorded');

        this.showSnapshot(timeStamp);
        Engine.PauseManager.resume();

        const animators = Engine.AnimationManager.getAnimators();
        animators.forEach((animator)=>animator.destroy());

        timeWarp.animators.forEach((an)=>{
            const Animator = Engine.AnimationManager.getAnimatorCategory(an._name);
            if(!Animator)return;
        
            const animator = new Animator();


            animator.onStart = an._onStart;
            animator.onAction = an._onAction;
            animator.onFinish = an._onFinish;
        
            animator.start({
                animation: an._anim,
                timestamp: timeWarp.timeStamp,
            });

            animator._lastTime = an._lastTime;
            animator._currentRep = an._currentRep+1;

        });
        Engine.AnimationManager.timeShift(bb.fastGet('state','gameTime') - timeWarp.timeStamp);
    }

}