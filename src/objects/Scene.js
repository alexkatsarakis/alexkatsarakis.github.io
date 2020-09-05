import Object from './Object.js'

import bb from '../utils/blackboard.js'

class Scene extends Object {
    scene
    constructor(){
        super("scene");
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.TextureLoader().load( './assets/textures/sky.jpeg' );;

        this.isMovable = false;

    }

    setColor(col){
        this.scene.background = new THREE.Color( col );
    }

    getScene(){
        return this.scene;
    }

}

const sceneObj = new Scene();

bb.fastSet('liveObjects','scene',sceneObj);
bb.fastSet('objects','scene',Scene);