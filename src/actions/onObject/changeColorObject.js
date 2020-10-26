import bb from '../../utils/blackboard.js'

function changeColor(obj,colour){
    if(!obj)obj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
    if(obj)obj.setColor(colour);
}

bb.fastInstall('actions','changeColor',changeColor)