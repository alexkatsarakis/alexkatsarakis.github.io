import Object from './ObjectDom.js'

class Scene extends Object {
    constructor(){
        super("scene");
        this.div = document.createElement("div");

        this.div.style.position = "absolute";
        this.div.id = 'scene';
        this.div.style.width = 1920 + 'px';
        this.div.style.height = 1080 + 'px';

        document.body.appendChild(this.div);

        this.data.optionHandler.removeOption('isMovable');

        this._category = 'Scene';

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