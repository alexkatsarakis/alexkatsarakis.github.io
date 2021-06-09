export default {
    name: 'Snapshots',
    svgIcon: '<svg class="inventory-window-tabs-item-icon" height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m417 60h-218v-25c0-19.300781-15.699219-35-35-35h-60c-19.300781 0-35 15.699219-35 35v25.261719c-38.558594 3.070312-69 35.402343-69 74.738281v302c0 41.355469 33.644531 75 75 75h20c15.75 0 29.964844-6.664062 40-17.308594 10.035156 10.644532 24.25 17.308594 40 17.308594h242c52.382812 0 95-42.617188 95-95v-262c0-52.382812-42.617188-95-95-95zm65 357c0 35.839844-29.160156 65-65 65h-242c-13.785156 0-25-11.214844-25-25v-367h267c35.839844 0 65 29.160156 65 65zm-387 65h-20c-24.8125 0-45-20.1875-45-45v-302c0-24.8125 20.1875-45 45-45h45v367c0 13.785156-11.214844 25-25 25zm9-452h60c2.757812 0 5 2.242188 5 5v25h-70v-25c0-2.757812 2.242188-5 5-5zm0 0"/><path d="m316 192c-71.683594 0-130 58.316406-130 130s58.316406 130 130 130 130-58.316406 130-130-58.316406-130-130-130zm0 230c-55.140625 0-100-44.859375-100-100s44.859375-100 100-100 100 44.859375 100 100-44.859375 100-100 100zm0 0"/><path d="m316 252c-38.597656 0-70 31.402344-70 70s31.402344 70 70 70 70-31.402344 70-70-31.402344-70-70-70zm0 110c-22.054688 0-40-17.945312-40-40s17.945312-40 40-40 40 17.945312 40 40-17.945312 40-40 40zm0 0"/><path d="m254.5 150c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-60c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm0 0"/></svg>',
    callback: showSnapshots,
    restriction: Engine.hasManager('SnapshotManager')
}

import Engine from '../../../Engine.js'
import uiFactory from '../../../utils/UIFactory.js'
import bb from '../../../utils/blackboard.js'

function previewObject(parent,item){
    if(item.extra?.div){
        const temp = document.createElement('div');
        temp.innerHTML = item.extra.div;
        const newItem = temp.firstChild;
        newItem.id = Number.parseInt(Math.random()*100000)+'_objectMenu_inventory';
        newItem.style.color = item.values.colour.val;
        newItem.classList = '';
        newItem.style.top = '';
        newItem.style.left = '';
        newItem.style.position = '';
        newItem.style.transform = 'rotate(0)';
        parent.appendChild(newItem);

    }else if(item._film){
        const pos = {
            width: item.values.width.val,
            height: item.values.height.val
        };
        const info = Engine.AnimationManager.getFilm(item._film);
        const box = info.getFrameBox(item._frame);
        const img = info.bitmap;
        const canv = uiFactory.createElement({
            type: 'canvas',
            id: Number.parseInt(Math.random()*100000)+'_objectMenu_inventory',
            parent: parent
        });
        canv.style.width = '100%';
        canv.style.height = '100%';
        const ctx = canv.getContext('2d');
        const x = canv.offsetWidth/2 - pos.width/2;
        const y = canv.offsetHeight/2 - pos.height/2;
        ctx.canvas.width = canv.offsetWidth;
        ctx.canvas.height = canv.offsetHeight;
        ctx.drawImage(bb.fastGet('assets',img),
        box.x,box.y,box.width,box.height,
        x, y, pos.width, pos.height);
    }else {
        parent.innerHTML = 'Preview for '+item.name+' isn\'t possible';
    }
}

function checkAndAddEmpty(objWrapper,object){
    const objKeys = Object.keys(object);
    if(objKeys.length === 0){
        uiFactory.createElement({
            parent: objWrapper,
            id: 'inventory-empty-text',
            innerHTML: 'Nothing to be shown'
        });
        return true;
    }
    return false;
}

function showSnapshots(objWrapper){
    objWrapper.innerHTML = '';

    const allSnapshots = Engine.SnapshotManager.getAllSnapshots();

    const isEmpty = checkAndAddEmpty(objWrapper,allSnapshots);
    const buttonWrapper = uiFactory.createElement({
        parent: objWrapper,
        classList: 'inventory-window-body-page-button-wrapper'
    });
    if(!isEmpty){
        uiFactory.createElement({
            parent: buttonWrapper,
            classList: 'inventory-window-body-page-item-button',
            innerHTML: 'Remove All'
        }).onclick = ()=>{
            if(bb.fastGet('settings','Show Prompt On Actions')){
                bb.fastSet('events','openPrompt',{
                    title: 'Remove All Snapshot',
                    description: `If you accept *ALL* snapshot will be removed`,
                    onAccept: ()=>{
                        Engine.SnapshotManager.removeAllObjectSnapshots();
                        focusTab('Snapshots');
                        showSnapshots(objWrapper);
                        bb.fastSet('events','showFeedback',`All Removed Snapshots`);
                    }
                });
            }else{
                Engine.SnapshotManager.removeAllObjectSnapshots();
                focusTab('Snapshots');
                showSnapshots(objWrapper);
                bb.fastSet('events','showFeedback',`All Removed Snapshots`);
            }
        };
    }

    function removeSnapshot(objID,snapID){
        if(bb.fastGet('settings','Show Prompt On Actions')){
            bb.fastSet('events','openPrompt',{
                title: 'Remove Snapshot',
                description: `If you accept the current snapshot will be removed`,
                onAccept: ()=>{
                    Engine.SnapshotManager.removeObjectSnapshot(objID,snapID);
                    focusTab('Snapshots');
                    showSnapshots(objWrapper);
                }
            });
        }else{
            Engine.SnapshotManager.removeObjectSnapshot(objID,snapID);
            focusTab('Snapshots');
            showSnapshots(objWrapper);
        }
    }
    
    for(let i in allSnapshots){
        const currSnapshots = allSnapshots[i];
        currSnapshots.forEach((snap,index)=>{
            const wrap = uiFactory.createElement({
                classList: 'inventory-window-itemWrapper',
                parent: objWrapper
            });

            uiFactory.createElement({
                classList: 'inventory-window-objName',
                innerHTML: `${snap._name} (${snap._time})`,
                parent: wrap
            });

            wrap.insertAdjacentHTML('beforeend', `<svg id="inventory-delete-item-${i}-${index}" class="inventory-window-body-page-item-delete" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);
            const removeBut = document.getElementById(`inventory-delete-item-${i}-${index}`);
            
            removeBut.onclick = () => {
                removeSnapshot(i,index);
            }
        
            const body = uiFactory.createElement({
                classList: 'inventory-window-body',
                parent: wrap
            });
            
            previewObject(body,snap);
    
            body.style.cursor = 'pointer';

            body.onclick = () => {
                if(bb.fastGet('settings','Show Prompt On Actions')){
                    bb.fastSet('events','openPrompt',{
                        title: 'Reset Object to Snapshot',
                        description: `If you accept the object ${snap._name} will be resetted to this snapshot`,
                        onAccept: ()=>{
                            Engine.SnapshotManager.resetObjectToSnapshot(i,index);
                            closeInventoryWindow();
                        }
                    });
                }else{
                    Engine.SnapshotManager.resetObjectToSnapshot(i,index);
                    closeInventoryWindow();
                }
            };
        });
    }
}