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