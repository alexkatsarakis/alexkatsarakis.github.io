import bb from '../utils/blackboard.js'

export default function focusedObjectTransition(toObj){
    // Do not refresh things if the current focused object is the the new target object 
    if(document.getElementById('focusedObjText').innerText === toObj)return;

    if(toObj){
        let obj = bb.fastGet('Engine','ObjectManager').getObject(toObj);
        document.getElementById("focusedObjText").innerText = obj.name;
        bb.fastSet('state','focusedObject',obj);
    }else{

        toObj = (toObj)?toObj:"Stage";
        const liveObj = bb.fastGet('Engine','ObjectManager').objects;
        
        for(let i in liveObj){
            if(liveObj[i].name === 'Stage'){
                document.getElementById("focusedObjText").innerText = 'Stage';
                bb.fastSet('state','focusedObject',liveObj[i]);
                return;
            }
        }
    }
}
