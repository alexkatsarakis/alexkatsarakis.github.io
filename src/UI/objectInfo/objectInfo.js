import bb from '../../utils/blackboard.js'

import transition from '../../utils/focusedObject.js'
import Engine from '../../Engine.js';

export default {
    name:'objectInfo',
    link: './src/UI/objectInfo/objectInfo.ahtml',
    cb:onObjectInfoLoaded,
    removable: true, 
    loadOnInstall: true
};

function refreshInfoBox(id){
    transition(undefined);
    transition(id);
}

function addStateButtonHandler(){
    let addStateBut = document.getElementById('mainInfoBox-body-states-add');
    let text = document.getElementById('mainInfoBox-body-states-text');
    let close = document.getElementById('mainInfoBox-body-states-close');
    let accept = document.getElementById('mainInfoBox-body-states-add2');
    close.style.display = 'block';
    addStateBut.style.display = 'none';
    accept.style.display = 'block';
    text.style.width = '92px';
    close.onclick = ()=>{
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addStateBut.style.display = 'block';
        accept.style.display = 'none';
    }
    accept.onclick = ()=>{
        let textValue = text.value;
        if(textValue === "")return;
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addStateBut.style.display = 'block';
        accept.style.display = 'none';
        let focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addState(textValue);
        transition(undefined);
        transition(focusedObj.id);
    }
}

function createStatesView(states){
    let statesInfo = document.getElementById('mainInfoBox-body-states-main');
    statesInfo.innerHTML = "";
    for(let i in states){
        let item = document.createElement('div');
        item.classList += "mainInfoBox-body-states-main-wrap";
        
        let text = document.createElement('div');
        text.classList = 'mainInfoBox-shard-main-text';
        text.innerHTML = i;
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-states-attributes-remove-${i}" class="mainInfoBox-shard-main-remove" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);
        
        item.appendChild(text);

        statesInfo.appendChild(item);
    }
}

function addAttributeButtonHandler(){
    let addAttrBut = document.getElementById('mainInfoBox-body-attributes-add');
    let text = document.getElementById('mainInfoBox-body-attributes-text');
    let close = document.getElementById('mainInfoBox-body-attributes-close');
    let accept = document.getElementById('mainInfoBox-body-attributes-add2');
    close.style.display = 'block';
    addAttrBut.style.display = 'none';
    accept.style.display = 'block';
    text.style.width = '68px';
    close.onclick = ()=>{
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addAttrBut.style.display = 'block';
        accept.style.display = 'none';
    }
    accept.onclick = ()=>{
        let textValue = text.value;
        if(textValue === "")return;
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addAttrBut.style.display = 'block';
        accept.style.display = 'none';
        let focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addValue(textValue);
        transition(undefined);
        transition(focusedObj.id);
    }
}

function createAttributesView(attrs){
    let attributesInfo = document.getElementById('mainInfoBox-body-attributes-main');
    attributesInfo.innerHTML = "";
    let focusedObj = bb.fastGet('state', 'focusedObject');
    for(let i in attrs){
        let item = document.createElement('div');
        item.classList += "mainInfoBox-body-attributes-main-wrap";
        
        let text = document.createElement('div');
        text.classList = 'mainInfoBox-shard-main-text';
        text.innerHTML = `${i}: ${focusedObj.getValue(i)}`;
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-attributes-main-remove-${i}" class="mainInfoBox-shard-main-remove" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-attributes-main-edit-${i}" class="mainInfoBox-shard-main-edit" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.873 477.873" style="enable-background:new 0 0 477.873 477.873;" xml:space="preserve"><g><g><path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"/></g></g><g><g><path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955C443.754,73.631,440.467,81.575,434.603,87.419z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`);

        item.appendChild(text);

        attributesInfo.appendChild(item);

        let rmBut = document.getElementById(`mainInfoBox-body-attributes-main-remove-${i}`);
        if(focusedObj.getValueTag(i) === 'user'){
            rmBut.style.fill = 'red';
            rmBut.style.cursor = 'pointer';
            rmBut.onclick = (() => {focusedObj.removeValue(i);refreshInfoBox(focusedObj.id);});
        }else{
            rmBut.style.fill = 'grey';
            rmBut.style.cursor = 'normal';
        }

        let editBut = document.getElementById(`mainInfoBox-body-attributes-main-edit-${i}`);
        editBut.onclick = (() => {
            editBut.style.display = 'none';
            text.innerHTML = i+': ';
            let inp = document.createElement('input');
            inp.type = 'text';
            inp.classList = 'mainInfoBox-shard-input-text';
            inp.value = focusedObj.getValue(i);
            inp.onchange = (ev) => {
                let val = ev.target.value;
                if(isNaN(val) || val === '')
                    focusedObj.setValue(i, val);
                else
                    focusedObj.setValue(i, Number.parseFloat(val))
            }
            text.appendChild(inp);
        });
    }
}

function addEventsButtonHandler(){
    let addEventBut = document.getElementById('mainInfoBox-body-events-add');
    let text = document.getElementById('mainInfoBox-body-events-text');
    let close = document.getElementById('mainInfoBox-body-events-close');
    let accept = document.getElementById('mainInfoBox-body-events-add2');
    close.style.display = 'block';
    addEventBut.style.display = 'none';
    accept.style.display = 'block';
    text.style.width = '87px';
    close.onclick = ()=>{
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addEventBut.style.display = 'block';
        accept.style.display = 'none';
    }
    accept.onclick = ()=>{
        let textValue = text.value;
        if(textValue === "")return;
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addEventBut.style.display = 'block';
        accept.style.display = 'none';
        let focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addEvent(textValue);
        transition(undefined);
        transition(focusedObj.id);
    }
}

function createEventsView(events){
    let eventsInfo = document.getElementById('mainInfoBox-body-events-main');
    eventsInfo.innerHTML = "";
    let focusedObj = bb.fastGet('state', 'focusedObject');
    for(let i in events){
        let item = document.createElement('div');
        item.classList += "mainInfoBox-body-events-main-wrap";
        
        let text = document.createElement('div');
        text.classList = 'mainInfoBox-shard-main-text';
        text.innerHTML = i;
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-events-main-remove-${i}" class="mainInfoBox-shard-main-remove" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);

        item.appendChild(text);

        eventsInfo.appendChild(item);

        if(focusedObj.getEventTag(i) === 'user'){
            let rmBut = document.getElementById(`mainInfoBox-body-events-main-remove-${i}`);
            rmBut.style.fill = 'red';
            rmBut.style.cursor = 'pointer';
            rmBut.onclick = (() => {
                focusedObj.removeEvent(i);
                refreshInfoBox(focusedObj.id);
            });
        }
    }
}

function addFlagsButtonHandler(){
    let addFlagBut = document.getElementById('mainInfoBox-body-flags-add');
    let text = document.getElementById('mainInfoBox-body-flags-text');
    let close = document.getElementById('mainInfoBox-body-flags-close');
    let accept = document.getElementById('mainInfoBox-body-flags-add2');
    close.style.display = 'block';
    addFlagBut.style.display = 'none';
    accept.style.display = 'block';
    text.style.width = '94px';
    close.onclick = ()=>{
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addFlagBut.style.display = 'block';
        accept.style.display = 'none';
    }
    accept.onclick = ()=>{
        let textValue = text.value;
        if(textValue === "")return;
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addFlagBut.style.display = 'block';
        accept.style.display = 'none';
        let focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addOption(textValue);
        refreshInfoBox(focusedObj.id);
    }
}

function createFlagsView(flags){
    let flagsInfo = document.getElementById('mainInfoBox-body-flags-main');
    flagsInfo.innerHTML = "";
    let obj = bb.fastGet('state', 'focusedObject');
    for(let i in flags){
        let item = document.createElement('div');
        item.classList += "mainInfoBox-body-flags-main-wrap";
        
        let text = document.createElement('div');
        text.classList = 'mainInfoBox-shard-main-text';
        text.innerHTML = `${i}: ${obj.getOption(i)}`;
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-flags-main-remove-${i}" class="mainInfoBox-shard-main-remove" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-flags-main-edit-${i}" class="mainInfoBox-shard-main-edit" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.873 477.873" style="enable-background:new 0 0 477.873 477.873;" xml:space="preserve"><g><g><path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"/></g></g><g><g><path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955C443.754,73.631,440.467,81.575,434.603,87.419z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`);

        item.appendChild(text);

        flagsInfo.appendChild(item);

        if(obj.getOptionTag(i) === 'user'){
            let rmBut = document.getElementById(`mainInfoBox-body-flags-main-remove-${i}`);
            rmBut.style.fill = 'red';
            rmBut.style.cursor = 'pointer';
            rmBut.onclick = () => {
                obj.removeOption(i);
                refreshInfoBox(obj.id);
            }
        }

        let editBut = document.getElementById(`mainInfoBox-body-flags-main-edit-${i}`);
        editBut.onclick = () => {
            editBut.style.display = 'none';
            text.innerHTML = i+': ';
            let opt = document.createElement('select');
            opt.classList = 'mainInfoBox-shard-input-dropdown';
            let trueOpt = document.createElement('option');
            trueOpt.value = 'true';
            trueOpt.text = 'true';
            let falseOpt = document.createElement('option');
            falseOpt.value = 'false';
            falseOpt.text = 'false';

            if(obj.getOption(i)){
                trueOpt.selected = 'selected';
            }else{
                falseOpt.selected = 'selected';
            }

            opt.appendChild(trueOpt);
            opt.appendChild(falseOpt);

            opt.onchange = ((ev) => {
                if(ev.target.value === 'true'){
                    obj.setOption(i,true);
                }else{
                    obj.setOption(i,false);
                }
                refreshInfoBox(obj.id);
            });

            text.innerHTML = i + ": ";
            text.appendChild(opt);
        }
    }
}

function fillObjectActions(obj){
    let wrapper = document.getElementById('mainInfoBox-options');
    wrapper.innerHTML = '';
    wrapper.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-options-close" class="mainInfoBox-options-item" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"><g><g><path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285L284.286,256.002z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`);
    
    let closeBut = document.getElementById('mainInfoBox-options-close');
    closeBut.onclick = ()=>{
        bb.fastSet('state', 'focusedObject', undefined);
    }
    
    if(Engine.hasManager('ClipboardManager') && !Engine.ObjectManager.isSystemObject(obj.id)){
        wrapper.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-options-copy" class="mainInfoBox-options-item" height="512pt" viewBox="-40 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m271 512h-191c-44.113281 0-80-35.886719-80-80v-271c0-44.113281 35.886719-80 80-80h191c44.113281 0 80 35.886719 80 80v271c0 44.113281-35.886719 80-80 80zm-191-391c-22.054688 0-40 17.945312-40 40v271c0 22.054688 17.945312 40 40 40h191c22.054688 0 40-17.945312 40-40v-271c0-22.054688-17.945312-40-40-40zm351 261v-302c0-44.113281-35.886719-80-80-80h-222c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h222c22.054688 0 40 17.945312 40 40v302c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm0 0"/></svg>`);
        let copyBut = document.getElementById('mainInfoBox-options-copy');
        copyBut.onclick = ()=>{
            Engine.ClipboardManager.copy(obj,true);
        }
    }


    if(obj.getOption('isRemovable') && !Engine.ObjectManager.isSystemObject(obj.id)){
        wrapper.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-options-remove" class="mainInfoBox-options-item" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);
        let removeBut = document.getElementById('mainInfoBox-options-remove');
        removeBut.style.fill = 'red';
        removeBut.onclick = ()=>{
            obj.remove();
            bb.fastSet('state', 'focusedObject', undefined);
        }
    }
}

function updateInfo(obj){
    if(!document.getElementById('mainInfoBox'))return;
    if(obj === undefined){
        document.getElementById('mainInfoBox').style.display = 'none';
        bb.installWatch('state','focusedObject',updateInfo);
        return;
    }
    document.getElementById('mainInfoBox').style.display = 'block';
    document.getElementById('mainInfoBox-head-name').innerHTML = 'Name: '+obj.name;
    document.getElementById('mainInfoBox-head-categ').innerHTML = 'Category: '+obj.getCategory();

    fillObjectActions(obj);

    let addStateBut = document.getElementById('mainInfoBox-body-states-add');
    addStateBut.onclick = addStateButtonHandler;
    createStatesView(obj.getStates());

    let addAttrBut = document.getElementById('mainInfoBox-body-attributes-add');
    addAttrBut.onclick = addAttributeButtonHandler;
    createAttributesView(obj.getValues());

    let addEventBut = document.getElementById('mainInfoBox-body-events-add');
    addEventBut.onclick = addEventsButtonHandler;
    createEventsView(obj.getEvents());
    
    let addFlagBut = document.getElementById('mainInfoBox-body-flags-add');
    addFlagBut.onclick = addFlagsButtonHandler;
    createFlagsView(obj.getOptions());

    bb.installWatch('state','focusedObject',updateInfo);
}

function onObjectInfoLoaded(){
    let focObj = bb.fastGet('state','focusedObject');
    updateInfo(focObj);
}
