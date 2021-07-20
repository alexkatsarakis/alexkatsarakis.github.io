'use strict';

import './utils/initializationManager.js'

import Engine from './Engine.js'

Engine.SaveManager.setEngine(()=>{
    Engine.start();
});