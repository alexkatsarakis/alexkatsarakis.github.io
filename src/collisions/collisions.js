import bb from '../utils/blackboard.js'

import collisionManager from './collisionManager.js'
import collisionObject from '../renderer/CollisionsObject.js' 
import collisionsObject from '../renderer/CollisionsObject.js';

collisionManager.setCodeExecutioner(bb.fastGet('scripting','executeText'));

bb.fastInstall('collisions', 'installCollision', (obj1, obj2,codeAsText) => {
    if(collisionManager.installCollision(obj1, obj2, codeAsText)){
        collisionObject.addEvent(`${obj1}_${obj2}`);
    };
});
bb.fastInstall('collisions', 'removeCollision', (obj1ID, obj2ID) => {return collisionManager.removeCollision(obj1ID, obj2ID)});
bb.fastInstall('collisions', 'checkAndInvoke', (arrOfObj) => collisionManager.checkAndInvoke(arrOfObj));
bb.fastInstall('collisions', 'getAllCollisions', () => {return collisionManager.getAllCollisions()});
bb.fastInstall('collisions', 'getCollisions', (objID) => {return collisionManager.getCollisions(objID)});
bb.fastInstall('collisions', 'getCollision', (obj1ID, obj2ID) => {return collisionManager.getCollision(obj1ID, obj2ID)});
bb.fastInstall('collisions', 'setCollision', (obj1ID, obj2ID, codeAsText) => {return collisionManager.setCollision(obj1ID, obj2ID, codeAsText)});


bb.fastInstall('collisions', 'loadSaved', () => {
    for(let i in localStorage){
        let split = i.split("_");
        if(split[0] === collisionObject.id){
            bb.fastGet('collisions', 'installCollision')(split[1],split[2],localStorage[i]);
        }
    }
});