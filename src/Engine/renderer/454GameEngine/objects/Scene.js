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
        this._canvas.style.width = 1920+'px';// window.innerWidth+'px';
        this._canvas.style.height = 1080+'px';// window.innerHeight+'px';
        this._canvasCTX = this._canvas.getContext("2d");
        this._canvasCTX.canvas.width = 1920;// window.innerWidth;
        this._canvasCTX.canvas.height = 1080;// window.innerHeight;
        document.body.appendChild(this._canvas);

        // This is better but it doesn't work on mozilla at the moment
        // Because OffscreenCanvas.getContext is not implemented
    //     this._offScreenCanvas = new OffscreenCanvas(1920,1080);
    //     this._offScreenCanvasCTX = this._offScreenCanvas.getContext('2d');
    //     this._offScreenCanvasCTX.canvas.width = 1920;
    //     this._offScreenCanvasCTX.canvas.height = 1080;

        this._offScreenCanvas = document.createElement('canvas');
        this._offScreenCanvas.style.width = 1920+'px';// window.innerWidth+'px';
        this._offScreenCanvas.style.height = 1080+'px';// window.innerHeight+'px';
        this._offScreenCanvasCTX = this._offScreenCanvas.getContext("2d");
        this._offScreenCanvasCTX.canvas.width = 1920;// window.innerWidth;
        this._offScreenCanvasCTX.canvas.height = 1080;// window.innerHeight;
    }

    addItem(id){
        this._items.push(id);
    }

    removeItem(id){
        let i = this._items.indexOf(id);
        this._items.splice(i,1);
    }


    renderObjects(){
        this._offScreenCanvasCTX.clearRect(0, 0, this._offScreenCanvas.width, this._offScreenCanvas.height);
        this._items.forEach((obj)=>obj.render(this._offScreenCanvasCTX));
        this._canvasCTX.clearRect(0,0,this._canvas.width,this._canvas.height);
        this._canvasCTX.drawImage(this._offScreenCanvas,0,0);
    }

}

const scene = new Scene();

export default scene;