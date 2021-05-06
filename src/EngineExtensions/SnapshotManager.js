import bb from '../utils/blackboard.js'
import utils from '../utils/utils.js'

import Manager from '../Engine/Manager.js'

import Engine from '../Engine.js'

export default class SnapshotManager extends Manager{
    _collection;
    _sceneCollection;

    constructor(){
        super();
        this._collection = {};
        this._sceneCollection = {};
    }

    snapshotObject(item = bb.fastGet('state','focusedObject')){
        let objCollection = this._collection[item.id];
        if(!objCollection){
            this._collection[item.id] = [];
        }
        let snap = JSON.parse(item.toString());
        snap._time = Engine.ClockManager.getTime();
        this._collection[item.id].push(snap);
    }
    
    getSnapshots(item){
        return this._collection[item.id];
    }
    
    getAllSnapshots(){
        return this._collection;
    }

    resetObjectToSnapshot(objID,snapID){
        utils.resetObject(this._collection[objID][snapID]);
    }

    snapshotScene(optName){
        let gameTime = bb.fastGet('state','gameTime');
        let objects = Engine.SaveManager.saveObjectsLocal();
        
        let animators = [];
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

        this._sceneCollection[gameTime] = {
            timeStamp: gameTime,
            time: Engine.ClockManager.getTime(),
            objects: objects,
            animators: animators,
            name: optName
        }
    }

    resetSceneToSnapshot(timeStamp){
        let timeWarp = this._sceneCollection[timeStamp];
        if(!timeWarp)throw Error('Tried to resume a time that was not recorded');

        let objs = timeWarp.objects;
        // find if an object has been deleted; and if it has then delete if from map;
        let liveObjs = Engine.ObjectManager.objects;
        for(let i in liveObjs){
            if(!objs[i])liveObjs[i].remove();
        }

        for(let i in objs){
            let obj = objs[i];
            utils.resetObject(obj);
        }

        let animators = Engine.AnimationManager.getAnimators();
        animators.forEach((animator)=>animator.destroy());

        timeWarp.animators.forEach((an)=>{
            let Animator = Engine.AnimationManager.getAnimatorCategory(an._name);
            if(!Animator)return;
        
            let animator = new Animator();


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

    getAllSceneSnapshots(){
        return this._sceneCollection;
    }
}

