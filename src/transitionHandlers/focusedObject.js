import bb from '../utils/blackboard.js'

export default function focusedObjectTransition(toObj){
    // Do not refresh things if the current focused object is the the new target object 
    let currObj = bb.fastGet('state', 'focusedObject');
    if(currObj && currObj.id === toObj)return;

    let obj;
    if(toObj){
        obj = bb.fastGet('Engine','ObjectManager').getObject(toObj);
    }else{
        obj =bb.fastGet('Engine','ObjectManager').getObjectByName('Stage')
    }
    bb.fastSet('state','focusedObject',obj);
}
