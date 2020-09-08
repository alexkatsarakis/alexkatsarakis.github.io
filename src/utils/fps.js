function Timer(){
  let d = new Date();
  let lastTime = d.getTime();
  let sinceLastCount = 0;
  return function countFPS(){
      let currTime = new Date().getTime();
      if(currTime > lastTime + 1000){
          lastTime = currTime;
          // console.log("FPS: "+sinceLastCount);
          document.getElementById('fpsCounter').innerHTML = "FPS:"+sinceLastCount;
          sinceLastCount = 0;
      }else {
          sinceLastCount++;
      }
  }

}
let FPS = Timer();

export default FPS;