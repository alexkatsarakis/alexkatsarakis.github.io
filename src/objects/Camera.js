import Object from './Object.js'

import bb from '../utils/blackboard.js'

class Camera extends Object {
    camera
    constructor(){
        super("camera");
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.5, 1000 );
        this.camera.position.z = 10;

        this.isMovable = false;
    }

    setColor(col){
        alert("Can't change color of camera");
    }

    getCamera(){
        return this.camera;
    }

}

const cameraObj = new Camera();

bb.fastSet('liveObjects','camera',cameraObj);
bb.fastSet('objects','camera',Camera);