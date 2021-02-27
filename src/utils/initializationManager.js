'use strict';

import bb from './blackboard.js'

bb.fastSet('state','mode','editing');
bb.fastSet('state','focusedObject',undefined);


bb.fastSet('settings','noDrag', false);
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
import('../UI/UI.js');
// </Extra>