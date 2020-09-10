import bb from '../utils/blackboard.js'

function changeValue(obj,value){
    if(!obj)obj = bb.fastGet('state','focusedObject');
    if(obj)obj.setValue(value);
}

bb.fastSet('actions','changeValue',changeValue)