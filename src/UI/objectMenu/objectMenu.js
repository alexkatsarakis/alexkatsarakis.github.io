import bb from '../../utils/blackboard.js'

import focusObject from '../../transitionHandlers/focusedObject.js'

function readTextFile(file,onFinish){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                document.body.insertAdjacentHTML('beforeend',allText);
                convertHTMLtoObjects();
                onFinish();
            }
        }
    }
    rawFile.send(null);
}
readTextFile('./src/UI/objectMenu/objectMenu.ahtml',onObjectMenuLoaded);

function convertHTMLtoObjects(){
    let children = [ ...document.body.children ];
    children.map(child => {
        if(child.attributes.getNamedItem("category")){
            let objCat = bb.fastGet('objects',child.attributes["category"].nodeValue);
            document.body.removeChild(child);
            let obj = new objCat({name:child.id,div:child});
            bb.fastSet('liveObjects',child.id,obj);
            obj.add();
        }
    })
}


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
        let wrap = document.createElement('div');
        wrap.classList += 'objectMenu_itemWrapper';
        objWrapper.appendChild(wrap);

        let title = document.createElement('div');
        title.classList += 'objectMenu_objName';
        title.innerHTML = i;
        wrap.appendChild(title);
        

        let body = document.createElement('div');
        body.classList += 'objectMenu_body';
        if(items[i].renderer === 'dom'){
            let newItem = items[i].getObject().cloneNode(true);
            body.appendChild(newItem);
            let oldCSS = document.defaultView.getComputedStyle(items[i].getObject(), "");
            newItem.id = newItem.id+'_objectMenu';
            newItem.style.color = oldCSS.getPropertyValue('color');
            newItem.classList = '';
            newItem.style.top = '';
            newItem.style.left = '';
            newItem.style.position = '';
            newItem.style.transform = 'rotate(0)';

        }else{
            body.innerHTML = 'Copying for '+i+' isn\'t possible at the moment';
        }

        body.onmouseenter = () => {
            let pos = bb.fastGet('liveObjects',i).getPositional();
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
        
            objName.innerText = `Name: ${i}\n
                                 Category: ${bb.fastGet('liveObjects',i).getCategory()}\n
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