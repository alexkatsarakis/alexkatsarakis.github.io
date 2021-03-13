'use strict';

import bb from './blackboard.js'

bb.fastSet('state','mode','editing');
bb.fastSet('state','focusedObject',undefined);


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
urlParams.forEach((val,key)=>{
    console.log(key,val);
    bb.fastSet('urlParams', key, val);
});

bb.fastSet('settings','Dragging Objects', true);
bb.fastSet('settings','highlightInvisibleObjects',false);

// <Engine>
import '../Engine.js'
    // <EngineExtra>
    import '../EngineExtensions/EngineExtensions.js'
    // </EngineExtra>
// </Engine>

// <Required>
import '../actions/actions.js'
// </Required>

// <Extra>
if(!bb.fastGet('urlParams','play'))
    import('../UI/UI.js');
// </Extra>