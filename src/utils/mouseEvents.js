import bb from '../utils/blackboard.js'

var raycaster = new THREE.Raycaster();
var mouse = { x : 0, y : 0 };

export function rightClick(e){
    e.preventDefault();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.offsetY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, bb.fastGet('liveObjects','camera').getCamera() );  

    var intersects = raycaster.intersectObjects( bb.fastGet('liveObjects','scene').getScene().children );
    
    if(intersects.length > 0){
        console.log( intersects[0].object.name );
        // intersects[0].object.userData.setAction(document.getElementById("inputss").value);    
    }
}

export function leftClick(e){
    e.preventDefault();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.offsetY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, bb.fastGet('liveObjects','camera').getCamera() );  

    var intersects = raycaster.intersectObjects( bb.fastGet('liveObjects','scene').getScene().children );
    
    if(intersects.length > 0){
        console.log( intersects[0].object );
        document.getElementById("focusedText").innerHTML = intersects[0].object.name
        bb.fastSet('state','focusedObject',intersects[0].object.name);
        // eval(intersects[0].object.userData.getAction()); 
    }

}