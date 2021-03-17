export default class CalculatorManager {

    constructor() {
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
        // let pos1 = obj1.getPositional();
        // let pos2 = obj2.getPositional();

        // let center1 = {
        //     x: pos1.x + (pos1.width/2),
        //     y: pos1.y + (pos1.height/2)
        // }
        // let center2 = {
        //     x: pos2.x + (pos2.width/2),
        //     y: pos2.y + (pos2.height/2)
        // }

        let center1 = this.getObjectCenter(obj1);
        let center2 = this.getObjectCenter(obj2);
        
        console.log(this.distanceTwoPoints(center1,center2));
        return this.distanceTwoPoints(center1, center2);
    }
}