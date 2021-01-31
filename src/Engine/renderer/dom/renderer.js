import bb from '../../../utils/blackboard.js'

import './mouseEvents.js'

import './objects/Scene.js'
import Circle from './objects/Circle.js'
import Square from './objects/Square.js'
import Text from './objects/Text.js'
import Humanoid from './objects/Humanoid.js'

if(!bb.fastGet('renderer','render')){
    bb.fastSet('renderer','render',[()=>{}]);
} else {
    bb.fastGet('renderer','render').push(()=>{});
}

export default {
    'Circle' : Circle,
    'Square' : Square,
    'Text'   : Text,
    'Humanoid': Humanoid
}