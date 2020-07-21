export function movingAnimator(point,x,y,div,interv,reps = 0,cb){
    let isStopped = false;
    let isFinished = false;
    let lastTime;
    function animate(timestamp){
        window.requestAnimationFrame(()=>{
            if(lastTime === undefined)lastTime = timestamp;
            if(!isStopped && timestamp - lastTime > interv){
                lastTime += interv;
                point.moveX(x);
                point.moveY(y);
                if(!div)return;
                div.style.left = point.getX() +"px";
                div.style.top = point.getY() +"px";
                if(reps == 1){
                    isFinished = true;
                    stopAnimation();
                    if(cb)cb();
                }
                reps--;
            }
        });
    }

    function stopAnimation(){
        isStopped = true;
    }

    function hasFinished(){
        return isFinished;
    }

    return {
        animate,
        stopAnimation,
        hasFinished
    }

} 

export function tickAnimator(time = 0,cb){
    let lastTime;
    let isStopped = false;
    let isFinished = false;
    function animate(timestamp){
        window.requestAnimationFrame(()=>{
            if(lastTime === undefined)lastTime = timestamp;
            if(timestamp - lastTime > time){
                isFinished = true;
                if(cb)cb();
            }
        });
    }

    function stopAnimation(){
        isStopped = true;
    }

    function hasFinished(){
        return isFinished;
    }

    return {
        animate,
        stopAnimation,
        hasFinished
    }

} 

