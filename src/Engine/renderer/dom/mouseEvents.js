import bb from '../../../utils/blackboard.js'

import focusTransition from '../../../transitionHandlers/focusedObject.js'
import dragElement from '../../../transitionHandlers/drag.js';

import objManager from '../renderer.js'

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
    // console.log(obj.name,boundingBox);
    if(boundingBox.x < x
    && boundingBox.x + boundingBox.width > x
    && boundingBox.y < y
    && boundingBox.y + boundingBox.height > y){
        return true;
    }
    return false;
}

function rightClick(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e);
    let aliveItems = objManager.objects;
    for(var it in aliveItems){
        // console.log(aliveItems[it].getPosition());
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            // aliveItems[it].getObject().click();
            focusTransition(it);
            aliveItems[it].triggerEvent('onRightClick');
            return true;
        }
    }
}

if(!bb.fastGet('renderer','rightClick')){
    bb.fastSet('renderer','rightClick',[rightClick]);
}else{
    bb.fastGet('renderer',"rightClick").push(rightClick);
}

function mouseDown(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e);
    let aliveItems = objManager.objects;
    for(var it in aliveItems){
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            if(!aliveItems[it].getOption('isMovable'))return false;
            if(!bb.fastGet('settings','noDrag'))dragElement(aliveItems[it],e);
            return true;
        }
    }
}

if(!bb.fastGet('renderer','mouseDown')){
    bb.fastSet('renderer','mouseDown',[mouseDown]);
}else{
    bb.fastGet('renderer',"mouseDown").push(mouseDown);
}


function leftClick(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e);
    let aliveItems = objManager.objects;
    for(var it in aliveItems){
        // console.log(aliveItems[it].getPosition());
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            focusTransition(it);
            aliveItems[it].triggerEvent('onClick');
            return true;
        }
    }
    return false;

}

if(!bb.fastGet('renderer','leftClick')){
    bb.fastSet('renderer','leftClick',[leftClick]);
}else{
    bb.fastGet('renderer',"leftClick").push(leftClick);
}