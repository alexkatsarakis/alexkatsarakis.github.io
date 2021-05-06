'use strict';

import bb from './blackboard.js'

bb.fastSet('state','mode','editing');
bb.fastSet('state','focusedObject',undefined);


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
urlParams.forEach((val,key)=>{
    bb.fastSet('urlParams', key, val);
});

bb.fastSet('settings','Dragging Objects', !urlParams.get('play'));
bb.fastSet('settings','highlightInvisibleObjects',false);
bb.fastSet('settings','Clicking Through Objects',false);
bb.fastSet('settings','moveUIWithControl',true);
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
import '../UI/UI.js';
// </Extra>