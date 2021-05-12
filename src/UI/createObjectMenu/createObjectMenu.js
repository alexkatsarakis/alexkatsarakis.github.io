import bb from '../../utils/blackboard.js'

export default {
    name:'createObjectMenu',
    link: './src/UI/createObjectMenu/createObjectMenu.ahtml',
    cb:onCreateObjectMenuLoaded,
    removable: true, 
    loadOnInstall: true
};


function toggleObjectMenu(){
    const wrapper = document.getElementById('createObjectMenuWrapper');
    const toggleBut = document.getElementById('createObjectMenu_makeBig');
    if(wrapper.style.height === '200px'){
        wrapper.style.height = 0;
        toggleBut.style.bottom = '0';
    }else{
        wrapper.style.height = '200px';
        toggleBut.style.bottom = '200px';
        updateObjectList();
    }
}

function updateObjectList(){
    const items = bb.fastGet('Engine','ObjectManager').constr;
    const objWrapper = document.getElementById('createObjectMenuWrapper');
    objWrapper.innerHTML = '';
    for(let i in items){
        const wrap = document.createElement('div');
        wrap.classList += 'createObjectMenu_itemWrapper';
        objWrapper.appendChild(wrap);

        const title = document.createElement('div');
        title.classList += 'createObjectMenu_objName';
        title.innerHTML = i;
        wrap.appendChild(title);
        

        const body = document.createElement('div');
        body.classList += 'createObjectMenu_body';
        
        const inpNamePrompt = document.createElement('div');
        inpNamePrompt.innerHTML = 'Name:';
        inpNamePrompt.style.width = "20%";
        inpNamePrompt.style.height = '20px';
        inpNamePrompt.style.float = 'left';
        body.appendChild(inpNamePrompt);

        const inpName = document.createElement('input');
        inpName.type = 'text';
        inpName.style.width = "75%";
        inpName.style.height = '20px';
        inpName.placeholder = 'Object name';
        body.appendChild(inpName);


        const createBut = document.createElement('button');
        // body.innerHTML = 'Click to create an object of type '+i;
        createBut.onclick = () => {
            if(inpName.value === '')return;
            bb.fastGet('actions','createObject')({category:i,name:inpName.value,colour:'#ff00ff',position:{x:500,y:500}});
        };
        createBut.innerHTML = 'Create';
        body.appendChild(createBut);


        wrap.appendChild(body);

    }
}

function onCreateObjectMenuLoaded(){
    const toggleBut = document.getElementById('createObjectMenu_makeBig');
    toggleBut.addEventListener('click',toggleObjectMenu)

}