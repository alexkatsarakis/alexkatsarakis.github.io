import Engine from '../../Engine.js';

export default {
    name:'gridView',
    link: './src/UI/gridView/gridView.ahtml',
    cb:onGridViewLoaded,
    removable: true, 
    loadOnInstall: false
};

function onGridViewLoaded(){
    let wrapper = document.getElementById('gridView-wrap');
    let stage = Engine.ObjectManager.getObjectByName('Stage');
    let offsetX = stage.getValue('x');
    let offsetY = stage.getValue('y');
    console.log(offsetX,offsetY);
    wrapper.innerHTML = '';
    let grid = Engine.GridManager.getGrid();
    grid.forEach(element => {
        console.log(element);
        let item = document.createElement('div');
        item.classList = 'gridView-v';
        item.style.top    = (element.y - offsetY) +'px';
        item.style.left   = (element.x - offsetX) +'px';
        item.style.width  = element.width+'px';
        item.style.height = element.height+'px';
        wrapper.appendChild(item);
    });
}