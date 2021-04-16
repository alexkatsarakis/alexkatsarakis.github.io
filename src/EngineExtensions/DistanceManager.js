import Manager from '../Engine/Manager.js'

export default class DistanceManager extends Manager{

    constructor() {
        super();
    }

    getObjectCenter(obj){
        let pos = obj.getPositional();
        return {
            x: pos.x + (pos.width/2),
            y: pos.y + (pos.height/2)
        }
    }

    distanceTwoPoints(p1, p2){
        let a = (p1.x - p2.x);
        let b = (p1.y - p2.y);
        console.log(Math.sqrt(a*a+b*b));
        return Math.sqrt(a*a+b*b);
    }

    distanceObject(obj1, obj2){
        let center1 = this.getObjectCenter(obj1);
        let center2 = this.getObjectCenter(obj2);
        
        console.log(this.distanceTwoPoints(center1,center2));
        return this.distanceTwoPoints(center1, center2);
    }
}