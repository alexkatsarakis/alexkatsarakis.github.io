export default {
    name: 'Objects',
    svgIcon: '<svg class="inventory-window-tabs-item-icon" enable-background="new 0 0 533.876 533.876" height="512" viewBox="0 0 533.876 533.876" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m386.851 426.475c-11.518 0-20.855-9.337-20.855-20.855v-175.177c0-11.518 9.337-20.855 20.855-20.855s20.855 9.337 20.855 20.855v175.178c0 11.517-9.337 20.854-20.855 20.854zm45.173 71.118 64.835-64.299c23.525-23.33 37.017-55.713 37.017-88.844v-219.323c0-68.995-56.132-125.127-125.127-125.127h-218.786c-33.226 0-64.519 12.885-88.11 36.283l-64.836 64.299c-23.525 23.329-37.017 55.712-37.017 88.845v219.322c0 68.995 56.132 125.127 125.127 125.127h218.786c33.228 0 64.519-12.885 88.111-36.283zm-23.275-455.884c45.997 0 83.418 37.421 83.418 83.418v219.322c0 22.088-8.995 43.677-24.678 59.23l-64.835 64.3c-15.728 15.598-36.589 24.188-58.741 24.188h-218.786c-45.997 0-83.418-37.421-83.418-83.418v-219.322c0-22.088 8.995-43.677 24.678-59.23l64.835-64.3c15.728-15.598 36.589-24.188 58.741-24.188zm24.552 88.131 8.77-8.545c8.25-8.037 8.421-21.241.384-29.49-8.037-8.25-21.242-8.422-29.49-.384l-8.771 8.545c-16.651 16.226-38.626 25.161-61.874 25.161h-207.808c-11.518 0-20.855 9.337-20.855 20.855s9.337 20.855 20.855 20.855h207.807c34.185-.001 66.496-13.14 90.982-36.997z"/></g></svg>',
    callback: showObjects
}

import Engine from '../../../Engine.js'
import tr from '../../../utils/translator.js'
import uiFactory from '../../../utils/UIFactory.js'
import bb from '../../../utils/blackboard.js'

function clearAllObjects(){
    const objs = Engine.ObjectManager.objects;

    for(let i in objs){
        const obj = objs[i];
        if(!Engine.ObjectManager.isSystemObject(obj.id)){
            obj.remove();
        }
    }
}

function clearObjects(arr){
    for(let i in arr){
        const obj = arr[i];
        if(!Engine.ObjectManager.isSystemObject(obj.id)){
            obj.remove();
        }
    }
}

function RenderManager(objWrapper,items){
    const oWrap = uiFactory.createElement({parent:objWrapper});

    let filter = '';

    function showObject(item){
        const wrap = uiFactory.createElement({
            classList: 'inventory-window-itemWrapper',
            parent: oWrap
        });
    
        uiFactory.createElement({
            classList: 'inventory-window-objName',
            innerHTML: item.name,
            parent: wrap
        });
    
        if(!Engine.ObjectManager.isSystemObject(item.id)){
            wrap.insertAdjacentHTML('beforeend', `<svg id="inventory-delete-item-${item.id}" class="inventory-window-body-page-item-delete" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`);
            const removeBut = document.getElementById(`inventory-delete-item-${item.id}`);
            removeBut.style.zIndex = 10;
            removeBut.onclick = () => {
                if(bb.fastGet('settings','Show Prompt On Actions')){
                    bb.fastSet('events','openPrompt',{
                        title: tr.get('Remove Object'),
                        description: `${tr.get('If you accept')} ${tr.get('item')} ${item._name} ${tr.get('will get removed')}`,
                        onAccept: ()=>{
                            item.remove();
                            showObjects(objWrapper);
                        }
                    });
                }else{
                    item.remove();
                    showObjects(objWrapper);
                }
            };
        }
        
        const body = uiFactory.createElement({
            classList: 'inventory-window-body',
            parent: wrap
        });
    
        if(item.renderer === 'dom'){
            const newItem = item.getObject().cloneNode(true);
            body.appendChild(newItem);
            newItem.id = newItem.id+'_objectMenu_inventory';
            newItem.style.color = item.getValue('color');
            newItem.classList = '';
            newItem.style.top = '';
            newItem.style.left = '';
            newItem.style.position = '';
            newItem.style.transform = 'rotate(0)';
    
        }else if(item.renderer === '454'){
            const pos = item.getPositional();
            if(item._film){
                const info = item._getFilm(item._film);
                const box = info.getFrameBox(item._frame);
                const img = info.bitmap;
                const canv = uiFactory.createElement({
                    type: 'canvas',
                    id: item.id+'_objectMenu_inventory',
                    parent: body
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
            }
        }else {
            body.innerHTML = tr.get(`Preview of this object isn't possible`);
        }
    }

    function applyFilter(f){
        if(!f) filter = '';
        else filter = f;
    }

    function renderObjects(){
        oWrap.innerHTML = '';
        for(let i in items){
            const item = items[i];
            if(item.name.toLowerCase().includes(filter.toLowerCase())){
                showObject(item);
            }
        }
    }

    function getVisibleObjects(){
        const arr = [];
        for(let i in items){
            const item = items[i];
            if(item.name.toLowerCase().includes(filter.toLowerCase())){
                arr.push(item);
            }
        }
        return arr;
    }

    return {
        renderObjects,
        applyFilter,
        getVisibleObjects
    }
}

function showObjects(objWrapper){
    objWrapper.innerHTML = '';
    const items = Engine.ObjectManager.objects;


    objWrapper = uiFactory.createElement({
        classList: 'inventory-window-body-grid',
        parent: objWrapper
    });
    const buttonWrapper = uiFactory.createElement({
        parent: objWrapper,
        classList: 'inventory-window-body-page-button-wrapper'
    });
    uiFactory.createElement({
        parent: buttonWrapper,
        classList: 'inventory-window-body-page-item-button',
        innerHTML: tr.get('Remove All')
    }).onclick = ()=>{
        if(bb.fastGet('settings','Show Prompt On Actions')){
            bb.fastSet('events','openPrompt',{
                title: tr.get('Remove All Snapshot'),
                description: `${tr.get('If you accept')} *${tr.get('every')}* ${tr.get('object')} ${tr.get('will get removed')}`,
                onAccept: ()=>{
                    clearAllObjects();
                    showObjects(objWrapper);
                }
            });
        }else{
            clearAllObjects();
            showObjects(objWrapper);
        }
    };
    uiFactory.createElement({
        parent: buttonWrapper,
        classList: 'inventory-window-body-page-item-button',
        innerHTML: tr.get('Remove Visible')
    }).onclick = ()=>{
        if(bb.fastGet('settings','Show Prompt On Actions')){
            bb.fastSet('events','openPrompt',{
                title: tr.get('Remove All Snapshot'),
                description: `${tr.get('If you accept')} *${tr.get('every')}* ${tr.get('object')} ${tr.get('will get removed')}`,
                onAccept: ()=>{
                    clearObjects(renderManager.getVisibleObjects());
                    showObjects(objWrapper);
                }
            });
        }else{
            clearObjects(renderManager.getVisibleObjects());
            showObjects(objWrapper);
        }
    };


    const renderManager = new RenderManager(objWrapper,items);

    const searchBox = uiFactory.createElement({
        parent: buttonWrapper,
        type: 'input',
        inputType: 'text',
        id: 'inventory-filter-object-search'
    });
    searchBox.style.borderRadius = '5px';
    searchBox.placeholder = 'Search';




    searchBox.oninput = ()=>{
        renderManager.applyFilter(searchBox.value);
        renderManager.renderObjects();
    };

    renderManager.renderObjects();

}