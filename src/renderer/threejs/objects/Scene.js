import Object from './ObjectThreeJS.js'

class Scene extends Object {
    scene
    constructor(){
        super("scene");
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.TextureLoader().load( './assets/textures/sky.jpeg' );;

        this.options['isMovable'] = false;

    }

    setColor(col){
        this.scene.background = new THREE.Color( col );
    }

    getScene(){
        return this.scene;
    }

    addItem(it){
        this.scene.add(it);
    }

    remove(it){
        this.scene.remove(it);
    }

    getCategory(){
        return "Scene";
    }

}

const sceneObj = new Scene();

export default sceneObj;