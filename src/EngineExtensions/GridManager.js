import Engine from '../Engine.js'

import bb from '../utils/blackboard.js'

export default class GridManager {
    _gridRectangles;

    constructor(){
        this._gridRectangles = [];
    }

    onLoad(){
        bb.installWatch('events', 'last', (e)=>this.onEvent(e));
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

    objectsOnPlatform(platFormObj){
        const objManager = Engine.ObjectManager;
        let objs = objManager.objects;

        
        let isAttached = [];
        
        for(let i in objs){
            let obj = objs[i];
            if(objManager.isSystemObject(obj.id) || obj === platFormObj)
            continue;
            
            const pos1 = platFormObj.getPositional();
            const pos2 = obj.getPositional();
            if(pos1.x >= pos2.x + pos2.width || pos2.x >= pos1.x + pos1.width){
                continue;
            }
        
            if(pos1.y > pos2.y + pos2.height || pos2.y > pos1.y + (pos1.height/4)){
                continue;
            }
        
            isAttached.push(obj);
        }

        return isAttached;
    }

    /*
    *   e: {
    *       type: string,
    *       objectID: string
    *       information: {
    *           type: string,
    *           value: all
    *       }   
    *   }
    */
    onEvent(e){
       if(!Engine.ObjectManager.isSystemObject(e.objectID)){
           if(e.type === 'setValue'){
                let obj = Engine.ObjectManager.getObject(e.objectID);
                if(obj && obj.getOption('isPlatform')){
                    if(e.information.type === 'x'){
                        let diff = e.information.value - obj.getValue('x');
                        this.objectsOnPlatform(obj).forEach((objOnP)=>{
                            objOnP.move(diff,0);
                        })
                    } else if(e.information.type === 'y'){
                        let diff = e.information.value - obj.getValue('y');
                        this.objectsOnPlatform(obj).forEach((objOnP)=>{
                            objOnP.move(0,diff);
                        })
                    }
                }

            }
        }

        bb.installWatch('events','last',(e)=>{this.onEvent(e);});

    }
}