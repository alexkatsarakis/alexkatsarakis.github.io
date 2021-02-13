class Scene {
    _items;

    constructor(){
        this.div = document.createElement("div");

        this._items = {};

        this.div.style.position = "absolute";
        this.div.id = 'scene';
        this.div.style.width = 1920 + 'px';
        this.div.style.height = 1080 + 'px';

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