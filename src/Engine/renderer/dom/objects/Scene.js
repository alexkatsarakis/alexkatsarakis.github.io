class Scene {
    _items;
    _aspectRatio;

    constructor(){
        this.div = document.createElement("div");

        this._items = {};

        this.div.style.position = "absolute";
        this.div.id = 'scene';     
        this.div.style.width  = window.innerWidth+'px';
        this.div.style.height = window.innerHeight+'px';

        this._aspectRatio = 1920/window.innerWidth;


        document.body.appendChild(this.div);

        this._category = 'Scene';

    }

    getScene(){
        return this.div;
    }
    
    addItem(it){
        this.div.appendChild(it.div);
        this._items[it.id] = it;
    }

    remove(it){
        this.div.removeChild(it.div);
        delete this._items[it.id];
    }

    renderObjects(){
        for(let i in this._items){
            this._items[i].render();
        }
    }

}

const sceneObj = new Scene();

export default sceneObj;