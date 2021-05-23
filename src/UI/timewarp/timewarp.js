import Engine from '../../Engine.js'

import uiFactory from '../../utils/UIFactory.js'

export default {
    name:'timewarp',
    link: './src/UI/timewarp/timewarp.ahtml',
    cb:onTimewarpLoad,
    removable: true, 
    loadOnInstall: Engine.hasManager('TimewarpManager')
};

function getClosestFrame(array,number){
    for(let i = 1; i < array.length; ++i){
        if(number < array[i]) return i-1;
    }
    return array.length-1;
}

function getLowerNumber(array,number){
    for(let i = 1; i < array.length; ++i){
        if(number < array[i]) return array[i-1];
    }
    return array[array.length -1];
}

function changeTimewarpState(newState){
    const idleState = document.getElementById('timewarp-idle');
    const recordingState = document.getElementById('timewarp-recording');
    const activeState = document.getElementById('timewarp-active');
    if(newState === 'recording'){
        idleState.style.display = 'none';
        recordingState.style.display = 'block';
        activeState.style.display = 'none';
    }else if(newState === 'idle'){
        idleState.style.display = 'block';
        recordingState.style.display = 'none';
        activeState.style.display = 'none';
    }else if(newState === 'active'){
        idleState.style.display = 'none';
        recordingState.style.display = 'none';
        activeState.style.display = 'block';
    }else {
        throw Error('Timewarp: Tried to switch to unknown state');
    }
}

function renderPlaybackUI(){
    let recordedTimes = Engine.TimewarpManager.getRecordedTimestamps();
    if(!recordedTimes) throw Error('No recorded times on stop');

    const firstTime = Number.parseInt(recordedTimes[0]);
    recordedTimes = recordedTimes.map((time)=>time - firstTime);
    Engine.TimewarpManager.showSnapshot(firstTime+recordedTimes[recordedTimes.length-1],recordedTimes.length-1);

    const range = document.getElementById('timewarp-showRecords');
        range.min = recordedTimes[0];
        range.max = recordedTimes[recordedTimes.length - 1];
        range.value = recordedTimes[recordedTimes.length - 1];
        range.onchange = (ev) => {
            const number = Number.parseInt(ev.target.value);
            const realNumber = getLowerNumber(recordedTimes,number);
            const frameIndex = recordedTimes.indexOf(realNumber);
            if(frameIndex === -1) throw Error('Error translating range to frame');
            Engine.TimewarpManager.showSnapshot(firstTime+realNumber, frameIndex);
        }

    const showBackward = document.getElementById('timewarp-showBackward');
        showBackward.style.width = '10%';
        showBackward.onclick = ()=>{
            const number = Number.parseInt(range.value);
            const realNumber = getLowerNumber(recordedTimes,number);
            Engine.TimewarpManager.playBackward(firstTime+realNumber,factor.value/100);
        }  

    const showBackwardSingle = document.getElementById('timewarp-showBackwardSingle');
        showBackwardSingle.style.width = '10%';
        showBackwardSingle.onclick = ()=>{                    
            const number = Number.parseInt(range.value);
            const currFrame = getClosestFrame(recordedTimes,number);
            if(currFrame !== 0)
                Engine.TimewarpManager.showSnapshot(firstTime+recordedTimes[currFrame-1],currFrame-1);
        } 

    const pausePlayBut = document.getElementById('timewarp-pause');
        pausePlayBut.style.width = '20%';
        pausePlayBut.onclick = ()=>{
            Engine.TimewarpManager.stopPlayback();
        }     

    const resumeBut = document.getElementById('timewarp-resume');
        resumeBut.style.width = '20%';
        resumeBut.onclick = ()=>{      
            changeTimewarpState('idle'); 
            const number = Number.parseInt(range.value);
            const realNumber = getLowerNumber(recordedTimes,number);
            Engine.TimewarpManager.resumeFromRecording(firstTime+realNumber);
            if(Engine.TimewarpManager.isReoccuring()){
                Engine.TimewarpManager.clearTimelines();
            }
        }

    const showForwardSingle = document.getElementById('timewarp-showForwardSingle');
        showForwardSingle.style.width = '10%';
        showForwardSingle.onclick = ()=>{
            const number = Number.parseInt(range.value);
            const currFrame = getClosestFrame(recordedTimes,number);
            if(currFrame !== recordedTimes.length - 1)
                Engine.TimewarpManager.showSnapshot(firstTime+recordedTimes[currFrame+1],currFrame+1);
        }

    const showForward = document.getElementById('timewarp-showForward');
        showForward.style.width = '10%';
        showForward.onclick = ()=>{
            const number = Number.parseInt(range.value);
            const realNumber = getLowerNumber(recordedTimes,number);
            Engine.TimewarpManager.playForward(firstTime+realNumber,factor.value/100);
        }


    const factor = document.getElementById('timewarp-playback-speed');
        factor.value = 100;

    const currFrame = document.getElementById('timewarp-current-frame');
        currFrame.innerHTML = `Frame: ${recordedTimes.length - 1}`;
        currFrame.style.textAlign = 'left';
    const maxFrame = document.getElementById('timewarp-max-frame');
        maxFrame.innerHTML = '/'+(recordedTimes.length - 1);
        maxFrame.style.textAlign = 'left';
    
    const currFrameTime = document.getElementById('timewarp-current-frame-time');
        currFrameTime.innerHTML = `Time: ${(recordedTimes[recordedTimes.length - 1] - recordedTimes[0])/1000}s`;
        currFrameTime.style.textAlign = 'left';
    const maxFrameTime = document.getElementById('timewarp-max-frame-time');
        maxFrameTime.innerHTML = '/'+(recordedTimes[recordedTimes.length - 1] - recordedTimes[0])/1000+'s';
        maxFrameTime.style.textAlign = 'left';
        
    if(Engine.TimewarpManager.isReoccuring()){
       document.getElementById('timewarp-timelines').style.display = 'block'; 
    }else{
        document.getElementById('timewarp-timelines').style.display = 'none';
    }
    const timelines = Engine.TimewarpManager.getTimelines();


    const timelinesWrapper = document.getElementById('timewarp-timelines-wrapper');
    timelinesWrapper.innerHTML = '';

    for(let i in timelines){
        uiFactory.createElement({
            parent: timelinesWrapper,
            type: 'option',
            value: i,
            innerHTML: i
        });
    }

    timelinesWrapper.value = Engine.TimewarpManager.getCurrentTimeline();

    timelinesWrapper.onchange = (ev)=>{
        Engine.TimewarpManager.setTimeline(timelinesWrapper.value);
        renderPlaybackUI();
    }
    const reRecord = document.getElementById('timewarp-rerecord');
    reRecord.onclick = () => {
        Engine.TimewarpManager.clearTimelines(timelinesWrapper.value);
        Engine.PauseManager.resume();
        changeTimewarpState('recording');
        Engine.TimewarpManager.startRecording(0);
    }
        
}

function onTimewarpLoad(){
    if(!Engine.hasManager('TimewarpManager')) throw Error('Trying to install UI that requires Timewarp Manager but it\'s not installed');
    changeTimewarpState('idle');

    const recBut = document.getElementById('timewarp-record');

    const recBut2 = document.getElementById('timewarp-record2');

    recBut2.onclick = ()=> {
        Engine.TimewarpManager.setTimewarpMechanism('Snapshot');
        changeTimewarpState('recording');
        Engine.TimewarpManager.startRecording(0);
    }

    recBut.onclick = ()=> {
        Engine.TimewarpManager.setTimewarpMechanism('DS');
        changeTimewarpState('recording');
        Engine.TimewarpManager.startRecording(0);
    }

    const stopRecBut = document.getElementById('timewarp-stop-record');

    stopRecBut.style.backgroundColor = 'red';
    stopRecBut.onclick = ()=> {
        changeTimewarpState('active');
        Engine.TimewarpManager.stopRecording();
        renderPlaybackUI();
    }

}