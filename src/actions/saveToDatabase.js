import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

import Engine from '../Engine.js'
import comManager from '../utils/serverCommunication.js'

function saveToDatabase(){
    let tableName = comManager.tableName;
    let objects = Engine.ObjectManager.objects;
    
    console.log(objects);
    
    comManager.clearTable(tableName).then( () => {
        for(let i in objects){
            let obj = objects[i];
            for(let i in obj.getValues()){
                obj.setValue(i,obj.getValue(i));
            }
            
            comManager.updateItemToTable(tableName,{
                key: "id",
                value: '"'+i+'"',
            },
            [
                {
                    name: 'id',
                    type: 'TEXT',
                    value: obj.id
                },
                {
                    name: 'objectInfo',
                    type: 'TEXT',
                    value: obj.toString().replaceAll("'","~").replaceAll('"',"'")
                }
            ])
        }    
    })
}

bb.fastInstall('actions','saveToDatabase',saveToDatabase)