import bb from '../../utils/blackboard.js'

import Vue from '../../../libs/vue.min.js'

import Engine from '../../Engine.js'

export default {name:'inventoryWindow',link: './src/UI/inventoryWindow/inventoryWindow.ahtml',cb:onSettingsInventoryLoaded};


const FRAnimator = bb.fastGet('animation','FrameRangeAnimator');
const FRAnimation = bb.fastGet('animation','FrameRangeAnimation');

function closeInventoryWindow(){
    removeAllAnimators();
    bb.fastGet('UI','hideUI')('inventoryWindow');
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
    body.innerHTML = 'test'

    let item = document.createElement('div');
    item.classList = 'inventory-window-tabs-item';
    item.classList += ' inventory-window-tabs-item-selected';
    item.innerHTML = 'TEEEEE'
    item.onclick = ()=>{focusTab('TEEEEE');showNothing(body)}
    tabDiv.appendChild(item);
    
    item = document.createElement('div');
    item.classList = 'inventory-window-tabs-item';
    item.innerHTML = 'Animations'
    item.onclick = ()=>{focusTab('Animations');showAnimations(body)}
    tabDiv.appendChild(item);

    item = document.createElement('div');
    item.classList = 'inventory-window-tabs-item';
    item.innerHTML = 'Objects'
    item.onclick = ()=>{focusTab('Objects');showObjects(body)}
    tabDiv.appendChild(item);


}

function clear(){
    removeAllAnimators();
}

function showObjects(objWrapper){
    objWrapper.innerHTML = '';
    let items = Engine.ObjectManager.objects;
    for(let i in items){
        let item = items[i];
        let name = item.name;
        let wrap = document.createElement('div');
        wrap.classList += 'inventory-window-itemWrapper';
        objWrapper.appendChild(wrap);

        let title = document.createElement('div');
        title.classList += 'inventory-window-objName';
        title.innerHTML = name;
        wrap.appendChild(title);
        

        let body = document.createElement('div');
        body.classList += 'inventory-window-body';
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
                let canv = document.createElement('canvas');
                canv.id = item.id+'_objectMenu_inventory';
                body.appendChild(canv);
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
            body.innerHTML = 'Preview for '+i+' isn\'t possible';
        }

        wrap.appendChild(body);

    }

}

function showNothing(objWrapper){
    objWrapper.innerHTML = 'LOL';
}


let animatorsForPreview = [];

function removeAllAnimators(){
    animatorsForPreview.forEach((an)=>an());
}

function showAnimations(objWrapper){
    let items = Engine.AnimationManager.getAllFilms();
    objWrapper.innerHTML = '';
    for(let i in items){
        let wrap = document.createElement('div');
        wrap.classList += 'inventory-window-animationPreview_itemWrapper';
        objWrapper.appendChild(wrap);

        let title = document.createElement('div');
        title.classList += 'inventory-window-animationPreview_objName';
        title.innerHTML = i;
        wrap.appendChild(title);
        

        let body = document.createElement('div');
        body.classList += 'inventory-window-animationPreview_body';

        let anim = document.createElement('canvas');
        anim.classList += 'inventory-window-animationPreview_film';
        let ctx = anim.getContext('2d');
        
        let animator = new FRAnimator();
        let animation = new FRAnimation({
            id: '_prev_'+i,
            start: 0,
            end: items[i].totalFrames - 1,
            reps: -1,
            delay: 100
        })

        animator.onAction = (th)=>{
            let firstBox = items[i].getFrameBox(th.currentFrame);
            ctx.clearRect(0,0,anim.width,anim.height);
            ctx.drawImage(bb.fastGet('assets',items[i].bitmap),
                firstBox.x,firstBox.y,firstBox.width,firstBox.height,
                (anim.width/2) - (firstBox.width*5/2),(anim.height/2) - (firstBox.height*5/2),firstBox.width*5,firstBox.height*5)
        };

        
    
        animator.start({
            animation: animation,
            timestamp: bb.fastGet('state','gameTime'),
        })

        body.appendChild(anim);

        wrap.appendChild(body);


        animatorsForPreview.push(()=>{
            animator.stop();
        });
    }
}