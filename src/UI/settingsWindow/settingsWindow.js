import bb from '../../utils/blackboard.js'

export default {
    name:'settingsWindow',
    link: './src/UI/settingsWindow/settingsWindow.ahtml',
    cb:onSettingsWindowLoaded,
    removable: true, 
    loadOnInstall: true
};

function closeSettingsWindow(){
    bb.fastGet('UI','hideUI')('settingsWindow');
    bb.fastGet('UI','removeUI')('settingsWindow');
}

const computedStyle = getComputedStyle(document.documentElement);

const settings = {
    Colors: {
        mainColor: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--main-color', ev.target.value);
            },
            initValue: computedStyle.getPropertyValue('--main-color').substring(1),
            name: 'mainColor',
            inputType:'color'
        },
        mainColorHover: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--main-color-hover', ev.target.value);
            },
            initValue: computedStyle.getPropertyValue('--main-color-hover').substring(1),
            name: 'mainColorHover',
            inputType:'color'
        },
        mainColorText: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--main-color-text', ev.target.value);
            },
            initValue: computedStyle.getPropertyValue('--main-color-text').substring(1),
            name: 'mainColorText',
            inputType:'color'
        },
        secondaryColor: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--secondary-color', ev.target.value);
            },
            initValue: computedStyle.getPropertyValue('--secondary-color').substring(1),
            name: 'secondaryColor',
            inputType:'color'
        },
        secondaryColorHover: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--secondary-color-hover', ev.target.value);
            },
            initValue: computedStyle.getPropertyValue('--secondary-color-hover').substring(1),
            name: 'secondaryColorHover',
            inputType:'color'
        },
        secondaryColorText: {
            onChange: (ev)=>{
                document.documentElement.style.setProperty('--secondary-color-text', ev.target.value);
            },
            initValue: computedStyle.getPropertyValue('--secondary-color-text').substring(1),
            name: 'secondaryColorText',
            inputType:'color'
        }
    },
    AddOns: {
        
    },
    Settings: {
    }
}

function fillSettings(){
    let set = bb.getComponent('settings').itemMap;
    for(let i in set){
        settings.Settings[i] = {
            onChange: (ev)=>{
                bb.fastSet('settings', i, ev.target.checked);
            },
            initValue: set[i],
            name: i,
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
                bb.fastGet('UI',(ev.target.checked)?'loadUI':'hideUI')(item);
            },
            initValue: (loaded.indexOf(item) !== -1),
            name: item,
            inputType:'checkbox'
        }
    });
}

function onSettingsWindowLoaded(){
    document.getElementById('settings-window-background').addEventListener('click',closeSettingsWindow);

    const setWindow = document.getElementById('settings-window');
    fillSettings();
    fillUIsSettings();
    
    for(let cat in settings){
        let catItems = settings[cat];

        let wrapper = document.createElement('div');
        wrapper.classList = 'settings_category';
        setWindow.appendChild(wrapper);

        let catNameElem = document.createElement('div');
        catNameElem.classList = 'settings_category_name';
        catNameElem.innerHTML = cat;
        wrapper.appendChild(catNameElem);

        for(let item in catItems){
            let setting = catItems[item];
            let itemWrapper = document.createElement('div');
            itemWrapper.classList = 'objectItem';
            itemWrapper.innerHTML = setting.name;
            wrapper.appendChild(itemWrapper);

            let itemInput = document.createElement('input');
            itemInput.type = setting.inputType;
            if(setting.inputType === 'checkbox'){
                itemInput.checked = setting.initValue;
            }
            itemInput.value = setting.initValue;
            itemInput.onchange = setting.onChange;
            itemWrapper.appendChild(itemInput);
        }

        
    }
}


// Vue solution
/*
import Vue from '../../../libs/vue.min.js'
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
*/