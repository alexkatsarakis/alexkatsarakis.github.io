import bb from '../../utils/blackboard.js'

import Object from '../objects/Object.js'

class CollisionsObject extends Object {

    renderer = 'None';
    name = 'Collisions';

    constructor(){
        super('Collisions','KciKIiWkUB9QL6q');

        this.data.optionHandler.removeOption('isMovable');
        this.data.optionHandler.removeOption('isRemovable');
        this.data.optionHandler.removeOption('isVisible');
        this.data.optionHandler.removeOption('isSolid');
        this.data.optionHandler.removeOption('isCollidable');


        this.data.eventHandler.removeEvent('onCollision');
        this.data.eventHandler.removeEvent('onRemove');
        this.data.eventHandler.removeEvent('onMove');
        this.data.eventHandler.removeEvent('onGameStart');
        this.data.eventHandler.removeEvent('onEachFrame');
        this.data.eventHandler.removeEvent('onClick');
        this.data.eventHandler.removeEvent('onRightClick');

        this._category = 'Collisions';

    }

    move(x,y){
        if(!this.options['isMovable'])return;

    }    
    
    getEvent(ev){
        let split = ev.split('_');
        return bb.fastGet('Engine','CollisionManager').getCollision(split[0],split[1]);
    }

    setEvent(ev,code){
        localStorage.setItem(this.id+"_"+ev,code);
        let split = ev.split('_');
        return bb.fastGet('Engine','CollisionManager').setCollision(split[0],split[1],code);
    }
    
    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    remove(){
        throw Error('Collision Object cannot be removed!');
    }

}

const collisionsObject = new CollisionsObject();

export default collisionsObject;