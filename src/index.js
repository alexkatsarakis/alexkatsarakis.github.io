import './utils/initialisationManager.js'

import bb from './utils/blackboard.js'
import FPSCounter from './utils/fps.js'

import {leftClick,rightClick} from './utils/mouseEvents.js'

import init from '../assets/json/init.js' //json
import keyToAction from '../assets/json/keyToActions.js' //json

var scene = bb.fastGet('liveObjects','scene').getScene();
var camera = bb.fastGet('liveObjects','camera').getCamera();

var renderer = new THREE.WebGLRenderer();
// renderer.domElement.style.position = "absolute";
// renderer.domElement.style.left = "50%";
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );



init.objects.map((item)=>{
    let category = bb.fastGet("objects",item.category);
    if(typeof category !== "function"){console.log("There is no category "+item.category)}
    if(item.meta.name === undefined 
    || !bb.fastGet('liveObjects',item.meta.name)){
        let it = new category(item.meta);
        bb.fastSet('liveObjects',item.meta.name,it);
        if(item.color)it.setColor(item.color);
        if(item.position)it.setPosition(item.position.x,item.position.y);
        scene.add(it.getObject());
        console.log(item);
    }
})





renderer.domElement.addEventListener("click", leftClick, true);
renderer.domElement.addEventListener("contextmenu", rightClick, true);

document.onkeydown = function(ev) {
    // console.log(ev);
    for(var key in keyToAction){
        if(ev.code === key){
            console.log(keyToAction[key]);
            // keyToAction[key].map((action)=>bb.fastGet('actions',action)(document.getElementById("inputss").value));
            keyToAction[key].map((action)=>bb.fastGet('actions',action)(bb.fastGet('state','focusedObject')));
        }
    }
};



let aliveItems = bb.getComponent('liveObjects').itemMap;

bb.print();


function gameLoop() {
    requestAnimationFrame( gameLoop );
    
    FPSCounter();
    for(var it in aliveItems){
        aliveItems[it].animate();
    }
    renderer.render( scene, camera );
}
gameLoop();