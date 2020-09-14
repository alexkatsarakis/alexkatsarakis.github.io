import bb from '../../utils/blackboard.js'

import focusTransition from '../../transitionHandlers/focusedObject.js'

import scene from './objects/Scene.js'
import camera from './objects/Camera.js'
import dragElement from '../../transitionHandlers/drag.js';

var raycaster = new THREE.Raycaster();
var mouse = { x : 0, y : 0 };

export default function translator(_x,_y){
    let x = ( _x / window.innerWidth ) * 2 - 1;
    let y = - ( _y / window.innerHeight ) * 2 + 1;
    return [x,y]
}

function translator2(_x,_y){
    let x = (window.innerWidth*(_x + 1))/2;
    let y = (window.innerHeight*(-_y + 1))/2;
    return [x,y]
}

function rightClick(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e.offsetX,e.offsetY);

    raycaster.setFromCamera( mouse, camera.getCamera() );  

    var intersects = raycaster.intersectObjects( scene.getScene().children );
    
    if(intersects.length > 0){
        //TODO: do something
        return true;
    }
    return false;
}
if(!bb.fastGet('renderer','rightClick')){
    bb.fastSet('renderer','rightClick',[rightClick]);
}else{
    bb.fastGet('renderer',"rightClick").push(rightClick);
}

function mouseDown(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e.offsetX,e.offsetY);

    raycaster.setFromCamera( mouse, camera.getCamera() );  

    var intersects = raycaster.intersectObjects( scene.getScene().children );
    
    if(intersects.length > 0){
        // dragElement(bb.fastGet('liveObjects',intersects[0].object.name).getObject());
        console.log("Drag only supported for divs ATM");
        return true;
    }
    return false;
}

if(!bb.fastGet('renderer','mouseDown')){
    bb.fastSet('renderer','mouseDown',[mouseDown]);
}else{
    bb.fastGet('renderer',"mouseDown").push(mouseDown);
}

function leftClick(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e.offsetX,e.offsetY);
    raycaster.setFromCamera( mouse, camera.getCamera() );  

    var intersects = raycaster.intersectObjects( scene.getScene().children );
    
    if(intersects.length > 0){
        focusTransition(intersects[0].object.name);
        // TODO: do something
        return true;
    }
    return false;
}

if(!bb.fastGet('renderer','leftClick')){
    bb.fastSet('renderer','leftClick',[leftClick]);
}else{
    bb.fastGet('renderer',"leftClick").push(leftClick);
}