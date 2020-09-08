import bb from '../utils/blackboard.js'

import focusTransition from '../transitionHandlers/focusedObject.js'

var raycaster = new THREE.Raycaster();
var mouse = { x : 0, y : 0 };

export function rightClick(e){
    e.preventDefault();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.offsetY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, bb.fastGet('liveObjects','camera').getCamera() );  

    var intersects = raycaster.intersectObjects( bb.fastGet('liveObjects','scene').getScene().children );
    
    if(intersects.length > 0){
        bb.fastGet('liveObjects',intersects[0].object.name).setAction(Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace)); 
    }
}

export function leftClick(e){
    e.preventDefault();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.offsetY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, bb.fastGet('liveObjects','camera').getCamera() );  

    var intersects = raycaster.intersectObjects( bb.fastGet('liveObjects','scene').getScene().children );
    
    if(intersects.length > 0){
        focusTransition(intersects[0].object.name);
        eval(bb.fastGet('liveObjects',intersects[0].object.name).getAction()); 
    }

}