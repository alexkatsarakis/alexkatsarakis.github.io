import Manager from '../Engine/Manager.js'

import bb from '../utils/blackboard.js'

export default class DummyManager extends Manager{

    _dispatchTable = {
        'removeObject': ((e)=>{console.log(e)}),
        'addObject': ((e)=>{console.log(e)}),
        'setCurrentState': ((e)=>{console.log(e)}),
        'setOption': ((e)=>{console.log(e)}),
    }

    constructor() {
        super();
    }

    onLoad(){
        // bb.installWatch('events','last',(e)=>this.onEvent(e));
    }

    onEvent(e){
        if(e.type in this._dispatchTable)this._dispatchTable[e.type](e);
        bb.installWatch('events','last',(e)=>this.onEvent(e));
    }

    /*
    I want to make a manager that captures almost all events so I can later send them through
    network to make collaborative and online peer to peer gameplay possible
    */

}