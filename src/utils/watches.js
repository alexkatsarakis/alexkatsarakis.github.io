import bb from './blackboard.js'


export default function installWatches(){
    bb.installWatch('state','mode',triggerStateModeChange);
}

const aliveItems = bb.getComponent('liveObjects').itemMap;
function triggerStateModeChange(e){
    if(e === 'play'){
        for(let i in aliveItems)
            aliveItems[i].triggerEvent('onGameStart');
    }
    bb.installWatch('state','mode',triggerStateModeChange);
}
