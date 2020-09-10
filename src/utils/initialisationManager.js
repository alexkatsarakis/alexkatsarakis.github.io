'use strict';

import bb from '../utils/blackboard.js'

bb.fastSet('state','focusedObject',undefined);

import '../UI/hud.js'
import '../UI/blocksInstallation.js'

import '../renderer/dom/renderer.js'
import '../renderer/threejs/renderer.js'

import '../actions/changeColor.js'
import '../actions/moveObject.js'
import '../actions/removeObject.js'
import '../actions/createObject.js'
import '../actions/changeValue.js'


import requirements from '../../assets/json/strictRequirementsAfterLoad.js' // json

for(let i in requirements){
    if(!bb.getComponent(i))console.error("Missing Component "+i);
    requirements[i].forEach(element => {
        if(!bb.fastGet(i,element))console.error("Missing Component Element " + i + "->" + element);
    });
}