import collisionHolder from './collisionHolder.js'

import Engine from '../../Engine.js'

import Manager from '../Manager.js'

export default class CollisionManager extends Manager{
    installCollision(obj1, obj2,codeAsText){
        collisionHolder.installCollision(obj1, obj2, codeAsText);
    }
    
    removeCollision(obj1ID, obj2ID){
        return collisionHolder.removeCollision(obj1ID, obj2ID);
    }

    checkAndInvoke(arrOfObj){
        collisionHolder.checkAndInvoke(arrOfObj, (codes,currObj)=>{Engine.ScriptingManager.executeCode(codes,currObj)});
    }

    getAllCollisions(){
        return collisionHolder.getAllCollisions();
    }

    getCollisions(objID){
        return collisionHolder.getCollisions(objID);
    }

    getCollision(obj1ID, obj2ID){
        return collisionHolder.getCollision(obj1ID, obj2ID);
    }

    setCollision(obj1ID, obj2ID, codeAsText){
        return collisionHolder.setCollision(obj1ID, obj2ID, codeAsText);
    }

}