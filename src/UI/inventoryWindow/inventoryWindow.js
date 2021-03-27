import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'
import uiFactory from '../../utils/UIFactory.js';

export default {
    name:'inventoryWindow',
    link: './src/UI/inventoryWindow/inventoryWindow.ahtml',
    cb:onSettingsInventoryLoaded,
    removable: true, 
    loadOnInstall: true
};

function closeInventoryWindow(){
    removeAllAnimators();
    bb.fastGet('UI','hideUI')('inventoryWindow');
    bb.fastGet('UI','removeUI')('inventoryWindow');
}

function focusTab(tabName){
    clear();
    let tabs = document.getElementsByClassName('inventory-window-tabs-item');
    for(let i = 0; i < tabs.length; i++){
        tabs[i].classList = 'inventory-window-tabs-item';
        if(tabs[i].innerHTML === tabName){
            tabs[i].classList += ' inventory-window-tabs-item-selected';
        }
    }
}

function onSettingsInventoryLoaded(){
    document.getElementById('inventory-window-background').addEventListener('click',closeInventoryWindow);
    document.getElementById('inventory-window-head-close').addEventListener('click',closeInventoryWindow);
    
    let tabDiv = document.getElementById('inventory-window-tabs');

    let body = document.getElementById('inventory-window-body');
    body.innerHTML = '';

    uiFactory.createElement({
        classList: 'inventory-window-tabs-item  inventory-window-tabs-item-selected',
        innerHTML: 'Films',
        parent: tabDiv
    }).onclick = () => {
        focusTab('Films');
        showFilms(body);
    }

    uiFactory.createElement({
        classList: 'inventory-window-tabs-item',
        innerHTML: 'Objects',
        parent: tabDiv
    }).onclick = () => {
        focusTab('Objects');
        showObjects(body);
    }

    if(Engine.hasManager('ClipboardManager')){
        uiFactory.createElement({
            classList: 'inventory-window-tabs-item',
            innerHTML: 'Clipboard',
            parent: tabDiv
        }).onclick = () => {
            focusTab('Clipboard');
            showClipboard(body);
        }
    }

    if(Engine.hasManager('ObjectSnapshotManager')){
        uiFactory.createElement({
            classList: 'inventory-window-tabs-item',
            innerHTML: 'Object Snapshot',
            parent: tabDiv
        }).onclick = () => {
            focusTab('Object Snapshot');
            showSnapshots(body);
        }
    }

    focusTab('Films');
    showFilms(body);

}

function clear(){
    removeAllAnimators();
}

function showSnapshots(objWrapper){
    objWrapper.innerHTML = '';    
}

function showClipboard(objWrapper){
    objWrapper.innerHTML = '';
    let clipboardObjs = Engine.ClipboardManager.getCollection();
    clipboardObjs.reverse();
    clipboardObjs.forEach(item=>{
        console.log(item);
        let wrap = uiFactory.createElement({
            classList: 'inventory-window-itemWrapper',
            parent: objWrapper
        });

        uiFactory.createElement({
            classList: 'inventory-window-objName',
            innerHTML: item._name,
            parent: wrap
        });
        

        let body = uiFactory.createElement({
            classList: 'inventory-window-body',
            innerHTML: `Category: ${item._category}
            Name: ${item._name}
            Time: ${item._time}`,
            parent: wrap
        });

        body.style.cursor = 'pointer';
        
        body.onclick = () => {
            Engine.ClipboardManager.paste(item);
            closeInventoryWindow();
        };

    });
}

function showObjects(objWrapper){
    objWrapper.innerHTML = '';
    let items = Engine.ObjectManager.objects;
    for(let i in items){
        let item = items[i];
        let wrap = uiFactory.createElement({
            classList: 'inventory-window-itemWrapper',
            parent: objWrapper
        });

        uiFactory.createElement({
            classList: 'inventory-window-objName',
            innerHTML: item.name,
            parent: wrap
        });
        

        let body = uiFactory.createElement({
            classList: 'inventory-window-body',
            parent: wrap
        });

        if(item.renderer === 'dom'){
            let newItem = item.getObject().cloneNode(true);
            body.appendChild(newItem);
            let oldCSS = document.defaultView.getComputedStyle(item.getObject(), "");
            newItem.id = newItem.id+'_objectMenu_inventory';
            newItem.style.color = oldCSS.getPropertyValue('color');
            newItem.classList = '';
            newItem.style.top = '';
            newItem.style.left = '';
            newItem.style.position = '';
            newItem.style.transform = 'rotate(0)';

        }else if(item.renderer === '454'){
            let pos = item.getPositional();
            if(item._film){
                let info = item._getFilm(item._film);
                let box = info.getFrameBox(item._frame);
                let img = info.bitmap;
                let canv = uiFactory.createElement({
                    type: 'canvas',
                    id: item.id+'_objectMenu_inventory',
                    parent: body
                });
                canv.style.width = '100%';
                canv.style.height = '100%';
                let ctx = canv.getContext('2d');
                let x = canv.width/2 - pos.width/2;
                let y = canv.height/2 - pos.height/2;
                ctx.drawImage(bb.fastGet('assets',img),
                box.x,box.y,box.width,box.height,
                x, y, pos.width, pos.height);
            }
        }else {
            body.innerHTML = 'Preview for '+item.name+' isn\'t possible';
        }

    }

}


let animatorsForPreview = [];

function removeAllAnimators(){
    animatorsForPreview.forEach((an)=>an());
}

function showFilms(objWrapper){
    const FRAnimator = Engine.AnimationManager.getAnimatorCategory('FrameRangeAnimator');
    const FRAnimation = Engine.AnimationManager.getAnimationCategory('FrameRangeAnimation');
    let items = Engine.AnimationManager.getAllFilms();
    objWrapper.innerHTML = '';
    for(let i in items){
        let wrap = uiFactory.createElement({
            classList: 'inventory-window-animationPreview_itemWrapper',
            parent: objWrapper
        });

        uiFactory.createElement({
            classList: 'inventory-window-animationPreview_objName',
            innerHTML: i,
            parent: wrap
        });

        let body = uiFactory.createElement({
            classList: 'inventory-window-animationPreview_body',
            parent: wrap
        });

        let anim = uiFactory.createElement({
            type: 'canvas',
            classList: 'inventory-window-animationPreview_film',
            parent: body
        });
        let ctx = anim.getContext('2d');
        
        let animator = new FRAnimator();
        let animation = new FRAnimation({
            id: '_prev_'+i,
            start: 0,
            end: items[i].totalFrames - 1,
            reps: -1,
            delay: 100
        });

        animator.onAction = (th)=>{
            let firstBox = items[i].getFrameBox(th.currentFrame);
            ctx.clearRect(0,0,anim.width,anim.height);
            ctx.drawImage(bb.fastGet('assets',items[i].bitmap),
                firstBox.x,firstBox.y,firstBox.width,firstBox.height,
                0,0,anim.height*(firstBox.width/firstBox.height), anim.height);
        };

        
    
        animator.start({
            animation: animation,
            timestamp: bb.fastGet('state','gameTime'),
        });


        animatorsForPreview.push(()=>{
            animator.stop();
        });
    }
}