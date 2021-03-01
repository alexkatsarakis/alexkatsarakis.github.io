class BlackboardComponent{
  name;
  itemMap = {};
  watches = {};


  constructor(name){
    this.name = name;
  }

  installWatch(itemName,cb){
    if(this.watches[itemName] === undefined) this.watches[itemName] = [cb];
    else this.watches[itemName].push(cb);
  }

  triggerWatch(itemName){
    if(this.watches[itemName] === undefined)return; // === undefined to avoid conversions
    let callbacks = this.watches[itemName];
    delete this.watches[itemName];
    callbacks.forEach((cb)=>{
      cb(this.itemMap[itemName]);
    });
  }

  installItem(itemName,value){
    if(this.itemMap[itemName] !== undefined) return false; // !== undefined to avoid conversions
    this.itemMap[itemName] = value;
    return true;
  }

  removeItem(itemName){
    if(this.itemMap[itemName] === undefined) return false; // === undefined to avoid conversions
    delete this.itemMap[itemName];
    return true;
  }

  getItem(itemName){
    return this.itemMap[itemName];
  }

  setItem(itemName,value){
    this.itemMap[itemName] = value; 
    this.triggerWatch(itemName);
  }

  size(){
    return this.itemMap.length;
  }

  print(){
    console.log(this.name,this.itemMap,this.watches);
  }

  clear(){
    this.itemMap = {};
    this.watches = {};
  }

}

class Blackboard {
  componentMap = {};

  installComponent(componentName){
    if(this.componentMap[componentName] !== undefined)return undefined;
    this.componentMap[componentName] = new BlackboardComponent(componentName);
    return true;
  }

  removeComponent(componentName){
    if(this.componentMap[componentName] === undefined)return undefined;
    delete this.componentMap[componentName];
    return true;
  }


  installWatch(componentName,itemName,cb){
    if(this.componentMap[componentName] === undefined)return undefined;
    this.componentMap[componentName].installWatch(itemName,cb);
  }

  fastInstall(componentName,itemName,value){
    if(this.componentMap[componentName] === undefined)this.installComponent(componentName);
    this.componentMap[componentName].installItem(itemName,value);
  }

  fastRemove(componentName,itemName){
    if(this.componentMap[componentName] === undefined)return undefined;
    this.componentMap[componentName].removeItem(itemName);
  }

  fastSet(componentName,itemName,value){
    if(this.componentMap[componentName] === undefined)this.installComponent(componentName);
    this.componentMap[componentName].setItem(itemName,value);
  }

  fastGet(componentName,itemName){
    if(this.componentMap[componentName] === undefined)return undefined;
    return this.componentMap[componentName].getItem(itemName);
  }

  invoke(componentName,itemName,args){
    if(this.componentMap[componentName] === undefined)return undefined;
    let func = this.componentMap[componentName].getItem(itemName);
    if(typeof func === 'function'){
      return this.componentMap[componentName].getItem(itemName)(args);
    }
  }

  getComponent(componentName){
    return this.componentMap[componentName];
  }

  print(){
    for(let component in this.componentMap){
      this.componentMap[component].print();
    }
  }

  clear(){
    for(let component in this.componentMap){
      this.componentMap[component].clear();
    }

    for(let component in this.componentMap){
      delete this.componentMap[component];
    }
  }

}

const blackboard = new Blackboard();

export default blackboard;