import bb from '../utils/blackboard.js'

export default function focusedObjectTransition(toObj){
    if(document.getElementById('objMenu'))document.getElementById('objMenu').remove();
    if(document.getElementById('focusedObjText').innerText === toObj)return;
    toObj = (toObj)?toObj:"Stage";
    document.getElementById("focusedObjText").innerText = toObj;
    bb.fastSet('state','focusedObject',toObj);
}
