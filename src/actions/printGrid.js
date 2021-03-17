import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

if(Engine.hasManager("GridManager")){
    function printGrid(){
        console.log(Engine.GridManager.getGrid());
    }
    bb.fastInstall('actions','printGrid',printGrid)
}
    
