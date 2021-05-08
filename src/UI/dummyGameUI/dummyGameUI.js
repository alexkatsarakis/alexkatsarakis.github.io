export default {
    name:'dummyGameUI',
    link: './src/UI/dummyGameUI/dummyGameUI.ahtml',
    cb:onDummyGameUILoaded,
    removable: true, 
    loadOnInstall: true
};

function onDummyGameUILoaded(){
    console.log('Dummy UI loaded');

}