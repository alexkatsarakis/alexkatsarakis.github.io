import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

import Engine from '../Engine.js'
import comManager from '../utils/serverCommunication.js'

function createObject(item){
    if(item._category === 'Stage' || item._category === 'Collisions')return;
    let category = Engine.ObjectManager.getConstructor(item._category);
    if(!category || typeof category !== "function"){console.log("There is no category "+item.category)}

    if(item._name !== undefined){
        let it = new category({name:item._name+'A'},item._id+'1');
        let values = item.values;

        if(values.colour.val)it.setColor(values.colour.val);
        it.setPosition(values.x.val,values.y.val);
        for(let a in item.options){
            if(typeof item.options[a] !== "boolean")throw Error('Attributes must be boolean');
            it.setOption(a,item.options[a]);
        }


        for(let v in values){
            if(!it.getValue(v))it.addValue(v,values[v].val);
            else it.setValue(v,values[v].val);
        }

        let events = item.events;
        for(let f in events){
            if(!it.getEvent(f))it.addEvent(f,events[f].val);
            else it.setEvent(f,events[f].val);
        }

        let states = item.states;
        for(let s in states){
            it.addState(s);
        }

        console.log(it);

        it.add();
        if(Engine.PhysicsManager)Engine.PhysicsManager.addToWorld(it);
    }
}

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
                    value: obj.toString().replaceAll('"',"'")
                }
            ])
        }    
    })
}

bb.fastInstall('actions','saveToDatabase',saveToDatabase)