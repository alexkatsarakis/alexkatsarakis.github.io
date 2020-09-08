'use strict';

import bb from '../utils/blackboard.js'

bb.fastSet('state','focusedObject',undefined);

import '../UI/hud.js'
import '../UI/blocksInstallation.js'

import '../objects/Scene.js'
import '../objects/Camera.js'
import '../objects/Sphere.js'
import '../objects/Box.js'
import '../objects/Plane.js'
import '../objects/Line.js'

import '../actions/changeColor.js'
import '../actions/moveObject.js'
import '../actions/removeObject.js'
import '../actions/createObject.js'