'use strict';

import bb from './blackboard.js'

bb.fastSet('state','mode','editing');
bb.fastSet('state','focusedObject',undefined);

import '../animations/animations.js'

import '../UI/UI.js'

import '../physics/physics.js'

import '../scripting/scripting.js'

import '../renderer/renderer.js'

import '../collisions/collisions.js'

import '../actions/actions.js'

import '../sound/sound.js'


import requirements from '../../assets/json/strictRequirementsAfterLoad.js' // json

for(let i in requirements){
    if(!bb.getComponent(i))throw Error("Missing Component "+i);
    requirements[i].forEach(element => {
        if(!bb.fastGet(i,element))throw Error("Missing Component Element " + i + "->" + element);
    });
}