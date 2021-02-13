

// const serverPrefix = 'https://thesis-server.glitch.me/database/';
const serverPrefix = 'http://localhost:3000/database/'

function httpGetAsync(type,url,data,callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
            callback(xmlHttp.responseText);
        
    }
    xmlHttp.open(type, url , true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(data);
}

function Promisify(f) {
    return (type,url,data) => new Promise((resolve, reject) => {
        f(type,url,data,resolve);
    });
}

// httpGetAsync(console.log)
const requestToServer = Promisify(httpGetAsync);

class CommunicationManager {

    constructor(){
        this._tableName = '';
    }

    set tableName(tn){
        if(this._tableName) return;
        this._tableName = tn;
    }

    get tableName(){
        return this._tableName;
    }

    getTable(name,cb){
        requestToServer('GET',serverPrefix+name).then( (res) => cb(res));
    }

    createTable(name, structure){
        structure = JSON.stringify(structure);
        requestToServer('POST',serverPrefix+'create/'+name,structure).then( (res) => console.log(res))
    }

    addItemToTable(name,value){
        console.log(value)
        value = JSON.stringify(value);
        requestToServer('POST',serverPrefix+'addItem/'+name,value).then( (res) => console.log(res))
    }

    updateItemToTable(name,ident,value){
        requestToServer('POST',serverPrefix+'updateItem/'+name,JSON.stringify({value:value,ident:ident})).then( (res) => console.log(res))
    }

    clearTable(name){
        return requestToServer('POST',serverPrefix+'clearTable/'+name);
    }

}

let comMan = new CommunicationManager();

export default comMan;

let struc = [
    {
        name: 'id',
        type: 'TEXT PRIMARY KEY',
    },
    {
        name: 'objectInfo',
        type: 'TEXT',
    }
];


comMan.createTable('superMarioReal',struc)

// comMan.addItemToTable('aaaa',struc);
// comMan.getTable('superMario');

// comMan.updateItemToTable('aaaa',{key:'AFAFAFA',value:'"222222"'},struc);