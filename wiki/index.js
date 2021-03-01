import bb from './blackboard.js'

bb.fastInstall('Page','currentlyShowing', 'Architecture/Engine Architecture');

import TableOfContentManager from './TableOfContent.js'

new TableOfContentManager('dev');

class ContentPageManager {
    _currentlyShowing


    constructor(){
        bb.installWatch('Page','currentlyShowing',(newP)=>this.swapPage(newP));
        this.swapPage('Architecture/Macro-Architecture');        
    }
    
    readTextFile(file,onFinish){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = () => {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    onFinish(allText);
                }else{
                    onFinish('');
                }
            }
        }
        rawFile.send(null);
    }

    swapPage(newPage){
        if(!newPage || newPage === this._currentlyShowing){
            bb.installWatch('Page','currentlyShowing',(newP)=>this.swapPage(newP));
            return;
        }
        this._currentlyShowing = newPage;
        console.log(newPage);

        const wrapper = document.getElementById('content-wrapper');
        wrapper.innerHTML = '';

        this.readTextFile('./wiki/'+newPage+'.html',(pageContent) => {
            wrapper.insertAdjacentHTML('beforeend',pageContent);
        })


        bb.installWatch('Page','currentlyShowing',(newP)=>this.swapPage(newP));
    }

}

const contentPageManager = new ContentPageManager();
bb.print();

document.getElementById('navbar-dev').onclick = ()=>{
    new TableOfContentManager('dev');
}

document.getElementById('navbar-user').onclick = ()=>{
    new TableOfContentManager('user');
}