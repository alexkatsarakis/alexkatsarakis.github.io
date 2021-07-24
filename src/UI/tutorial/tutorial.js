import bb from '../../utils/blackboard.js'

export default {
    name:'tutorial',
    link: './src/UI/tutorial/tutorial.ahtml',
    cb: onTutorialLoaded,
    removable: true, 
    loadOnInstall: false
};

function TutorialAPI(){
    const wrap = document.getElementById('tutorial-wrap');
    wrap.style.maxHeight = '0';
    const titleDom = document.getElementById('tutorial-title');
    const descDom = document.getElementById('tutorial-description');
    const closeDom = document.getElementById('tutorial-close');

    function setContent({title,description,index,length}){
        titleDom.innerHTML = `${title} (${index}/${length})`;
        descDom.innerHTML = description;
        wrap.style.maxHeight = '500px';
        bb.installWatch('events','newContent',setContent);
    }

    function finishTutorial(){
        wrap.style.maxHeight = '0';
        bb.installWatch('events','finishTutorial',finishTutorial);
    }

    closeDom.onclick = ()=>{
        bb.fastSet('events','finishTutorial','closed');
    }

    return {
        setContent,
        finishTutorial
    }

}

function onTutorialLoaded(){
    const API = new TutorialAPI();
    bb.installWatch('events','newContent',API.setContent);
    bb.installWatch('events','finishTutorial',API.finishTutorial);
    bb.fastSet('events','startTutorial',1);
}