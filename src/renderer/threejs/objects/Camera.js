import Object from './ObjectThreeJS.js'

class Camera extends Object {
    camera
    constructor(){
        super("camera");
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.5, 1000 );
        this.camera.position.z = 10;
        // var w = window.innerWidth;
        // var h =  window.innerHeight;
        // var fullWidth = w * 3;
        // var fullHeight = h;
        // this.camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
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

export default cameraObj;