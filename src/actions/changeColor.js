import bb from '../utils/blackboard.js'

function changeColor(objName){
    let obj = bb.fastGet('liveObjects',objName);
    if(obj)obj.setColor("#"+document.getElementById("inputss").value);
}

bb.fastSet('actions','changeColor',changeColor)