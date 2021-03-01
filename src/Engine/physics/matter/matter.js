import bb from '../../../utils/blackboard.js'

function trimPX(str){
    return Number.parseFloat(str.slice(0, -2));
}

export default class MatterJS {
    _pe

    objMap = {};

    constructor(){
        this._pe = Matter.Engine.create();
    }

    addToWorld(item){
        if(this.objMap[item.getName()])throw Error("This item already exist in matter world");
        let pos = item.getPositional();
        this.objMap[item.getName()] = {realObject: item};
        let objMapItem = this.objMap[item.getName()];
        for(let i in pos){
            if(typeof pos[i] === "string")
                objMapItem[i] = trimPX(pos[i]);
            else if(typeof pos[i] === "number")
                objMapItem[i] = pos[i];
        }
        let options = {
            isStatic: item.getOption('isSolid'),
            // density: 0.01,
            restitution: 1,
            // friction: 0.3
        };
        if(objMapItem['rotation'])options['angle'] = objMapItem['rotation'];
        if(pos.r !== undefined){
            let x = objMapItem.x + objMapItem.r/2;
            let y = objMapItem.y + objMapItem.r/2;
            objMapItem["phObject"] = Matter.Bodies.circle(x, y, objMapItem.r, options);
        }else{
            let x = objMapItem.x+ objMapItem.width/2;
            let y = objMapItem.y+ objMapItem.height/2;
            objMapItem["phObject"] = Matter.Bodies.rectangle(x, y, objMapItem.width, objMapItem.height, options);
        }
        objMapItem["phObject"].name = item.name;
        objMapItem["phObject"].id = item.id;
        Matter.World.add(this._pe.world, objMapItem["phObject"]);
    }

    removeFromWorld(name){
        if(!this.objMap[name])throw Error("This item doesn't exist in matter world");
        Matter.World.remove(this._pe.world, this.objMap[name]["phObject"]);
        delete this.objMap[name];
    }

    applyForce(object,position,force){
        let body = this.objMap[object.getName()].phObject;
        let pos = Matter.Vector.create(position[0],position[1]);
        let f = Matter.Vector.create(force[0],force[1]);
        Matter.Body.applyForce(body, pos, f);
    }

    moveObject(object,move){
        let body = this.objMap[object.getName()].phObject;
        // body.position({x: -(position[0] - move[0]), y: - (position[1] - move[1])});
        console.log(body)
        Matter.Body.applyForce(body, body.position, {x: move[0], y: move[1]});
    }

    update(){
        Matter.Engine.update(this._pe);
        this._pe.world.bodies.forEach((body)=>{
            let realObj = bb.fastGet('Engine','ObjectManager').getObject(body.id);
            if(!realObj){
                this.removeFromWorld(body.name);
                return;
            }
            let proxy = this.objMap[body.name];
            let phObj = proxy.phObject;
            if(body.label === "Rectangle Body"){
                // realObj.setValue('x',body.position.x - proxy.width/2);
                // realObj.setValue('y',body.position.y - proxy.height/2);
                // realObj.setValue('rotation',body.angle);
                realObj.setValue('x',(phObj.position.x - phObj.positionPrev.x) + realObj.getValue('x'))
                realObj.setValue('y',(phObj.position.y - phObj.positionPrev.y) + realObj.getValue('y'))
                realObj.setValue('rotation',body.angle);
            }else {
                realObj.setValue('x',body.position.x - proxy.r);
                realObj.setValue('y',body.position.y - proxy.r);
            }
        });
    }
}