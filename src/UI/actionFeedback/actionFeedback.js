import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'

export default {
    name:'actionFeedback',
    link: './src/UI/actionFeedback/actionFeedback.ahtml',
    cb: onShowFeedbackLoaded,
    removable: true, 
    loadOnInstall: true
};

let callback;
let block;
let text;

function showFeedback(feedbackInfo){
    if(callback)Engine.ClockManager.cancelCallBack(callback);

    if(bb.fastGet('settings', 'Show Action Feedback')){
        text.innerHTML = feedbackInfo;
        block.style.visibility = 'visible';
        block.style.opacity = '1';

        callback = Engine.ClockManager.callIn(()=>{
            callback = undefined;
            block.style.opacity = '0';
        },undefined,1000);
    }

    bb.installWatch('events', 'showFeedback', (feedbackInfo) => showFeedback(feedbackInfo));
}


function onShowFeedbackLoaded(){
    block = document.getElementById('actionFeedback-wrap');
    text = document.getElementById('actionFeedback-text');
    bb.fastSet('settings', 'Show Action Feedback', true);
    bb.installWatch('events', 'showFeedback', (feedbackInfo) => showFeedback(feedbackInfo));
}