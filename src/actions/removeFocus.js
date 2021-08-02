import bb from '../utils/blackboard.js'

bb.fastInstall('actions','Remove Object Focus', ()=>{
    bb.fastSet('state', 'focusedObject', undefined);
});