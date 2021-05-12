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
        const objCollection = this._collection[item.id];
        if(!objCollection){
            this._collection[item.id] = [];
        }
        const snap = JSON.parse(item.toString());
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

        this._sceneCollection[gameTime] = {
            timeStamp: gameTime,
            time: Engine.ClockManager.getTime(),
            objects: objects,
            animators: animators,
            name: optName
        }
    }

    resetSceneToSnapshot(timeStamp){
        const timeWarp = this._sceneCollection[timeStamp];
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

    getAllSceneSnapshots(){
        return this._sceneCollection;
    }
}

