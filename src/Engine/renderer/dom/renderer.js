import bb from '../../../utils/blackboard.js'

import './mouseEvents.js'

import Scene from './objects/Scene.js'
import Circle from './objects/Circle.js'
import Square from './objects/Square.js'
import Text from './objects/Text.js'
import Humanoid from './objects/Humanoid.js'

if(!bb.fastGet('renderer','render')){
    bb.fastSet('renderer','render',[()=>{Scene.renderObjects();}]);
} else {
    bb.fastGet('renderer','render').push(()=>{Scene.renderObjects();});
}

export default {
    'Circle' : Circle,
    'Square' : Square,
    'Text'   : Text,
    'Humanoid': Humanoid
}