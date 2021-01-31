import './utils/initializationManager.js'

import Engine from './Engine.js'


import init from '../assets/json/pacman.js' // json
import animationManagement from '../assets/json/AnimationManagerJSON.js' // json
import animationFilms from '../assets/json/AnimationFilmHolderJSON.js' // json

import serverCommuncator from './utils/serverCommunication.js'

serverCommuncator.tableName = 'superMario3';

serverCommuncator.getTable(serverCommuncator.tableName,(res)=>{
    if(res !== ''){
        res = JSON.parse(res);
        res.forEach( element => {
            element.objectInfo = element.objectInfo.replaceAll("'",'"');
            element.objectInfo = JSON.parse(element.objectInfo);
        })
        res = res.map(item => item.objectInfo);
        // console.log(res);
        Engine.initInfo = {
            state:{
                name: 'initial_pac',
                background_color: '#000000',
                background: './assets/textures/sky.jpeg'
            },
            objects: res
        };
    }else{
        Engine.initInfo = {
            state:{
                name: 'initial_pac',
                background_color: '#000000',
                background: './assets/textures/sky.jpeg'
            },
            objects: []
        };
    }

    
    Engine.preSetAnimations = animationManagement;
    Engine.animationBundle = animationFilms;
    
    Engine.start();
});

// Engine.initInfo = init;
// Engine.preSetAnimations = animationManagement;
// Engine.animationBundle = animationFilms;

// Engine.start();

// console.log(init);

// init.objects.forEach((obj)=>{
//     serverCommuncator.addItemToTable('superMario',[
//         {
//             name: 'id',
//             type: 'TEXT',
//             value: obj.id
//         },
//         {
//             name: 'objectInfo',
//             type: 'TEXT',
//             value: JSON.stringify(obj).replaceAll('"',"'")
//         }
//     ])
//     console.log(JSON.stringify(obj));
// });

import bb from './utils/blackboard.js'
function changeState(){
    console.log(bb.fastGet('state','player'));
    bb.fastGet('state','player').setCurrentState('movingRight');
}

bb.fastInstall('actions','changeState',changeState);