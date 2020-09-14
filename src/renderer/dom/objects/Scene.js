import Object from './ObjectDom.js'

import bb from '../../../utils/blackboard.js'

class Scene extends Object {
    constructor(){
        super("scene");
        this.div = document.createElement("div");

        // this.div.style.backgroundImage = "url('./assets/textures/sky.jpeg')";
        // this.div.style.backgroundSize = 'cover';
        // this.div.style.backgroundPosition = 'center';
        this.div.style.position = "absolute";
        this.div.id = 'scene';
        this.div.style.width = window.innerWidth + 'px';
        this.div.style.height = window.innerHeight + 'px';

        document.body.appendChild(this.div);


        this.isMovable = false;

    }

    getScene(){
        return this.div;
    }
    
    addItem(it){
        this.div.appendChild(it);
    }

    remove(it){
        this.div.removeChild(it);
    }

}

const sceneObj = new Scene();

export default sceneObj;

// bb.fastSet('liveObjects','scene',sceneObj);
// bb.fastSet('objects','scene',Scene);