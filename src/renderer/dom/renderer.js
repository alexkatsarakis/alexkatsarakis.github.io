import bb from '../../utils/blackboard.js'

import './mouseEvents.js'

import './objects/Scene.js'
import './objects/Circle.js'
import './objects/Square.js'
import './objects/Text.js'
import './objects/Humanoid.js'

if(!bb.fastGet('renderer','render')){
    bb.fastSet('renderer','render',[()=>{}]);
} else {
    bb.fastGet('renderer','render').push(()=>{});
}
