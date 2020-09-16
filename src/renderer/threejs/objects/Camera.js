import Object from './ObjectThreeJS.js'

import bb from '../../../utils/blackboard.js'

class Camera extends Object {
    camera
    vect
    constructor(){
        super("camera");
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.5, 1000 );

        this.options['isMovable'] = false;
        
        this.vect = new THREE.Vector3;
    }

    setColor(col){
        alert("Can't change color of camera");
    }

    getCamera(){
        return this.camera;
    }

    newFrame(){
        let obj = bb.fastGet('liveObjects',bb.fastGet('state','player'));
        this.vect.setFromMatrixPosition(obj.getGoal().matrixWorld);
        this.camera.position.lerp(this.vect, 0.2);
        this.camera.lookAt(obj.getObject().position);
    }


    getCategory(){
        return "Camera";
    }

}

const cameraObj = new Camera();

export default cameraObj;

bb.fastSet('liveObjects','camera',cameraObj);