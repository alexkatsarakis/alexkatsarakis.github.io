class BlackboardComponent{
  name;
  itemMap = {};
  constructor(name){
    this.name = name;
  }

  installItem(itemName,value){
    if(this.itemMap[itemName] !== undefined) return false;
    this.itemMap[itemName] = value;
    return true;
  }

  removeItem(itemName){
    if(this.itemMap[itemName] === undefined) return false;
    delete this.itemMap[itemName];
    return true;
  }

  getItem(itemName){
    if(this.itemMap[itemName] === undefined) return false;
    return this.itemMap[itemName];
  }

  setItem(itemName,value){
    this.itemMap[itemName] = value; 
  }

  size(){
    return this.itemMap.length;
  }

  print(){
    console.log(this.name,this.itemMap);
  }

}

class Blackboard {
  componentMap = {};

  installComponent(componentName){
    if(this.componentMap[componentName] !== undefined)return false;
    this.componentMap[componentName] = new BlackboardComponent(componentName);
    return true;
  }

  removeComponent(componentName){
    if(this.componentMap[componentName] === undefined)return false;
    delete this.componentMap[componentName];
    return true;
  }

  fastInstall(componentName,itemName,value){
    if(this.componentMap[componentName] === undefined)this.installComponent(componentName);
    this.componentMap[componentName].installItem(itemName,value);
  }

  fastSet(componentName,itemName,value){
    if(this.componentMap[componentName] === undefined)this.installComponent(componentName);
    this.componentMap[componentName].setItem(itemName,value);
  }

  fastGet(componentName,itemName){
    if(this.componentMap[componentName] === undefined)return false;
    return this.componentMap[componentName].getItem(itemName);
  }

  getComponent(componentName){
    return this.componentMap[componentName];
  }

  print(){
    for(let component in this.componentMap){
      this.componentMap[component].print();
    }
  }

}

const bb = new Blackboard();

// export default blackboard;