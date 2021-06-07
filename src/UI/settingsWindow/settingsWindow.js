import bb from '../../utils/blackboard.js'

import uiFactory from '../../utils/UIFactory.js'

export default {
    name:'settingsWindow',
    link: './src/UI/settingsWindow/settingsWindow.ahtml',
    cb:onSettingsWindowLoaded,
    removable: true, 
    loadOnInstall: true
};

let lastGameState;

function closeSettingsWindow(){
    bb.fastGet('UI','hideUI')('settingsWindow');
    bb.fastGet('UI','removeUI')('settingsWindow');
    
    if(lastGameState){
        bb.fastSet('state','mode',lastGameState);
    }
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
    Options: {
    }
}

function fillSettings(){
    const set = bb.getComponent('settings').itemMap;
    for(let i in set){
        settings.Options[i] = {
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
    const UIs = bb.fastGet('UI','getUIs')();

    const loaded = bb.fastGet('UI','getLoadedUIs')();

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

function showCategorySettings(wrapper,catItems){

    for(let item in catItems){   
        const setting = catItems[item];

        const itemWrapper = uiFactory.createElement({
            parent: wrapper,
            classList: 'settings-window-category-item-wrap'
        });
        
        uiFactory.createElement({
            parent: itemWrapper,
            classList: 'settings-window-category-item-name',
            innerHTML: setting.name
        });

        const itemInput = uiFactory.createElement({
            parent: itemWrapper,
            classList: 'settings-window-category-item-input',
            type: 'input',
            onChange: settings.onChange
        });
        itemInput.type = setting.inputType;
        if(setting.inputType === 'checkbox'){
            itemInput.checked = setting.initValue;
        }
        itemInput.value = setting.initValue;
        itemInput.onchange = setting.onChange;

        uiFactory.createElement({
            parent: itemWrapper,
            classList: 'settings-window-category-item-description',
            innerHTML: setting.description || 'No description provided'
        });
    }
}

function onSettingsWindowLoaded(){
    document.getElementById('settings-window-background').addEventListener('click',closeSettingsWindow);

    lastGameState = bb.fastGet('state','mode');
    bb.fastSet('state','mode','popUpOpen');

    const catWindow = document.getElementById('settings-window-categories-list');
    const panel = document.getElementById('settings-window-settings-panel');
    fillSettings();
    fillUIsSettings();
    
    for(let cat in settings){
        const catItems = settings[cat];

        const catBut = uiFactory.createElement({
            parent: catWindow,
            classList: 'settings-window-category',
            innerHTML: cat
        });

        const catPanel = uiFactory.createElement({
            parent: panel,
            classList: 'settings-window-category-panel',
            id: 'settings-window-category-panel-'+cat,
            innerHTML: cat
        });

        catBut.onclick = () => {
            panel.scrollTo({
                top: catPanel.offsetTop,
                left:0,
                behavior: 'smooth'
            });
        }

        showCategorySettings(panel,catItems);

        uiFactory.createElement({
            parent: panel,
            classList: 'settings-window-category-splitter'
        });
    }
}