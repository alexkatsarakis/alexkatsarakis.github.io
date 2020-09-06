import bb from '../utils/blackboard.js'

export default function focusedObjectTransition(toObj){
    if(document.getElementById('objMenu'))document.getElementById('objMenu').remove();
    document.getElementById("focusedObjText").innerHTML = (toObj)?toObj:"";
    bb.fastSet('state','focusedObject',toObj);
}
