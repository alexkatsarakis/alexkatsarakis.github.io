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
readTextFile('./src/UI/createObjectMenu/createObjectMenu.ahtml',onCreateObjectMenuLoaded);

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
    let wrapper = document.getElementById('createObjectMenuWrapper');
    let toggleBut = document.getElementById('createObjectMenu_makeBig');
    if(wrapper.style.height === '200px'){
        wrapper.style.height = 0;
        toggleBut.style.bottom = '20px';
    }else{
        wrapper.style.height = '200px';
        toggleBut.style.bottom = '200px';
        updateObjectList();
    }
}

function updateObjectList(){
    let items = bb.getComponent('objects').itemMap;
    let objWrapper = document.getElementById('createObjectMenuWrapper');
    objWrapper.innerHTML = '';
    for(let i in items){
        let wrap = document.createElement('div');
        wrap.classList += 'createObjectMenu_itemWrapper';
        objWrapper.appendChild(wrap);

        let title = document.createElement('div');
        title.classList += 'createObjectMenu_objName';
        title.innerHTML = i;
        wrap.appendChild(title);
        

        let body = document.createElement('div');
        body.classList += 'createObjectMenu_body';
        
        let inpNamePrompt = document.createElement('div');
        inpNamePrompt.innerHTML = 'Name:';
        inpNamePrompt.style.width = "20%";
        inpNamePrompt.style.height = '20px';
        inpNamePrompt.style.float = 'left';
        body.appendChild(inpNamePrompt);

        let inpName = document.createElement('input');
        inpName.type = 'text';
        inpName.style.width = "75%";
        inpName.style.height = '20px';
        inpName.placeholder = 'Object name';
        body.appendChild(inpName);


        let createBut = document.createElement('button');
        // body.innerHTML = 'Click to create an object of type '+i;
        createBut.onclick = () => {
            if(inpName.value === '')return;
            bb.fastGet('actions','createObject')({category:i,name:inpName.value,colour:'#ff00ff',position:{x:500,y:500}});
        }
        createBut.innerHTML = 'Create';
        body.appendChild(createBut);


        wrap.appendChild(body);

    }
}

function onCreateObjectMenuLoaded(){
    let toggleBut = document.getElementById('createObjectMenu_makeBig');
    toggleBut.addEventListener('click',toggleObjectMenu)

}