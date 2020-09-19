import Object from './ObjectThreeJS.js'

import bb from '../../../utils/blackboard.js'

class Camera extends Object {
    camera
    vect
    constructor(){
        super("camera");
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.5, 1000 );

        this.options['isMovable'] = false;
        
<<<<<<< HEAD
        delete this.values['x'];
        delete this.values['y'];
        delete this.values['z'];
        delete this.values['colour'];

        this.values['distance'] = {
            val: 90,
            onChange: (v)=>{
                this.camera.fov = v;
            },
            getValue: ()=>{
                return this.camera.fov;
            }
        }

=======
>>>>>>> a5ca5a27f76984fd1fd99012c95e43c993ce6611
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