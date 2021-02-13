import bb from '../../utils/blackboard.js'

import Vue from '../../../libs/vue.min.js'

export default {name:'settingsWindow',link: './src/UI/settingsWindow/settingsWindow.ahtml',cb:onSettingsWindowLoaded};

function closeSettingsWindow(){
    bb.fastGet('UI','hideUI')('settingsWindow');
}

const settings = {
    Colors: {
        mainColor: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--main-color', ev.target.value);
            },
            name: 'mainColor',
            inputType:'color'
        },
        mainColorHover: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--main-color-hover', ev.target.value);
            },
            name: 'mainColorHover',
            inputType:'color'
        },
        mainColorText: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--main-color-text', ev.target.value);
            },
            name: 'mainColorText',
            inputType:'color'
        },
        secondaryColor: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--secondary-color', ev.target.value);
            },
            name: 'secondaryColor',
            inputType:'color'
        },
        secondaryColorHover: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--secondary-color-hover', ev.target.value);
            },
            name: 'secondaryColorHover',
            inputType:'color'
        },
        secondaryColorText: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--secondary-color-text', ev.target.value);
            },
            name: 'secondaryColorText',
            inputType:'color'
        }
    },
    Names:{
        myName: {
            onChange: (ev)=>{
                if(ev.target.value !== 'true'){
                    console.log('true');
                }else{
                    console.log('false');
                }
            },
            initValue: false,
            name: 'myName',
            inputType:'checkbox'
        }
    },
    AddOns: {
        
    },
    Settings: {
        dragItems: {
            onChange: (ev)=>{
                console.log(ev.target.value);
                if(ev.target.value !== 'true'){
                    bb.fastSet('settings', 'noDrag', false);
                }else{
                    bb.fastSet('settings', 'noDrag', true);
                }
            },
            initValue: bb.fastGet('settings', 'noDrag'),
            name: 'enable dragging items',
            inputType:'checkbox'
        }
    }
}

function fillUIsSettings(){
    let UIs = bb.fastGet('UI','getUIs')();

    let loaded = bb.fastGet('UI','getLoadedUIs')();

    UIs.forEach((item)=>{
        if(item === 'settingsWindow')return;
        settings.AddOns[item] = {
            onChange: (ev)=>{
                if(ev.target.value !== 'true'){
                    bb.fastGet('UI','loadUI')(item);
                }else{
                    bb.fastGet('UI','hideUI')(item);
                }
            },
            initValue: (loaded.indexOf(item) !== -1),
            name: item,
            inputType:'checkbox'
        }
    });
}

function onSettingsWindowLoaded(){
    document.getElementById('settings-window-background').addEventListener('click',closeSettingsWindow);

    fillUIsSettings();
    
    Vue.component('settings-category', {
        props: ['settings','catname'],
        template:`<div class='settings_category'>
                    <div class='settings_category_name'>{{ catname }}</div>
                    <settings-item
                        v-for="set in settings"
                        v-bind:setting="set"
                        v-bind:key="set.name"
                    />
                </div>`
    });

    Vue.component('settings-item-input', {
        props: ['setting'],
        template: 
        `<input :type="setting.inputType" :value="setting.initValue" v-model="setting.initValue" v-on:input="setting.onChange"></input>`
      });

    Vue.component('settings-item', {
        props: ['setting'],
        template: 
        `<div class="objectItem">{{ setting.name }} <settings-item-input v-bind:setting="setting" v-bind:key="setting.name"/></div>`
      });
    let vue = new Vue({
        el: '#settings-window',
        data: {
            settings,
        },
        methods: {
            
        }
    })
}