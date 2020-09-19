import bb from '../../utils/blackboard.js'

import transition from '../../transitionHandlers/focusedObject.js'

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
readTextFile('./src/UI/objectInfo/objectInfo.ahtml',onObjectInfoLoaded);

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

function updateInfo(object){
    if(object === undefined || bb.fastGet('state','mode') !== 'editing'){
        document.getElementById('mainInfoBox').style.display = "none";
        bb.installWatch('state','focusedObject',updateInfo);
        return;
    }
    let obj = bb.fastGet('liveObjects',object);
    document.getElementById('mainInfoBox').style.display = "block";
    document.getElementById('objName').innerHTML = object;
    document.getElementById('categName').innerHTML = "("+obj.getCategory()+")";

    let fieldsInfo = document.getElementById('fieldsInfo');
    fieldsInfo.innerHTML = "";
    for(let i in obj.getValues()){
        let item = document.createElement('div');
        item.classList += "InfoBox_item";
        item.innerHTML = i + " = " + obj.getValue(i);
        fieldsInfo.appendChild(item);
    }

    document.getElementById('addFieldButton').addEventListener('click',()=>{
        let textValue = document.getElementById('addFieldText').value;
        if(textValue === "")return;
        let focusedObj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
        focusedObj.addValue(textValue);
        let item = document.createElement('div');
        item.classList += "InfoBox_item";
        item.innerHTML = textValue + " = " + focusedObj.getValue(textValue);
        fieldsInfo.appendChild(item);
        document.getElementById('addFieldText').value = "";
    });

    let eventsInfo = document.getElementById('eventsInfo');
    eventsInfo.innerHTML = "";
    for(let i in obj.getEvents()){
        let item = document.createElement('div');
        item.classList += "InfoBox_item";
        item.innerHTML = i;
        eventsInfo.appendChild(item);
    }

    document.getElementById('addEventButton').addEventListener('click',()=>{
        let textValue = document.getElementById('addEventText').value;
        if(textValue === "")return;
        let focusedObj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
        focusedObj.addEvent(textValue);
        let item = document.createElement('div');
        item.innerHTML = textValue;
        item.classList += "InfoBox_item";
        eventsInfo.appendChild(item);
        document.getElementById('addEventText').value = "";
        transition(undefined);
        transition(focusedObj.getName());
    });

    let attributeInfo = document.getElementById('attributeInfo');
    attributeInfo.innerHTML = "";
    for(let i in obj.getOptions()){
        let item = document.createElement('div');
        item.innerHTML = i + " = " + obj.getOption(i);
        item.classList += "InfoBox_item";
        attributeInfo.appendChild(item);
    }

    document.getElementById('addAttributeButton').addEventListener('click',()=>{
        let textValue = document.getElementById('addAttributeText').value;
        if(textValue === "")return;
        let focusedObj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
        focusedObj.addOption(textValue);
        let item = document.createElement('div');
        item.innerHTML = textValue + " = " + focusedObj.getOption(textValue);
        item.classList += "InfoBox_item";
        attributeInfo.appendChild(item);
        document.getElementById('addAttributeText').value = "";
    });

    bb.installWatch('state','focusedObject',updateInfo);
}

function onObjectInfoLoaded(){
    updateInfo(undefined);
}
