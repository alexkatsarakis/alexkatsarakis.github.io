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
    const addStateBut = document.getElementById('mainInfoBox-body-states-add');
    const text = document.getElementById('mainInfoBox-body-states-text');
    const close = document.getElementById('mainInfoBox-body-states-close');
    const accept = document.getElementById('mainInfoBox-body-states-add2');
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
        const textValue = text.value;
        if(textValue === "")return;
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addStateBut.style.display = 'block';
        accept.style.display = 'none';
        const focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addState(textValue);
        transition(undefined);
        transition(focusedObj.id);
    }
}

function createStatesView(states){
    const statesInfo = document.getElementById('mainInfoBox-body-states-main');
    statesInfo.innerHTML = "";
    for(let i in states){
        const item = document.createElement('div');
        item.classList += "mainInfoBox-body-states-main-wrap";
        
        const text = document.createElement('div');
        text.classList = 'mainInfoBox-shard-main-text';
        text.innerHTML = i;
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-states-attributes-remove-${i}" class="mainInfoBox-shard-main-remove" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);
        
        item.appendChild(text);

        statesInfo.appendChild(item);
    }
}

function addAttributeButtonHandler(){
    const addAttrBut = document.getElementById('mainInfoBox-body-attributes-add');
    const text = document.getElementById('mainInfoBox-body-attributes-text');
    const close = document.getElementById('mainInfoBox-body-attributes-close');
    const accept = document.getElementById('mainInfoBox-body-attributes-add2');
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
        const textValue = text.value;
        if(textValue === "")return;
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addAttrBut.style.display = 'block';
        accept.style.display = 'none';
        const focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addValue(textValue);
        transition(undefined);
        transition(focusedObj.id);
    }
}

function createAttributesView(attrs){
    const attributesInfo = document.getElementById('mainInfoBox-body-attributes-main');
    attributesInfo.innerHTML = "";
    const focusedObj = bb.fastGet('state', 'focusedObject');
    for(let i in attrs){
        const item = document.createElement('div');
        item.classList += "mainInfoBox-body-attributes-main-wrap";
        
        const text = document.createElement('div');
        text.classList = 'mainInfoBox-shard-main-text';
        text.innerHTML = `${i}: ${focusedObj.getValue(i)}`;
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-attributes-main-remove-${i}" class="mainInfoBox-shard-main-remove" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-attributes-main-edit-${i}" class="mainInfoBox-shard-main-edit" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.873 477.873" style="enable-background:new 0 0 477.873 477.873;" xml:space="preserve"><g><g><path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"/></g></g><g><g><path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955C443.754,73.631,440.467,81.575,434.603,87.419z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`);

        item.appendChild(text);

        attributesInfo.appendChild(item);

        const rmBut = document.getElementById(`mainInfoBox-body-attributes-main-remove-${i}`);
        if(focusedObj.getValueTag(i) === 'user'){
            rmBut.style.fill = 'red';
            rmBut.style.cursor = 'pointer';
            rmBut.onclick = (() => {focusedObj.removeValue(i);refreshInfoBox(focusedObj.id);});
        }else{
            rmBut.style.fill = 'grey';
            rmBut.style.cursor = 'normal';
        }

        const editBut = document.getElementById(`mainInfoBox-body-attributes-main-edit-${i}`);
        editBut.onclick = (() => {
            editBut.style.display = 'none';
            text.innerHTML = i+': ';
            const inp = document.createElement('input');
            inp.type = 'text';
            inp.classList = 'mainInfoBox-shard-input-text';
            inp.value = focusedObj.getValue(i);
            inp.onchange = (ev) => {
                const val = ev.target.value;
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
    const addEventBut = document.getElementById('mainInfoBox-body-events-add');
    const text = document.getElementById('mainInfoBox-body-events-text');
    const close = document.getElementById('mainInfoBox-body-events-close');
    const accept = document.getElementById('mainInfoBox-body-events-add2');
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
        const textValue = text.value;
        if(textValue === "")return;
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addEventBut.style.display = 'block';
        accept.style.display = 'none';
        const focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addEvent(textValue);
        transition(undefined);
        transition(focusedObj.id);
    }
}

function createEventsView(events){
    const eventsInfo = document.getElementById('mainInfoBox-body-events-main');
    eventsInfo.innerHTML = "";
    const focusedObj = bb.fastGet('state', 'focusedObject');
    for(let i in events){
        const item = document.createElement('div');
        item.classList += "mainInfoBox-body-events-main-wrap";
        
        const text = document.createElement('div');
        text.classList = 'mainInfoBox-shard-main-text';
        text.innerHTML = i;
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-events-main-remove-${i}" class="mainInfoBox-shard-main-remove" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);

        item.appendChild(text);

        eventsInfo.appendChild(item);

        if(focusedObj.getEventTag(i) === 'user'){
            const rmBut = document.getElementById(`mainInfoBox-body-events-main-remove-${i}`);
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
    const addFlagBut = document.getElementById('mainInfoBox-body-flags-add');
    const text = document.getElementById('mainInfoBox-body-flags-text');
    const close = document.getElementById('mainInfoBox-body-flags-close');
    const accept = document.getElementById('mainInfoBox-body-flags-add2');
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
        const textValue = text.value;
        if(textValue === "")return;
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addFlagBut.style.display = 'block';
        accept.style.display = 'none';
        const focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addOption(textValue);
        refreshInfoBox(focusedObj.id);
    }
}

function createFlagsView(flags){
    const flagsInfo = document.getElementById('mainInfoBox-body-flags-main');
    flagsInfo.innerHTML = "";
    const obj = bb.fastGet('state', 'focusedObject');
    for(let i in flags){
        const item = document.createElement('div');
        item.classList += "mainInfoBox-body-flags-main-wrap";
        
        const text = document.createElement('div');
        text.classList = 'mainInfoBox-shard-main-text';
        text.innerHTML = `${i}: ${obj.getOption(i)}`;
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-flags-main-remove-${i}" class="mainInfoBox-shard-main-remove" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-flags-main-edit-${i}" class="mainInfoBox-shard-main-edit" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.873 477.873" style="enable-background:new 0 0 477.873 477.873;" xml:space="preserve"><g><g><path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"/></g></g><g><g><path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955C443.754,73.631,440.467,81.575,434.603,87.419z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`);

        item.appendChild(text);

        flagsInfo.appendChild(item);

        if(obj.getOptionTag(i) === 'user'){
            const rmBut = document.getElementById(`mainInfoBox-body-flags-main-remove-${i}`);
            rmBut.style.fill = 'red';
            rmBut.style.cursor = 'pointer';
            rmBut.onclick = () => {
                obj.removeOption(i);
                refreshInfoBox(obj.id);
            }
        }

        const editBut = document.getElementById(`mainInfoBox-body-flags-main-edit-${i}`);
        editBut.onclick = () => {
            editBut.style.display = 'none';
            text.innerHTML = i+': ';
            const opt = document.createElement('select');
            opt.classList = 'mainInfoBox-shard-input-dropdown';
            const trueOpt = document.createElement('option');
            trueOpt.value = 'true';
            trueOpt.text = 'true';
            const falseOpt = document.createElement('option');
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


function addCollisionsButtonHandler(){
    const addFlagBut = document.getElementById('mainInfoBox-body-collisions-add');
    const text = document.getElementById('mainInfoBox-body-collisions-text');
    const close = document.getElementById('mainInfoBox-body-collisions-close');
    const accept = document.getElementById('mainInfoBox-body-collisions-add2');
    close.style.display = 'block';
    addFlagBut.style.display = 'none';
    accept.style.display = 'block';
    text.style.width = '70px';
    close.onclick = ()=>{
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addFlagBut.style.display = 'block';
        accept.style.display = 'none';
    }
    accept.onclick = ()=>{
        const textValue = text.value;
        if(textValue === "")return;
        close.style.display = 'none';
        text.style.width = '0';
        text.value = '';
        addFlagBut.style.display = 'block';
        accept.style.display = 'none';
        const focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addCollision(textValue);
        refreshInfoBox(focusedObj.id);
    }
}

function createCollisionsView(cols){
    const collsInfo = document.getElementById('mainInfoBox-body-collisions-main');
    collsInfo.innerHTML = "";
    const obj = bb.fastGet('state', 'focusedObject');
    for(let name in cols){
        const item = document.createElement('div');
        item.classList += "mainInfoBox-body-collisions-main-wrap";
        
        const text = document.createElement('div');
        text.classList = 'mainInfoBox-shard-main-text';
        text.innerHTML = `${name}`;
        item.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-collisions-main-remove-${name}" class="mainInfoBox-shard-main-remove" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);

        item.appendChild(text);

        collsInfo.appendChild(item);

        const rmBut = document.getElementById(`mainInfoBox-body-collisions-main-remove-${name}`);
        rmBut.style.fill = 'red';
        rmBut.style.cursor = 'pointer';
        rmBut.onclick = (() => {
            obj.removeCollision(name)
            refreshInfoBox(obj.id);
        });

    };
}

function fillObjectActions(obj){
    const wrapper = document.getElementById('mainInfoBox-options');
    wrapper.innerHTML = '';
    wrapper.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-options-close" class="mainInfoBox-options-item" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"><g><g><path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285L284.286,256.002z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`);
    
    const closeBut = document.getElementById('mainInfoBox-options-close');
    closeBut.onclick = ()=>{
        bb.fastSet('state', 'focusedObject', undefined);
    }
    
    if(Engine.hasManager('ClipboardManager') && !Engine.ObjectManager.isSystemObject(obj.id)){
        wrapper.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-options-copy" class="mainInfoBox-options-item" height="512pt" viewBox="-40 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m271 512h-191c-44.113281 0-80-35.886719-80-80v-271c0-44.113281 35.886719-80 80-80h191c44.113281 0 80 35.886719 80 80v271c0 44.113281-35.886719 80-80 80zm-191-391c-22.054688 0-40 17.945312-40 40v271c0 22.054688 17.945312 40 40 40h191c22.054688 0 40-17.945312 40-40v-271c0-22.054688-17.945312-40-40-40zm351 261v-302c0-44.113281-35.886719-80-80-80h-222c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h222c22.054688 0 40 17.945312 40 40v302c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm0 0"/></svg>`);
        const copyBut = document.getElementById('mainInfoBox-options-copy');
        copyBut.onclick = ()=>{
            Engine.ClipboardManager.copy(obj,true);
        }
    }

    if(Engine.hasManager('SnapshotManager')){
        wrapper.insertAdjacentHTML('beforeend', `<svg height="512pt" id="mainInfoBox-options-snapshot" class="mainInfoBox-options-item" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m417 60h-218v-25c0-19.300781-15.699219-35-35-35h-60c-19.300781 0-35 15.699219-35 35v25.261719c-38.558594 3.070312-69 35.402343-69 74.738281v302c0 41.355469 33.644531 75 75 75h20c15.75 0 29.964844-6.664062 40-17.308594 10.035156 10.644532 24.25 17.308594 40 17.308594h242c52.382812 0 95-42.617188 95-95v-262c0-52.382812-42.617188-95-95-95zm65 357c0 35.839844-29.160156 65-65 65h-242c-13.785156 0-25-11.214844-25-25v-367h267c35.839844 0 65 29.160156 65 65zm-387 65h-20c-24.8125 0-45-20.1875-45-45v-302c0-24.8125 20.1875-45 45-45h45v367c0 13.785156-11.214844 25-25 25zm9-452h60c2.757812 0 5 2.242188 5 5v25h-70v-25c0-2.757812 2.242188-5 5-5zm0 0"/><path d="m316 192c-71.683594 0-130 58.316406-130 130s58.316406 130 130 130 130-58.316406 130-130-58.316406-130-130-130zm0 230c-55.140625 0-100-44.859375-100-100s44.859375-100 100-100 100 44.859375 100 100-44.859375 100-100 100zm0 0"/><path d="m316 252c-38.597656 0-70 31.402344-70 70s31.402344 70 70 70 70-31.402344 70-70-31.402344-70-70-70zm0 110c-22.054688 0-40-17.945312-40-40s17.945312-40 40-40 40 17.945312 40 40-17.945312 40-40 40zm0 0"/><path d="m254.5 150c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-60c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm0 0"/></svg>`);
        const snapBut = document.getElementById('mainInfoBox-options-snapshot');
        snapBut.onclick = ()=>{
            Engine.SnapshotManager.snapshotObject(obj);
        }
    }

    if(obj.getOption('isRemovable') && !Engine.ObjectManager.isSystemObject(obj.id)){
        wrapper.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-options-remove" class="mainInfoBox-options-item" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);
        const removeBut = document.getElementById('mainInfoBox-options-remove');
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
    const nameBox = document.getElementById('mainInfoBox-head-name');
    nameBox.innerHTML = 'Name: '+obj.name;
    
    
    if(!Engine.ObjectManager.isSystemObject(obj.id)){
        nameBox.insertAdjacentHTML('beforeend', `<svg id="mainInfoBox-body-name-edit" class="mainInfoBox-shard-main-edit" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.873 477.873" style="enable-background:new 0 0 477.873 477.873;" xml:space="preserve"><g><g><path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"/></g></g><g><g><path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955C443.754,73.631,440.467,81.575,434.603,87.419z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`);

        const changeNameBut = document.getElementById('mainInfoBox-body-name-edit');
        changeNameBut.onclick = (()=>{
            nameBox.innerHTML = 'Name: ';
            const newNameInput = document.createElement('input');
            newNameInput.type = 'text';
            newNameInput.value = obj.name;
            newNameInput.classList = 'mainInfoBox-shard-main-text';
            newNameInput.onchange = (ev)=>{
                Engine.ObjectManager.rename(obj,ev.target.value);
                refreshInfoBox(obj.id);
            }
            nameBox.appendChild(newNameInput);
        });
    }

    document.getElementById('mainInfoBox-head-categ').innerHTML = 'Category: '+obj.getCategory();
    document.getElementById('mainInfoBox-head-id').innerHTML = 'ID: '+obj.id;
    fillObjectActions(obj);

    const addStateBut = document.getElementById('mainInfoBox-body-states-add');
    addStateBut.onclick = addStateButtonHandler;
    createStatesView(obj.getStates());

    const addAttrBut = document.getElementById('mainInfoBox-body-attributes-add');
    addAttrBut.onclick = addAttributeButtonHandler;
    createAttributesView(obj.getValues());

    const addEventBut = document.getElementById('mainInfoBox-body-events-add');
    addEventBut.onclick = addEventsButtonHandler;
    createEventsView(obj.getEvents());
    
    const addFlagBut = document.getElementById('mainInfoBox-body-flags-add');
    addFlagBut.onclick = addFlagsButtonHandler;
    createFlagsView(obj.getOptions());

    const addCollBut = document.getElementById('mainInfoBox-body-collisions-add');
    addCollBut.onclick = addCollisionsButtonHandler;
    createCollisionsView(obj.getCollisions());

    bb.installWatch('state','focusedObject',updateInfo);
}

function onObjectInfoLoaded(){
    const focObj = bb.fastGet('state','focusedObject');
    updateInfo(focObj);
}
