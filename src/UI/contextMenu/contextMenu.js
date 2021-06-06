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

    wrapper.innerHTML = ''

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


    cMenu.oncontextmenu = (e)=>{
        e.preventDefault();
    }

    bg.oncontextmenu = (e)=>{
        e.preventDefault();
        bg.remove();
        cMenu.remove();
        const mEvent = new MouseEvent('contextmenu', {
            clientX: e.clientX,
            clientY: e.clientY
        });
        document.getElementById('clickWrapper').dispatchEvent(mEvent);
    }


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
                bb.fastSet('events','showFeedback',`${obj.name} Copied`);
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
                bb.fastSet('events','showFeedback',`${newObj.name} Created`);
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
            if(bb.fastGet('settings','Show Prompt On Actions')){
                bb.fastSet('events','openPrompt',{
                    title: 'Remove Object',
                    description: `If you accept ${obj.name} will be removed`,
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
            innerHTML: 'Take Object Snapshot'
        });
        but.onclick = ()=>{
            Engine.SnapshotManager.snapshotObject(obj);
            bg.click();
            bb.fastSet('events','showFeedback',`Took a snapshot of ${obj.name}`);
        }
        
        but = uiFactory.createElement({
            parent: cMenu,
            classList: 'contextMenu-item',
            innerHTML: 'Take Scene Snapshot'
        });
        but.onclick = ()=>{
            Engine.SnapshotManager.snapshotScene('defaultName');
            bg.click();
            bb.fastSet('events','showFeedback',`Took a scene snapshot`);
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