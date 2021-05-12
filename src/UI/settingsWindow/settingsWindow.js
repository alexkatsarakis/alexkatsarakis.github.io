import bb from '../../utils/blackboard.js'

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
    Settings: {
    }
}

function fillSettings(){
    const set = bb.getComponent('settings').itemMap;
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

function onSettingsWindowLoaded(){
    document.getElementById('settings-window-background').addEventListener('click',closeSettingsWindow);

    lastGameState = bb.fastGet('state','mode');
    bb.fastSet('state','mode','popUpOpen');

    const setWindow = document.getElementById('settings-window');
    fillSettings();
    fillUIsSettings();
    
    for(let cat in settings){
        const catItems = settings[cat];

        const wrapper = document.createElement('div');
        wrapper.classList = 'settings_category';
        setWindow.appendChild(wrapper);

        const catNameElem = document.createElement('div');
        catNameElem.classList = 'settings_category_name';
        catNameElem.innerHTML = cat;
        wrapper.appendChild(catNameElem);

        for(let item in catItems){
            const setting = catItems[item];
            const itemWrapper = document.createElement('div');
            itemWrapper.classList = 'objectItem';
            itemWrapper.innerHTML = setting.name;
            wrapper.appendChild(itemWrapper);

            const itemInput = document.createElement('input');
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