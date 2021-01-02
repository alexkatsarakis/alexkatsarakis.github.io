import bb from '../utils/blackboard.js'

import Object from '../objects/Object.js'

class CollisionsObject extends Object {

    renderer = 'None';
    name = 'Collisions';

    constructor(){
        super('Collisions','KciKIiWkUB9QL6q');

        delete this.options['isMovable'];
        delete this.options['isRemovable'];
        delete this.options['isVisible'];
        delete this.options['isSolid'];
        delete this.options['isCollidable'];

        delete this.events['onCollision'];
        delete this.events['onRemove'];
        delete this.events['onMove'];
        delete this.events['onGameStart'];
        delete this.events['onEachFrame'];

        delete this.events['onClick'];
        delete this.events['onRightClick'];

    }

    move(x,y){
        if(!this.options['isMovable'])return;

    }    
    
    getEvent(ev){
        let split = ev.split('_');
        return bb.fastGet('collisions', 'getCollision')(split[0],split[1]);
    }

    setEvent(ev,code){
        localStorage.setItem(this.id+"_"+ev,code);
        let split = ev.split('_');
        bb.fastGet('collisions', 'setCollision')(split[0],split[1],code);
    }
    
    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    remove(){
        this.clear();
        bb.fastRemove('liveObjects',this.id);
    }

    getCategory(){
        return 'Collisions';
    }

}

const collisionsObject = new CollisionsObject();

bb.fastSet('liveObjects',collisionsObject.id,collisionsObject);

export default collisionsObject;