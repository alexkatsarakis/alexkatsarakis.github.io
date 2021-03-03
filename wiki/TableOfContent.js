import bb from './blackboard.js'

const tableOfContent ={
    'user': [
        'general/Welcome',
        'Quick Start/intro',
    ],
    'dev': [
        'general/Welcome',
        'general/Future Work',
        'general/Goals',
        'general/Related Work',
        'general/External Libraries',
        'Architecture/Macro-Architecture',
        'Architecture/Engine Architecture',
        'engine/Clock Manager',
        'engine/Save Manager',
        'engine/Sound Manager',
        'engine/Scripting Manager',
        'Scripting/Blockly',
        'Scripting/Javascript',
        'engine/Object Manager',
        'renderer/Document Elements',
        'renderer/Custom Canvas',
        'engine/Collision Manager',
        'engine/Animation Manager'
    ]
}

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