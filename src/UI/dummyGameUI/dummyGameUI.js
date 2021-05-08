export default {
    name:'dummyGameUI',
    link: './src/UI/dummyGameUI/dummyGameUI.ahtml',
    cb:onDummyGameUILoaded,
    removable: true, 
    loadOnInstall: false
};

function onDummyGameUILoaded(){
    console.log('Dummy UI loaded');

}