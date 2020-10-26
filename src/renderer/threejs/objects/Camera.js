import Object from './ObjectThreeJS.js'

import bb from '../../../utils/blackboard.js'

class Camera extends Object {
    camera
    vect
    constructor(){
        super("camera");
        let width = window.innerWidth/50;
        let height = window.innerHeight/50;
        this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

        this.options['isMovable'] = false;

        delete this.values['x'];
        delete this.values['y'];
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

    }

    setColor(col){
        alert("Can't change color of camera");
    }

    getCamera(){
        return this.camera;
    }

    newFrame(){
        let obj = bb.fastGet('state','player').getObject();
        this.camera.position.x = obj.position.x;
        this.camera.position.y = obj.position.y;
        this.camera.position.z = obj.position.z-5;
        this.camera.lookAt(obj.position);
    }


    getCategory(){
        return "Camera";
    }

}

const cameraObj = new Camera();

export default cameraObj;

bb.fastSet('liveObjects','camera',cameraObj);