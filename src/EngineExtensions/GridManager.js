import Engine from '../Engine.js'

export default class GridManager {
    _gridRectangles;

    constructor(){
        this._gridRectangles = [];
        // this.calculateGrid();
    }

    calculateGrid(){
        let objs = Engine.ObjectManager.objects;

        this._gridRectangles = [];
        for(let i in objs){
            let obj = objs[i];
            if(obj.getOption('isSolid') === true){ // === true on purpose to prevent auto conversions
                this._gridRectangles.push(obj.getPositional());
            }
        }
    }

    getGrid(){
        return [...this._gridRectangles];
    }
}