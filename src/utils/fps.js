import bb from './blackboard.js'

function Timer(){
  let d = new Date();
  let lastTime = d.getTime();
  let sinceLastCount = 0;
  return function countFPS(){
      let currTime = new Date().getTime();
      if(currTime > lastTime + 1000){
          lastTime = currTime;
          bb.fastSet('state','FPS',sinceLastCount);
          sinceLastCount = 0;
      }else {
          sinceLastCount++;
      }
      bb.fastSet('state','gameTime',currTime);
  }

}
let FPS = Timer();

export default FPS;