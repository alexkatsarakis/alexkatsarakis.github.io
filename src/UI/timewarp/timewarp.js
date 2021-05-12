import Engine from '../../Engine.js'

import uiFactory from '../../utils/UIFactory.js'

import TimewarpManager from '../../EngineExtensions/TimewarpManager.js'

export default {
    name:'timewarp',
    link: './src/UI/timewarp/timewarp.ahtml',
    cb:onTimewarpLoad,
    removable: true, 
    loadOnInstall: Engine.hasManager('TimewarpManager')
};

function getLowerNumber(array,number){
    for(let i = 1; i < array.length; ++i){
        if(number < array[i]) return array[i-1];
    }
    return array[array.length -1];
}

function onTimewarpLoad(){
    if(!Engine.hasManager('TimewarpManager')) throw Error('Trying to install UI that requires Timewarp Manager but it\'s not installed');


    const timeWrapper = document.getElementById('timewarp-wrapper');


    const recBut = document.getElementById('timewarp-record');

    const recBut2 = uiFactory.createElement({
        parent: timeWrapper,
        id: 'timewarp-record',
        classList: 'timewarp-button'
    });

    recBut2.onclick = ()=> {
        Engine.removeManager('TimewarpManager');
        Engine.installManager('TimewarpManager',new TimewarpManager());
    
        recBut.click();
    }

    recBut.onclick = ()=> {
        recBut.style.backgroundColor = 'grey';
        Engine.TimewarpManager.startRecording(0);

        const stopRecBut = uiFactory.createElement({
            parent: timeWrapper,
            classList: 'timewarp-button'
        });

        recBut.style.backgroundColor = 'grey';
        stopRecBut.style.backgroundColor = 'red';
        stopRecBut.onclick = ()=> {
            stopRecBut.remove();

            Engine.TimewarpManager.stopRecording();
            
            let recordedTimes = Engine.TimewarpManager.getRecordedTimestamps();
            if(!recordedTimes) throw Error('No recorded times on stop');

            const currFrame = uiFactory.createElement({
                parent: timeWrapper,
                id: 'timewarp-currFrame', 
                classList: 'timewarp-text',
                innerHTML: `Frame: ${recordedTimes.length - 1}`
            });

            const currFrameTime = uiFactory.createElement({
                parent: timeWrapper,
                id: 'timewarp-currFrameTime', 
                classList: 'timewarp-text'
            });


            const firstTime = Number.parseInt(recordedTimes[0]);
            recordedTimes = recordedTimes.map((time)=>time - firstTime);

            const range = uiFactory.createElement({
                parent: timeWrapper,
                type: 'input',
                inputType: 'range',
                id: 'timewarp-showRecords'
            });

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

            const factor = uiFactory.createElement({
                parent: timeWrapper,
                type: 'input',
                inputType: 'number',
                classList: 'timewarp-button',
                value: 1
            });
            factor.style.padding = '0';
            factor.style.margin = '0';
            factor.style.border = '0';
            factor.style.backgroundColor = 'white';

            const showBackward = uiFactory.createElement({
                parent: timeWrapper,
                id: 'timewarp-showBackward', 
                classList: 'timewarp-button'
            });

            showBackward.onclick = ()=>{
                const number = Number.parseInt(range.value);
                const realNumber = getLowerNumber(recordedTimes,number);
                Engine.TimewarpManager.playBackward(firstTime+realNumber,factor.value);
            }  

            const pausePlayBut = uiFactory.createElement({
                parent: timeWrapper,
                classList: 'timewarp-text',
                innerHTML: 'Pause'
            });
            pausePlayBut.onclick = ()=>{
                Engine.TimewarpManager.stopPlayback();
            }          
            
            const showForward = uiFactory.createElement({
                parent: timeWrapper,
                id: 'timewarp-showForward', 
                classList: 'timewarp-button'
            });

            showForward.onclick = ()=>{
                const number = Number.parseInt(range.value);
                const realNumber = getLowerNumber(recordedTimes,number);
                Engine.TimewarpManager.playForward(firstTime+realNumber,factor.value);
            }

            const resumeBut = uiFactory.createElement({
                parent: timeWrapper,
                id: 'timewarp-resume', 
                classList: 'timewarp-text',
                innerHTML: 'Continue'
            });

            resumeBut.onclick = ()=>{
                recBut.style.backgroundColor = 'red';                
                const number = Number.parseInt(range.value);
                const realNumber = getLowerNumber(recordedTimes,number);
                Engine.TimewarpManager.resumeFromRecording(firstTime+realNumber);
                range.remove();
                factor.remove();
                showBackward.remove();
                pausePlayBut.remove();
                showForward.remove();
                resumeBut.remove();
                currFrame.remove();
                currFrameTime.remove();
            }

        }
    }



}