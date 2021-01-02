function onPageLoaded(){
    document.getElementById('goToEditorBut').addEventListener('click',()=>{
        window.location.pathname = '/editor.html';
    })
}

window.onload = onPageLoaded;