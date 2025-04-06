import bb from "../utils/blackboard.js";

import Engine from "../Engine.js";

// function dummyAction(){
//     Engine.ClockManager.callIn((a)=>console.log(a),'test',5000);
// }

// if(Engine.hasManager('CalculatorManager')){

//     function dummyAction(){
//         let p = Engine.ObjectManager.getObjectByName('player');
//         let v = Engine.ObjectManager.getObjectByName('vid');

//         Engine.CalculatorManager.distanceObject(p,v);
//         Engine.ClockManager.callIn(dummyAction,[],200);
//     }

//     Engine.ClockManager.callIn(dummyAction,[],200);

//     bb.fastInstall('actions','dummyAction',dummyAction)
// }

if (Engine.hasManager("QuantizerManager")) {
  function dummyAction() {
    let stage = Engine.ObjectManager.getObjectByName("Stage");
    let player = Engine.ObjectManager.getObjectByName("player");
    Engine.QuantizerManager.moveTo(
      stage,
      player.getValue("x") - 300,
      player.getValue("y"),
      300
    );

    let p = Engine.ObjectManager.getObjectByName("coin");
    if (!p) return;
    Engine.ClipboardManager.copy(p);

    // Engine.QuantizerManager.move(p, 100, -450, 10000);
    for (let i = 0; i < 10; i++) {
      let newObj = Engine.ClipboardManager.paste();
      newObj.setOption("isVisible", true);
      let randX = Math.floor(Math.random() * 1000) - 500;
      let randY = Math.floor(Math.random() * 1000) - 500;
      let randDel = Math.floor(Math.random() * 1000) + 500;
      Engine.QuantizerManager.move(newObj, randX, randY, randDel);
      Engine.ClockManager.callIn(
        () => {
          newObj.remove();
        },
        {},
        randDel + 200
      );
    }
    Engine.ClockManager.callIn(dummyAction, [], 100);
  }

  bb.fastInstall("actions", "dummyAction", dummyAction);
}

// function dummyAction(){
//     const coin = Engine.ObjectManager.getObjectByName('coin(75245)');
//     Engine.ObjectManager.rename(coin,'hahaha');
// }

// bb.fastInstall('actions','dummyAction',dummyAction);
