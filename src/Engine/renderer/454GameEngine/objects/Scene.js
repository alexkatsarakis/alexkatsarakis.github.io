class Scene {

    _items = [];
    _canvas;
    _canvasCTX;
    _offScreenCanvas;
    _offScreenCanvasCTX;

    constructor(){
        this._canvas = document.createElement('canvas');
        this._canvas.id = '454Scene';
        this._canvas.style.position = 'absolute';
        this._canvas.style.width  = window.innerWidth+'px';
        this._canvas.style.height = window.innerHeight+'px';
        this._canvasCTX = this._canvas.getContext("2d");
        this._canvasCTX.canvas.width  = window.innerWidth;
        this._canvasCTX.canvas.height = window.innerHeight;
        document.body.appendChild(this._canvas);

    }

    sortObjects(){
        this._items.sort((obj1,obj2)=>{
            let index1 = obj1.getValue('zIndex');
            let index2 = obj2.getValue('zIndex');
            if(!index1)index1 = 0;
            if(!index2)index2 = 0;
            return index1 - index2;
        });
    }

    addItem(id){
        this._items.push(id);
        this.sortObjects(); //TODO: Instead of sort each time change the way
                            // I store objects -> based on zIndex
    }
    

    removeItem(id){
        const i = this._items.indexOf(id);
        this._items.splice(i,1);
    }

    renderObjects(){
        this._canvasCTX.clearRect(0,0,this._canvas.width,this._canvas.height);
        
        this._items.forEach((obj)=>obj.render(this._canvasCTX));
    }

}

const scene = new Scene();

export default scene;