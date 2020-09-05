import './utils/initialisationManager.js'

import {leftClick,rightClick} from './utils/mouseEvents.js'

import init from '../init.js' //json

var scene = new THREE.Scene();
scene.name = "Scene";
scene.background = new THREE.Color( 0xaaaaaa );
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.5, 1000 );

bb.fastSet('sceneComponents','scene',scene);
bb.fastSet('sceneComponents','camera',camera);

var renderer = new THREE.WebGLRenderer();
// renderer.domElement.style.position = "absolute";
// renderer.domElement.style.left = "50%";
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );

let objects = [];

init.objects.map((item)=>{
    let t = bb.fastGet("objects",item.category);
    if(typeof t !== "function"){console.log("There is no category "+item.category)}
    let it = new t({name:item.name});
    objects.push(it);
    if(item.color)it.setColor(item.color);
    if(item.position)it.setPosition(item.position.x,item.position.y);
    scene.add(it.getObject());
    console.log(item);
})

camera.position.z = 10;




renderer.domElement.addEventListener("click", leftClick, true);
renderer.domElement.addEventListener("contextmenu", rightClick, true);

document.onkeydown = function(ev) {
    console.log(ev);
    if(ev.key === "1"){
        bb.fastGet('actions','changeBackground')('#ffffff');
    }
};


function animate() {
    requestAnimationFrame( animate );
    
    objects.map(item => item.animate());

    renderer.render( scene, camera );
}
animate();