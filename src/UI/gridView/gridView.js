import Engine from '../../Engine.js';

export default {
    name:'gridView',
    link: './src/UI/gridView/gridView.ahtml',
    cb:onGridViewLoaded,
    removable: true, 
    loadOnInstall: false
};

function onGridViewLoaded(){
    const wrapper = document.getElementById('gridView-wrap');
    const stage = Engine.ObjectManager.getObjectByName('Stage');
    const offsetX = stage.getValue('x');
    const offsetY = stage.getValue('y');
    console.log(offsetX,offsetY);
    wrapper.innerHTML = '';
    const grid = Engine.GridManager.getGrid();
    grid.forEach(element => {
        console.log(element);
        const item = document.createElement('div');
        item.classList = 'gridView-v';
        item.style.top    = (element.y - offsetY) +'px';
        item.style.left   = (element.x - offsetX) +'px';
        item.style.width  = element.width+'px';
        item.style.height = element.height+'px';
        wrapper.appendChild(item);
    });
}