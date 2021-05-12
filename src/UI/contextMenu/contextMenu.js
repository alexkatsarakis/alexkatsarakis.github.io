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
    const obj = Engine.ObjectManager.objects[objID];
    
    const wrapper = document.getElementById('contextMenu-wrapper');

    const bg = uiFactory.createElement({
        parent: wrapper,
        id: 'contextMenu-background'
    });

    const cMenu = uiFactory.createElement({
        parent: wrapper,
        id: 'contextMenu-window'
    });

    cMenu.style.top =  event.clientY+'px';
    cMenu.style.left = event.clientX+'px';

    bg.onclick = ()=>{
        bg.remove();
        cMenu.remove();
    };


    uiFactory.createElement({
        parent: cMenu,
        id: 'contextMenu-name',
        innerHTML: obj.name
    });


    if(Engine.hasManager('ClipboardManager')){
        if(!Engine.ObjectManager.isSystemObject(objID)){
            const but = uiFactory.createElement({
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
            const but = uiFactory.createElement({
                parent: cMenu,
                classList: 'contextMenu-item',
                innerHTML: 'Paste Object'
            });
            but.onclick = ()=>{
                const newObj = Engine.ClipboardManager.paste();
                const envObj = Engine.ObjectManager.getObjectByName('Stage');
                newObj.setPosition(
                    event.clientX+envObj.getValue('x'),
                    event.clientY+envObj.getValue('y')
                );
                bg.click();
            }
        }
    }


    if(obj.getOption('isRemovable')){
        const but = uiFactory.createElement({
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

    
    if(cMenu.offsetTop + cMenu.offsetHeight > window.innerHeight){
        cMenu.style.top = event.clientY - cMenu.offsetHeight + 'px';
    }
    if(cMenu.offsetLeft + cMenu.offsetWidth > window.innerWidth){
        cMenu.style.left = event.clientX - cMenu.offsetWidth + 'px';
    }

    bb.installWatch('events','contextMenu',onContextChange);
}

function onContectMenuLoaded(){
    bb.installWatch('events','contextMenu',onContextChange);
}