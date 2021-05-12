import Engine from '../Engine.js'

import bb from '../utils/blackboard.js'

import Manager from '../Engine/Manager.js'

export default class GridManager extends Manager{
    _gridRectangles;

    constructor(){
        super();
        this._gridRectangles = [];
    }

    onLoad(){
        this.calculateGrid();
        
        bb.installWatch('events','setValue_x',(e)=>{this.onEvent(e);});
        bb.installWatch('events','setValue_y',(e)=>{this.onEvent(e);});
        bb.installWatch('events','removeObject',()=>{this.onObjectDeletion();});
    }

    calculateGrid(){
        const objs = Engine.ObjectManager.objects;

        this._gridRectangles = [];
        for(let i in objs){
            const obj = objs[i];
            if(obj.getOption('isSolid') === true 
            && obj.getOption('moveWithScroll') === true){ // === true on purpose to prevent auto conversions
                this._gridRectangles.push(obj.getPositional());
            }
        }
    }

    getGrid(){
        return [...this._gridRectangles];
    }

    objectsOnPlatform(platFormObj){
        const objManager = Engine.ObjectManager;
        const objs = objManager.objects;

        
        let isAttached = [];
        
        for(let i in objs){
            const obj = objs[i];
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

    sameArea(rect1,rect2){
        return(rect1.x === rect2.x
            && rect1.y === rect2.y
            && rect1.width === rect2.width
            && rect1.height === rect2.height);
    }

    isPointInGrid(x,y){
        for(let i in this._gridRectangles){
            const rect = this._gridRectangles[i];
            if(rect.x < x 
            && rect.x + rect.width > x
            && rect.y < y
            && rect.y + rect.height > y)
                return rect;
        }
        return false;
    }

    canMove(objID,action){
        const obj = Engine.ObjectManager.objects[objID];
        if(!obj)return;

        if(obj.getOption('moveThroughGrid') === true)return; // === true on purpose
        const boundingBox = obj.getPositional();

        let collisionRect;
        if(action.type === 'x'){
            if(action.oldVal > action.value){
                const h = boundingBox.y + boundingBox.height;
                for(let i = boundingBox.y + 1; i < h - 1; ++i){
                    if((collisionRect = this.isPointInGrid(boundingBox.x + 1,i))){
                        if(this.sameArea(collisionRect,boundingBox))continue;
                        // _________ _________
                        // |        ||        |
                        // | colRec || player |
                        // |________||________|
                        obj.setValue('x',(collisionRect.x + collisionRect.width) - 1);
                        return;
                    }
                }
            }else{
                const h = boundingBox.y + boundingBox.height;
                const w = boundingBox.x + boundingBox.width;
                for(let i = boundingBox.y + 1; i < h - 1; ++i){
                    if((collisionRect = this.isPointInGrid(w - 1, i))){
                        if(this.sameArea(collisionRect,boundingBox))continue;
                        // ____y_____ _________
                        // |        ||        |
                        // x player w| colRec |
                        // |___h____||________|
                        obj.setValue('x',(collisionRect.x - boundingBox.width) + 1);
                        return;
                    }
                }
            }
        }else if(action.type === 'y'){
            if(action.oldVal > action.value){
                const w = boundingBox.x + boundingBox.width;
                for(let i = boundingBox.x + 1; i < w; ++i){
                    if((collisionRect = this.isPointInGrid(i,boundingBox.y))){
                        if(this.sameArea(collisionRect,boundingBox))continue;
                        // _________
                        // |        |
                        // | colRec |
                        // |________|
                        // _________ 
                        // |        |
                        // | player |
                        // |________|
                        obj.setValue('y',(collisionRect.y + collisionRect.height) - 1);
                        return;
                    }
                }
            }else{
                const h = boundingBox.y + boundingBox.height;
                const w = boundingBox.x + boundingBox.width;
                for(let i = boundingBox.x + 1; i < w; ++i){
                    if((collisionRect = this.isPointInGrid(i,h))){
                        if(this.sameArea(collisionRect,boundingBox))continue;
                        // _________
                        // |        |
                        // | player |
                        // |________|
                        // _________ 
                        // |        |
                        // | colRec |
                        // |________|
                        obj.setValue('y',(collisionRect.y - boundingBox.height) + 1);
                        return;
                    }
                }
            }
        }
    }

    onObjectDeletion(){
        this.calculateGrid();
        bb.installWatch('events','removeObject',()=>{this.onObjectDeletion();});
    }

    /*
    *   e: {
    *       type: string,
    *       objectID: string
    *       data: {
    *           oldVal: all
    *           type: string,
    *           value: all
    *       }   
    *   }
    */
    onEvent(e){
        if(!Engine.ObjectManager.isSystemObject(e.objectID)){
            const obj = Engine.ObjectManager.getObject(e.objectID);
            if(obj && obj.getOption('isPlatform')){
                const diff = e.data.value - e.data.oldVal;
                if(e.data.type === 'x'){
                    this.objectsOnPlatform(obj).forEach((objOnP)=>{
                        objOnP.move(diff,0);
                    })
                } else if(e.data.type === 'y'){
                    this.objectsOnPlatform(obj).forEach((objOnP)=>{
                        objOnP.move(0,diff);
                    })
                }
            }
            if(obj && obj.getOption('isSolid')){
                this.calculateGrid();
            }
            this.canMove(e.objectID,e.data);
        }

        if(e.data.type === 'x'){
            bb.installWatch('events','setValue_x',(e)=>{this.onEvent(e);});
        }else{
            bb.installWatch('events','setValue_y',(e)=>{this.onEvent(e);});
        }

    }
}