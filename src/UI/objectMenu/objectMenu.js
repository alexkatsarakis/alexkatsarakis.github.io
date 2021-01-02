import bb from '../../utils/blackboard.js'

import focusObject from '../../transitionHandlers/focusedObject.js'

export default {name:'objectMenu',link: './src/UI/objectMenu/objectMenu.ahtml',cb:onObjectMenuLoaded};

function toggleObjectMenu(){
    let wrapper = document.getElementById('objectMenuWrapper');
    let toggleBut = document.getElementById('objectMenu_makeBig');
    if(wrapper.style.height === '200px'){
        wrapper.style.height = 0;
        toggleBut.style.bottom = 0;
    }else{
        wrapper.style.height = '200px';
        toggleBut.style.bottom = '200px';
        updateObjectList();
    }
}

function updateObjectList(){
    let items = bb.getComponent('liveObjects').itemMap;
    let objWrapper = document.getElementById('objectMenuWrapper');
    objWrapper.innerHTML = '';
    for(let i in items){
        let item = items[i];
        let name = item.name;
        let wrap = document.createElement('div');
        wrap.classList += 'objectMenu_itemWrapper';
        objWrapper.appendChild(wrap);

        let title = document.createElement('div');
        title.classList += 'objectMenu_objName';
        title.innerHTML = name;
        wrap.appendChild(title);
        

        let body = document.createElement('div');
        body.classList += 'objectMenu_body';
        if(item.renderer === 'dom'){
            let newItem = item.getObject().cloneNode(true);
            body.appendChild(newItem);
            let oldCSS = document.defaultView.getComputedStyle(item.getObject(), "");
            newItem.id = newItem.id+'_objectMenu';
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
                canv.id = item.id+'_objectMenu';
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
            body.innerHTML = 'Copying for '+i+' isn\'t possible';
        }

        body.onmouseenter = () => {
            let item = items[i];
            let pos = bb.fastGet('liveObjects',item.id).getPositional();
            let mark = document.createElement('div');
            mark.id = 'objectMenu_focus';
            if(pos.r){
                mark.style.width = (pos.r * 2)+'px';
                mark.style.height = (pos.r * 2)+'px';
            }else{
                mark.style.width = pos.width+'px';
                mark.style.height = pos.height+'px';
                mark.style.transform = `rotate(${pos.rotation}deg)`;
            }
            mark.style.top = pos.y+'px';
            mark.style.left = pos.x+'px';

            let objName = document.createElement('div');
            objName.id = 'objectMenu_focus_name';
        
            objName.innerText = `Name: ${item.name}\n
                                 Category: ${bb.fastGet('liveObjects',item.id).getCategory()}\n
                                 X: ${pos.x}px\n
                                 Y: ${pos.y}px`;
            objName.style.top = (pos.y - 120)+'px';
            objName.style.left = pos.x+'px';

            document.body.appendChild(objName);
            document.body.appendChild(mark);

        }

        body.onclick = () => {
            focusObject(i);
        }

        body.onmouseleave = () => {
            document.getElementById('objectMenu_focus_name').remove();
            document.getElementById('objectMenu_focus').remove();
        }

        wrap.appendChild(body);

    }
}

function onObjectMenuLoaded(){
    let toggleBut = document.getElementById('objectMenu_makeBig');
    toggleBut.addEventListener('click',toggleObjectMenu)

}