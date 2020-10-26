import Object from './ObjectPixi.js'

class Scene extends Object {
    scene
    constructor(){
        super("scene");
        this.scene = new PIXI.Application({
            width: window.innerWidth, 
            height: window.innerHeight,
            transparent: true,
            antialias: true
        });


        function setup(){
            // let sky = new PIXI.Sprite(PIXI.loader.resources["./assets/textures/sky.jpeg"].texture);
            // sky.height = window.innerHeight;
            // sky.width = window.innerWidth;
            // this.addItem(sky);
        }
        // PIXI.loader
        // .add("./assets/textures/sky.jpeg")
        // .load(setup.bind(this));
        
        document.body.appendChild(this.scene.view);
    }

    setColor(col){
        this.scene.renderer.backgroundColor = col;
    }

    getScene(){
        return this.scene;
    }

    addItem(it){
        this.scene.stage.addChild(it);
    }

    removeItem(it){
        this.scene.stage.removeChild(it)
    }
}  

let scene = new Scene();

export default scene;