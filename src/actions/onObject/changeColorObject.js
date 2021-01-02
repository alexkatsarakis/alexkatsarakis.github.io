import bb from '../../utils/blackboard.js'

function changeColor(obj,colour){
    if(!obj) console.log('Didn\'t provided object on color change');
    // if(!obj)obj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
    if(obj)obj.setColor(colour);
}

bb.fastInstall('actions','changeColor',changeColor)