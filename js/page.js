import {
    staticStrings
} from "./staticString.js"

import {
    createAndAppendCSS
} from "./UIfactory.js"

export class Page{
    wrapperName = staticStrings.pageWrapper;

    constructor(_derivedPage){
        this.derivedPage = _derivedPage;
        this.name = staticStrings.pageNames.noPage;
    }

    print = function(){
        console.log(this.name + " and was derived from " + this.derivedPage);
    }

    loadRequirements = function(requirements){
        if(requirements.CSS){
            for(let fileURL in requirements.CSS){
                createAndAppendCSS(requirements.CSS[fileURL]);
            }
        }
    }

}