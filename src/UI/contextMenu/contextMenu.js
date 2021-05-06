import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'

import uiFactory from '../../utils/UIFactory.js'

export default {
    name:'contextMenu',
    link: './src/UI/contextMenu/contextMenu.ahtml',
    cb:onContectMenuLoaded,
    removable: true, 
    loadOnInstall: true
};

function onContextChange({objID,event}){
    let obj = Engine.ObjectManager.objects[objID];
    
    let wrapper = document.getElementById('contextMenu-wrapper');

    let bg = uiFactory.createElement({
        parent: wrapper,
        id: 'contextMenu-background'
    });

    let cMenu = uiFactory.createElement({
        parent: wrapper,
        id: 'contextMenu-window'
    });

    cMenu.style.top =  event.clientY+'px';
    cMenu.style.left = event.clientX+'px';
    

    bg.onclick = ()=>{
        bg.remove();
        cMenu.remove();
    };

    if(Engine.hasManager('ClipboardManager')){
        if(!Engine.ObjectManager.isSystemObject(objID)){
            let but = uiFactory.createElement({
                parent: cMenu,
                classList: 'contextMenu-item',
                innerHTML: 'Copy Object'
            });
            but.onclick = ()=>{
                Engine.ClipboardManager.copy(obj,true);
                bg.click();
            }
        }
        if(Engine.ClipboardManager.top()){
            let but = uiFactory.createElement({
                parent: cMenu,
                classList: 'contextMenu-item',
                innerHTML: 'Paste Object'
            });
            but.onclick = ()=>{
                let newObj = Engine.ClipboardManager.paste();
                let envObj = Engine.ObjectManager.getObjectByName('Stage');
                newObj.setPosition(
                    event.clientX+envObj.getValue('x'),
                    event.clientY+envObj.getValue('y')
                );
                bg.click();
            }
        }
    }


    if(obj.getOption('isRemovable')){
        let but = uiFactory.createElement({
            parent: cMenu,
            classList: 'contextMenu-item',
            innerHTML: 'Remove Object'
        });
        but.onclick = ()=>{
            obj.remove();
            bg.click();
        }
    }


    if(Engine.hasManager('SnapshotManager')){
        let but = uiFactory.createElement({
            parent: cMenu,
            classList: 'contextMenu-item',
            innerHTML: 'Take Object Snapshot'
        });
        but.onclick = ()=>{
            Engine.SnapshotManager.snapshotObject(obj);
            bg.click();
        }
        
        but = uiFactory.createElement({
            parent: cMenu,
            classList: 'contextMenu-item',
            innerHTML: 'Take Scene Snapshot'
        });
        but.onclick = ()=>{
            Engine.SnapshotManager.snapshotScene('defaultName');
            bg.click();
        }
    }

    

    bb.installWatch('events','contextMenu',onContextChange);
}

function onContectMenuLoaded(){
    bb.installWatch('events','contextMenu',onContextChange);
}