import utils from '../../../utils/utils.js'
import bb from '../../../utils/blackboard.js'
import Engine from '../../../Engine.js';

export default class TimewarpMechanism {
    _timeWarping;
    _currDiff;

    _objectState;

    _inter;
    _playBackInter;
    _startedRecordedTime;

    constructor(){
        this._playBackInter = {};
        this._timeWarping = {};
        this._currDiff = [];
        this._isRecording = false;
        this._objectState = {};
        this._startedRecordedTime = undefined;
    }

    async saveTimeFrame(){
        const gameTime = bb.fastGet('state','gameTime');
        
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
            diff: this._currDiff,
            animators: animators
        }
        this._currDiff = [];
    }

    startRecording(interval) {
        if(this._isRecording)return;
        this._timeWarping = {};
        this._objectState['onStart'] = Engine.SaveManager.saveObjectsLocal(); 
        bb.installWatch('events','last',this.log.bind(this));
        this._inter = Engine.ClockManager.callIn(this.saveTimeFrame.bind(this),[],interval,true);
        this._startedRecordedTime = bb.fastGet('state','gameTime');
        this.saveTimeFrame();
    }

    stopRecording(){
        this._objectState['onEnd'] = Engine.SaveManager.saveObjectsLocal(); 
        Engine.ClockManager.cancelCallBack(this._inter);
        this._inter = undefined;
        Engine.PauseManager.pause();
    }

    get isRecording(){
        return (this._inter !== undefined);
    }

    stopPlayback(){
        for(let i in this._playBackInter){
            Engine.ClockManager.cancelCallBack(this._playBackInter[i]);
        }
        this._playBackInter = {};
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

        const objState = JSON.parse(JSON.stringify(this._objectState['onStart']));

        const ts = Object.keys(this._timeWarping);

        const index = ts.indexOf(timeStamp+'');

        for(let i = 0; i !== index; ++i){
            const diff = this._timeWarping[ts[i]].diff;

            const toClear = [];
            diff.forEach(ev=>{
                const info = ev.data;
                switch(ev.type){
                    case 'setValue':
                        objState[ev.objectID].values[info.type].val = info.value;
                        break;
                    case 'setCurrentState':
                        objState[ev.objectID]._currState = info.newState.tag;
                        break;
                    case 'setOption':
                        objState[ev.objectID].options[info.type].val = info.value;
                        break;
                    case 'addObject':
                        objState[ev.objectID] = info.object;
                        break;
                    case 'removeObject':
                        toClear.push(ev);
                        delete objState[ev.objectID];
                        break;
                    default:
                        debugger;
                }
            });

            toClear.forEach(ev=>{
                if(!Engine.ObjectManager.objects[ev.objectID])return;
                Engine.ObjectManager.objects[ev.objectID].remove();
            });
        }
        
        for(let i in objState){
            const obj = objState[i];
            utils.resetObject(obj);
        }

        document.getElementById('timewarp-showRecords').value = timeStamp - this._startedRecordedTime;
    
        document.getElementById('timewarp-current-frame').innerHTML = `Frame: ${frame}`;

        document.getElementById('timewarp-current-frame-time').innerHTML = `Time: ${utils.msToString(this._startedRecordedTime,timeStamp)}`;
    
    }

    getRecordedTimestamps(){
        return Object.keys(this._timeWarping);
    }

    resumeFromRecording(timeStamp){
        this.stopPlayback();
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

    log(arg) {
        if(!this.isRecording)return;
        if(arg.type === 'addObject'){
            this._currDiff.unshift(arg);
        }else{
            this._currDiff.push(arg);
        }
        bb.installWatch('events','last',this.log.bind(this));
    }

    get isReoccuring(){
        return false;
    }

    getDiffs(){
        const diffs = {}
        for(let i in this._timeWarping){
            diffs[i] = this._timeWarping[i].diff
        }
        return diffs;
    }
}