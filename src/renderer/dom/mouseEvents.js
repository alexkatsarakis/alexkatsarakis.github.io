import bb from '../../utils/blackboard.js'

import focusTransition from '../../transitionHandlers/focusedObject.js'

var mouse = { x : 0, y : 0 };

function translator(ev){
    return [ev.offsetX,ev.offsetY]
}

function pxToNumber(str){
    str.substr(1,str.length-4);
    return parseInt(str);
}

function focused(obj,x,y){
    if(obj.renderer !== 'dom')return false;
    let boundingBox = obj.getBoundingBox();
    if(boundingBox.x < x
    && boundingBox.x + boundingBox.width > x
    && boundingBox.y < y
    && boundingBox.y + boundingBox.height > y){
        return true;
    }
    return false;
}

function rightClick(e){
    // e.preventDefault();
    [mouse.x,mouse.y] = translator(e);
    return false;
    // if(intersects.length > 0){
    //     bb.fastGet('liveObjects',intersects[0].object.name).setAction(Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace)); 
    // }
}

if(!bb.fastGet('renderer','rightClick')){
    bb.fastSet('renderer','rightClick',[rightClick]);
}else{
    bb.fastGet('renderer',"rightClick").push(rightClick);
}


function leftClick(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e);
    let aliveItems = bb.getComponent('liveObjects').itemMap;
    for(var it in aliveItems){
        // console.log(aliveItems[it].getPosition());
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            focusTransition(it);
            return true;
        }
    }
    return false;
    // if(intersects.length > 0){
    //     focusTransition(intersects[0].object.name);
    //     eval(bb.fastGet('liveObjects',intersects[0].object.name).getAction()); 
    // }

}

if(!bb.fastGet('renderer','leftClick')){
    bb.fastSet('renderer','leftClick',[leftClick]);
}else{
    bb.fastGet('renderer',"leftClick").push(leftClick);
}