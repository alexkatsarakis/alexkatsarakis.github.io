import bb from '../../utils/blackboard.js'

import './mouseEvents.js'

import './objects/Scene.js'
import './objects/Sphere.js'
import './objects/Box.js'
import './objects/Text.js'

if(!bb.fastGet('renderer','render')){
    bb.fastSet('renderer','render',[()=>{}]);
} else {
    bb.fastGet('renderer','render').push(()=>{});
}
