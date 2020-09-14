import bb from '../utils/blackboard.js'

bb.fastInstall('actions','downloadScript',()=>{
    let toSave = JSON.stringify(localStorage);

    var textFileAsBlob = new Blob([toSave], {type:'text/plain'}); 
    var downloadLink = document.createElement("a");
    downloadLink.download = "localstorage.txt";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
})


bb.fastInstall('actions','loadScript',()=>{
    let uploadLink = document.createElement('input');
    uploadLink.id = "loadFile";
    uploadLink.type = 'file';
    uploadLink.addEventListener('change',readFile);
    uploadLink.click();
    
    function readFile(){
        const reader = new FileReader()
        reader.onload = event => {
            let text = JSON.parse(event.target.result)
            for(let i in text){
                localStorage.setItem(i,text[i]);
                // console.log(i);
            }
            // localStorage = text;
            console.log(text);
        }
        reader.onerror = error => reject(error)
        reader.readAsText(uploadLink.files[0]) 
    }

})