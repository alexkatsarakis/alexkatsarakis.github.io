import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'

import uiFactory from '../../utils/UIFactory.js'
import tr from '../../utils/translator.js'

import changeFocus from '../../utils/focusedObject.js'

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

    const clicker = document.getElementById('clickWrapper');

    wrapper.innerHTML = '';

    const bg = uiFactory.createElement({
        parent: wrapper,
        id: 'contextMenu-background'
    });
    bg.style.position = 'absolute';
    bg.style.width = clicker.offsetWidth + 'px';
    bg.style.height = clicker.offsetHeight + 'px';
    bg.style.top = clicker.offsetTop + 'px';

    const cMenu = uiFactory.createElement({
        parent: wrapper,
        id: 'contextMenu-window'
    });

    cMenu.style.top =  (clicker.offsetTop + event.offsetY) + 'px';
    cMenu.style.left = event.offsetX+'px';

    bg.onclick = ()=>{
        bg.remove();
        cMenu.remove();
    };


    cMenu.oncontextmenu = (e)=>{
        e.preventDefault();
    }

    bg.oncontextmenu = (e)=>{
        e.preventDefault();
        bg.remove();
        cMenu.remove();
        
        const mEvent = new MouseEvent('contextmenu', e);
        clicker.dispatchEvent(mEvent);
    }


    uiFactory.createElement({
        parent: cMenu,
        id: 'contextMenu-name',
        innerHTML: obj.name
    });

    
    if(!bb.fastGet('settings','Focus Object On Click')){
        const but = uiFactory.createElement({
            parent: cMenu,
            classList: 'contextMenu-item',
            innerHTML: tr.get('Focus Object')
        });
        but.onclick = ()=>{
            changeFocus(obj.id);
            bg.click();
        }
    }

    if(Engine.hasManager('ClipboardManager')){
        if(!Engine.ObjectManager.isSystemObject(objID)){
            const but = uiFactory.createElement({
                parent: cMenu,
                classList: 'contextMenu-item',
                innerHTML: tr.get('Copy Object')
            });
            but.onclick = ()=>{
                Engine.ClipboardManager.copy(obj,true);
                bg.click();
                bb.fastSet('events','showFeedback',`${obj.name} Copied`);
            }
        }
        if(Engine.ClipboardManager.top()){
            const but = uiFactory.createElement({
                parent: cMenu,
                classList: 'contextMenu-item',
                innerHTML: tr.get('Paste Object')
            });
            but.onclick = ()=>{
                const newObj = Engine.ClipboardManager.paste();
                const envObj = Engine.ObjectManager.getObjectByName('Stage');
                newObj.setPosition(
                    event.offsetX+envObj.getValue('x'),
                    event.offsetY+envObj.getValue('y')
                );
                bg.click();    
                bb.fastSet('events','showFeedback',`${newObj.name} Created`);
            }
        }
    }


    if(obj.getOption('isRemovable')){
        const but = uiFactory.createElement({
            parent: cMenu,
            classList: 'contextMenu-item',
            innerHTML: tr.get('Remove Object')
        });
        but.onclick = ()=>{
            if(bb.fastGet('settings','Show Prompt On Actions')){
                bb.fastSet('events','openPrompt',{
                    title: tr.get('Remove Object'),
                    description: `${tr.get('If you accept')} ${tr.get('object')} ${obj.name} ${tr.get('will get removed')}`,
                    onAccept: ()=>{
                        obj.remove();
                        bg.click();
                        bb.fastSet('events','showFeedback',`${obj.name} Removed`);
                    }
                });
            }else{
                obj.remove();
                bg.click();
                bb.fastSet('events','showFeedback',`${obj.name} Removed`);
            }
        }
    }


    if(Engine.hasManager('SnapshotManager')){
        let but = uiFactory.createElement({
            parent: cMenu,
            classList: 'contextMenu-item',
            innerHTML: tr.get('Take Object Snapshot')
        });
        but.onclick = ()=>{
            Engine.SnapshotManager.snapshotObject(obj);
            bg.click();
            bb.fastSet('events','showFeedback',`Took a snapshot of ${obj.name}`);
        }
        
        but = uiFactory.createElement({
            parent: cMenu,
            classList: 'contextMenu-item',
            innerHTML: tr.get('Take Scene Snapshot')
        });
        but.onclick = ()=>{
            Engine.SnapshotManager.snapshotScene('defaultName');
            bg.click();
            bb.fastSet('events','showFeedback',`Took a scene snapshot`);
        }
    }

    
    if(cMenu.offsetTop + cMenu.offsetHeight > window.innerHeight){
        cMenu.style.top = (clicker.offsetTop + event.offsetY) - cMenu.offsetHeight + 'px';
    }
    if(cMenu.offsetLeft + cMenu.offsetWidth > window.innerWidth){
        cMenu.style.left = event.offsetX - cMenu.offsetWidth + 'px';
    }

    bb.installWatch('events','contextMenu',onContextChange);
}

function onContectMenuLoaded(){
    bb.installWatch('events','contextMenu',onContextChange);
}