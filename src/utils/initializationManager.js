'use strict';

import bb from './blackboard.js'

bb.fastSet('state','focusedObject',undefined);

import '../UI/UI.js'

import '../scripting/blockly/blockly.js'

import '../renderer/renderer.js'

import '../actions/actions.js'


import requirements from '../../assets/json/strictRequirementsAfterLoad.js' // json

for(let i in requirements){
    if(!bb.getComponent(i))throw Error("Missing Component "+i);
    requirements[i].forEach(element => {
        if(!bb.fastGet(i,element))throw Error("Missing Component Element " + i + "->" + element);
    });
}