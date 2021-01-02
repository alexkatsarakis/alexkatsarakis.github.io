import Object from './ObjectDom.js'

import bb from '../../../utils/blackboard.js'

class Scene extends Object {
    constructor(){
        super("scene");
        this.div = document.createElement("div");

        this.div.style.position = "absolute";
        this.div.id = 'scene';
        this.div.style.width = 1920 + 'px';
        this.div.style.height = 1080 + 'px';

        document.body.appendChild(this.div);


        this.options['isMovable'] = false;

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

    getCategory(){
        return "Scene";
    }

}

const sceneObj = new Scene();

export default sceneObj;