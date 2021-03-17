import Engine from '../../Engine.js';

export default {
    name:'collisionPreview',
    link: './src/UI/collisionPreview/collisionPreview.ahtml',
    cb:onCollisionPreviewLoaded,
    removable: true, 
    loadOnInstall: true
};

function closeCollisionWindow(){
    let items = document.getElementsByClassName('collisionPreview_itemWrapper');
    for(let i = 0;i < items.length; i++){
        items.item(i).remove();
    }
}

function showCollisions(){
    let items = Engine.CollisionManager.getAllCollisions();

    let objWrapper = document.getElementById('collisionPreviewWrapper');
    for(let i in items){
        let wrap = document.createElement('div');
        wrap.classList += 'collisionPreview_itemWrapper';
        objWrapper.appendChild(wrap);

        let title = document.createElement('div');
        title.classList += 'collisionPreview_objName';
        title.innerHTML = i;
        wrap.appendChild(title);
        

        let body = document.createElement('div');
        body.classList += 'collisionPreview_body';
        for(let colWith in items[i]){
            body.innerHTML += " "+colWith;
        }
        wrap.appendChild(body);
    }

    let wrap = document.createElement('div');
    wrap.classList += 'collisionPreview_itemWrapper';
    objWrapper.appendChild(wrap);

    let title = document.createElement('div');
    title.classList += 'collisionPreview_objName';
    title.innerHTML = "Click to create new collision";
    wrap.appendChild(title);
    

    let body = document.createElement('div');
    body.classList += 'collisionPreview_body';
    wrap.appendChild(body);


    let select1 = document.createElement('div');
    select1.classList += 'collisionPreviewCreate_listWrapper';
    body.appendChild(select1);

    let prompt1 = document.createElement('div');
    prompt1.classList += 'collisionPreviewCreate_promptList';
    prompt1.innerHTML = '1st object';
    select1.appendChild(prompt1);

    let list1 = document.createElement('select');
    list1.classList += 'collisionPreviewCreate_list';
    select1.appendChild(list1);

    let select2 = document.createElement('div');
    select2.classList += 'collisionPreviewCreate_listWrapper';
    body.appendChild(select2);

    let prompt2 = document.createElement('div');
    prompt2.classList += 'collisionPreviewCreate_promptList';
    prompt2.innerHTML = '2nd object';
    select2.appendChild(prompt2);

    let list2 = document.createElement('select');
    list2.classList += 'collisionPreviewCreate_list';
    select2.appendChild(list2);

    let createCollision = document.createElement('div');
    createCollision.id = 'collisionPreviewCreate_createCollision';
    createCollision.innerHTML = 'Create Collision';
    body.appendChild(createCollision);

    let aliveItems = Engine.ObjectManager.objects;

    for(let i in aliveItems){
        let name = aliveItems[i].name;
        let id = aliveItems[i].id;
        if(Engine.ObjectManager.isSystemObject(id))continue;
        list1.innerHTML += `<option value=${name}>${name}</option>`;
        list2.innerHTML += `<option value=${name}>${name}</option>`;
    }
    
    createCollision.addEventListener('click',()=>{
        Engine.CollisionManager.installCollision(list1.value,list2.value);
    });

}

function toggleCollisionPreview(){
    let wrapper = document.getElementById('collisionPreviewWrapper');
    let toggleBut = document.getElementById('collisionPreview_makeBig');
    if(wrapper.style.height === '200px'){
        closeCollisionWindow();
        wrapper.innerHTML = '';
        wrapper.style.height = 0;
        toggleBut.style.bottom = '90px';
    }else{
        wrapper.style.height = '200px';
        toggleBut.style.bottom = '200px';
        showCollisions();
    }
}

function onCollisionPreviewLoaded(){
    let toggleBut = document.getElementById('collisionPreview_makeBig');
    toggleBut.addEventListener('click',toggleCollisionPreview)
}