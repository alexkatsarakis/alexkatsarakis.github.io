import Manager from '../../Engine/Manager.js'


import twSnapshot from './Mechanisms/TimewarpMechanismSnapshots.js'
import twDS from './Mechanisms/TimewarpMechanismDeltaState.js'

export default class TimewarpManager extends Manager{

    _installedTimewarps
    _currentTimewarp

    constructor(){
        super();
        this._installedTimewarps = {}
        this._installedTimewarps['Snapshot'] = new twSnapshot();
        this._installedTimewarps['DS'] = new twDS();
        this.setTimewarpMechanism('DS');
    }

    setTimewarpMechanism(twID){
        const mechanism = this._installedTimewarps[twID];
        if(!mechanism) throw Error('Tried to set mechanism that isn\'t Installed');

        this._currentTimewarp = mechanism;
    }

    saveTimeFrame(){
        this._currentTimewarp.saveTimeFrame();
    }

    startRecording(interval) {
        this._currentTimewarp.startRecording(interval);
    }

    stopRecording(){
        this._currentTimewarp.stopRecording();
    }

    isRecording(){
        return this._currentTimewarp.isRecording;
    }

    stopPlayback(){
        this._currentTimewarp.stopPlayback();
    }

    playForward(fromTimestamp,speedFactor = 1){
        this._currentTimewarp.playForward(fromTimestamp,speedFactor);
    }

    playBackward(fromTimestamp,speedFactor = 1){
        this._currentTimewarp.playBackward(fromTimestamp,speedFactor);
    }

    showSnapshot(timeStamp,frame){
        this._currentTimewarp.showSnapshot(timeStamp,frame);
    }

    getRecordedTimestamps(){
        return this._currentTimewarp.getRecordedTimestamps();
    }

    resumeFromRecording(timeStamp){
        this._currentTimewarp.resumeFromRecording(timeStamp);
    }

    isReoccuring(){
        return this._currentTimewarp.isReoccuring;
    }

    saveTimeline(){
        if(!this._currentTimewarp.isReoccuring)return;
        this._currentTimewarp.saveTimeline();
    }

    getTimelines(){
        if(!this._currentTimewarp.isReoccuring)return;
        return this._currentTimewarp.getTimelines();
    }

    clearTimelines(index){
        if(!this._currentTimewarp.isReoccuring)return;
        return this._currentTimewarp.clearTimelines(index);
    }

    setTimeline(index){
        if(!this._currentTimewarp.isReoccuring)return;
        return this._currentTimewarp.setTimeline(index);
    }

    getCurrentTimeline(){
        if(!this._currentTimewarp.isReoccuring)return -1;
        return this._currentTimewarp.currentTimeline;
    }
}