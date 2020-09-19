import bb from '../utils/blackboard.js'

export default function focusedObjectTransition(toObj){
    if(document.getElementById('objMenu'))document.getElementById('objMenu').remove();
    if(document.getElementById('focusedObjText').innerText === toObj)return;
    document.getElementById("focusedObjText").innerText = (toObj)?toObj:"";
    bb.fastSet('state','focusedObject',toObj);
}
