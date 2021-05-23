import bb from './blackboard.js'

const tableOfContent ={
    'user': [
        'general/Welcome',
        
        'Quick Start/Intro',
        'Quick Start/Adding Objects',
        'Quick Start/Coding',
        'Quick Start/Value Manipulation',
        'Quick Start/Debugging',
        'Quick Start/Save and Load',
    ],
    'dev': [
        'general/Welcome',
        'general/Future Work',
        'general/Goals',
        'general/Related Work',
        'general/External Libraries',

        'Architecture/Macro-Architecture',
        'Architecture/Engine Architecture',
        'Architecture/UI Manager Architecture',

        'Scripting/Blockly',
        'Scripting/Javascript',

        'renderer/Custom Canvas',
        'renderer/Document Elements',

        'engine/Animation Manager',
        'engine/Clock Manager',
        'engine/Collision Manager',
        'engine/Input Manager',
        'engine/Object Manager',
        'engine/Physics Manager',
        'engine/Save Manager',
        'engine/Scripting Manager',
        'engine/Sound Manager',

        'Engine Extension/Clipboard Manager',
        'Engine Extension/Distance Manager',
        'Engine Extension/Object Snapshot Manager',
        'Engine Extension/Pause Manager',
        'engine Extension/Timewarp Manager (Snapshot)',
        'engine Extension/Timewarp Manager (Delta State)',
        
        'UIs/Animation Workshop',
        'UIs/Collision Registry',
        'UIs/Object Creation',
        'UIs/Hud',
        'UIs/Inventory Window',
        'UIs/Keyboard',
        'UIs/Object Floating Information',
        'UIs/Object Information',
        'UIs/Object Preview',
        'UIs/Settings Window',
        'UIs/Toolbar',
    ]
};

const ToCElement = document.getElementById('table-of-content');


export default class TableOfContentManager {
    _tableOfContent;
    _cachedToC = {};

    constructor(table = 'user'){
        this._tableOfContent = tableOfContent[table];
        ToCElement.innerHTML = '';
        this.load();
    }

    load(){
        this._tableOfContent.forEach((item)=>{
            let splitted = item.split("/");
            if(splitted.length !== 2) throw Error('Error creating item for table of content');
        
            const category = splitted[0][0].toUpperCase() + splitted[0].substring(1);
            const catItem = splitted[1]; 
            this.checkAndCreateCategory(category);
            this.addItemOnCategory(category, catItem);
        });
    }


    checkAndCreateCategory(cat){
        if(this._cachedToC[cat])return;
    
        this._cachedToC[cat] = [];
        const wrapper = document.createElement('div');
        wrapper.classList = 'ToC-category-wrapper';
        wrapper.id = 'ToC-category-id-'+cat;
        const item = document.createElement('div');
        item.classList = 'ToC-category';
        item.innerHTML = cat[0].toUpperCase() + cat.substring(1);
        wrapper.appendChild(item);
        ToCElement.appendChild(wrapper);
    }
    
    addItemOnCategory(cat, item){
        const category = this._cachedToC[cat];
        if(category.indexOf(item) !== -1)return;
    
        this._cachedToC[cat].push(item);
        let catElement = document.getElementById('ToC-category-id-'+cat);
        const itemElem = document.createElement('div');
        itemElem.classList = 'ToC-item';
        itemElem.innerHTML = item;
        itemElem.onclick = () => {
            bb.fastSet('Page','currentlyShowing', `${cat}/${item}`);
        }
        catElement.appendChild(itemElem);
    }
}