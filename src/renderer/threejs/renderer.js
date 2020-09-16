import bb from '../../utils/blackboard.js'

import './mouseEvents.js'

import scene from './objects/Scene.js'
import camera from './objects/Camera.js'
import './objects/Sphere.js'
import './objects/Box.js'
import './objects/Plane.js'
import './objects/Line.js'


let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );

if(!bb.fastGet('renderer','render')){
    bb.fastSet('renderer','render',[()=>renderer.render(scene.getScene(),camera.getCamera())]);
} else {
    bb.fastGet('renderer','render').push(()=>renderer.render(scene.getScene(),camera.getCamera()));
}

if(!bb.fastGet('renderer','moveFWD')){
    bb.fastSet('renderer','moveFWD',[()=>bb.fastGet('liveObjects',bb.fastGet('state','player')).move(0,0,0.2)]);
} else {
    bb.fastSet('renderer','moveFWD').push([()=>bb.fastGet('liveObjects',bb.fastGet('state','player')).move(0,0,0.2)]);
}

if(!bb.fastGet('renderer','moveBWD')){
    bb.fastSet('renderer','moveBWD',[()=>bb.fastGet('liveObjects',bb.fastGet('state','player')).move(0,0,-0.2)]);
} else {
    bb.fastSet('renderer','moveBWD').push([()=>bb.fastGet('liveObjects',bb.fastGet('state','player')).move(0,0,-0.2)]);
}

if(!bb.fastGet('renderer','moveLeft')){
    bb.fastSet('renderer','moveLeft',[()=>bb.fastGet('liveObjects',bb.fastGet('state','player')).move(0.2,0,0)]);
} else {
    bb.fastSet('renderer','moveLeft').push([()=>bb.fastGet('liveObjects',bb.fastGet('state','player')).move(0.2,0,0)]);
}

if(!bb.fastGet('renderer','moveRight')){
    bb.fastSet('renderer','moveRight',[()=>bb.fastGet('liveObjects',bb.fastGet('state','player')).move(-0.2,0,0)]);
} else {
    bb.fastSet('renderer','moveRight').push([()=>bb.fastGet('liveObjects',bb.fastGet('state','player')).move(-0.2,0,0)]);
}