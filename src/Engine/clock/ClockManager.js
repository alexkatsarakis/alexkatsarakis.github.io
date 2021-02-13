import bb from '../../utils/blackboard.js'

export default class ClockManager {
    lastTime
    sinceLastCount

    constructor() {
        let d = new Date();
        this.lastTime = d.getTime();
        this.sinceLastCount = 0;
    }

    update() {
        let currTime = new Date().getTime();
        if(currTime > this.lastTime + 1000){
            this.lastTime = currTime;
            bb.fastSet('state','FPS',this.sinceLastCount);
            this.sinceLastCount = 0;
        }else {
            this.sinceLastCount++;
        }
        bb.fastSet('state','gameTime',currTime);
    }

}