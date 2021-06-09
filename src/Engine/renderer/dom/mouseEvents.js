import bb from '../../../utils/blackboard.js'

import dragElement from '../../../utils/drag.js';

import objManager from '../ObjectManager.js'

let mouse = { x : 0, y : 0 };
let isClickThrough = false;
function translator(ev){
    return [ev.offsetX,ev.offsetY]
}


function focused(obj,x,y){
    if(obj.renderer !== 'dom')return false;
    
    const mapCoords = obj.getMapCoords();
    const boundingBox = {
        x: mapCoords[0],
        y: mapCoords[1],
        width: obj.getValue('width'),
        height: obj.getValue('height')
    };
    if(isClickThrough)
        return( bb.fastGet('state','focusedObject') !== obj 
            && (boundingBox.x < x
            && boundingBox.x + boundingBox.width > x
            && boundingBox.y < y
            && boundingBox.y + boundingBox.height > y));
    else
        return(boundingBox.x < x
        && boundingBox.x + boundingBox.width > x
        && boundingBox.y < y
        && boundingBox.y + boundingBox.height > y);
}

function rightClick(e){
    e.preventDefault();
    isClickThrough = bb.fastGet('settings','Clicking Through Objects');
    [mouse.x,mouse.y] = translator(e);
    const aliveItems = objManager.objects;
    for(var it in aliveItems){
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            return aliveItems[it];
        }
    }
}

function mouseDown(e){
    [mouse.x,mouse.y] = translator(e);
    const aliveItems = objManager.objects;
    for(var it in aliveItems){
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            if(!aliveItems[it].getOption('isMovable'))return false;
            if(bb.fastGet('settings','Dragging Objects'))dragElement(aliveItems[it],e);
            return true;
        }
    }
}

function leftClick(e){
    isClickThrough = bb.fastGet('settings','Clicking Through Objects');
    [mouse.x,mouse.y] = translator(e);
    const aliveItems = objManager.objects;
    for(var it in aliveItems){
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            aliveItems[it].div.click(e);
            if(aliveItems[it].div.tagName === 'IFRAME'){
                aliveItems[it].div.style.zIndex = '1';
            }
            return aliveItems[it];
        }
    }
    return false;

}

export default {
    'leftClick': leftClick,
    'rightClick': rightClick,
    'mouseDown': mouseDown
}