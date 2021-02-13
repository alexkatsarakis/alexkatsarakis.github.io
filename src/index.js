import './utils/initializationManager.js'

import Engine from './Engine.js'


// import savedLocally from '../assets/json/savedState.js'
import animationManagement from '../assets/json/AnimationManagerJSON.js' // json
import animationFilms from '../assets/json/AnimationFilmHolderJSON.js' // json

import serverCommuncator from './utils/serverCommunication.js'


const LOADFROMSERVER = false;

if(!LOADFROMSERVER){
    const loadJSON = (callback) => {
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', './assets/json/savedState.json', true);
        xobj.onreadystatechange = () => {
            if (xobj.readyState === 4 && xobj.status === 200) {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    loadJSON((response) => {
        let res = JSON.parse(response);
        let arr = [];

        for(let i in res){
            arr.push(res[i]);
        }
        // console.log(res);
        Engine.initInfo = {
            state:{
                name: 'initial_pac',
                background_color: '#000000',
                background: './assets/textures/sky.jpeg'
            },
            objects: arr
        };
        Engine.preSetAnimations = animationManagement;
        Engine.animationBundle = animationFilms;
        
        Engine.start();
    });
}

if(LOADFROMSERVER){
    serverCommuncator.tableName = 'superMarioReal';

    serverCommuncator.getTable(serverCommuncator.tableName,(res)=>{
        if(res !== ''){
            res = JSON.parse(res);
            res.forEach( element => {
                element.objectInfo = element.objectInfo.replaceAll("'",'"').replaceAll("~","'");
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
}