import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

import Engine from '../Engine.js'


function dummyAction(){
    Engine.ClockManager.callIn((a)=>console.log(a),'test',5000);
}

bb.fastInstall('actions','dummyAction',dummyAction)