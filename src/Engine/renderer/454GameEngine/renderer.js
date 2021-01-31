import bb from '../../../utils/blackboard.js'

import Rect from './objects/Rectangle.js'

import scene from './objects/Scene.js'
import './mouseEvents.js'

if(!bb.fastGet('renderer','render')){
    bb.fastSet('renderer','render',[()=>scene.renderObjects()]);
} else {
    bb.fastGet('renderer','render').push(()=>scene.renderObjects());
}


export default {
    'Rectangle' : Rect
}