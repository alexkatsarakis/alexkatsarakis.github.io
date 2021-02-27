import Engine from '../../Engine.js';
import bb from '../../utils/blackboard.js'

export default {
    name: 'animationPreview',
    link: './src/UI/animationPreview/animationPreview.ahtml',
    cb: onAnimationPreviewLoaded, 
    removable: true, 
    loadOnInstall: true
};



const FRAnimator = Engine.AnimationManager.getAnimatorCategory('FrameRangeAnimator');
const FRAnimation = Engine.AnimationManager.getAnimationCategory('FrameRangeAnimation');

function createPopUp(film){
    let wrap = document.createElement('div');
    wrap.id = 'animationPreviewCreateWrapper';
    document.body.appendChild(wrap);

    let popUpCloseBack = document.createElement('div');
    popUpCloseBack.id = 'animationPreviewCreate_popup_close_back';
    wrap.appendChild(popUpCloseBack);

    let popUp = document.createElement('div');
    popUp.id = 'animationPreviewCreate_popup';
    wrap.appendChild(popUp);

    let toolbar = document.createElement('div');
    toolbar.id = 'animationPreviewCreate_popup_toolbar';
    toolbar.innerHTML = 'Animation Workshop';
    popUp.appendChild(toolbar);

    let popUpClose = document.createElement('div');
    popUpClose.id = 'animationPreviewCreate_popup_close';
    popUpClose.innerHTML = 'X';
    toolbar.appendChild(popUpClose);

    let mainArea = document.createElement('div');
    mainArea.id = 'animationPreviewCreate_popup_mainarea';
    popUp.appendChild(mainArea);

    let mainAreaCanvas = document.createElement('canvas');
    mainAreaCanvas.id = 'animationPreviewCreate_popup_mainarea_canvas';
    mainArea.appendChild(mainAreaCanvas);

    let filmArea = document.createElement('div');
    filmArea.id = 'animationPreviewCreate_popup_filmarea';
    popUp.appendChild(filmArea);

    
    for(let i = 0; i < film.totalFrames; ++i){
        let box = film.getFrameBox(i);
        let preview = document.createElement('canvas');
        let width = filmArea.offsetWidth-2;
        preview.style.width = width;
        preview.style.height = width;
        preview.classList = 'animationPreviewCreate_popup_filmarea_box';
        let previewCtx = preview.getContext('2d');
        previewCtx.canvas.width = width;
        previewCtx.canvas.height = width;
        previewCtx.drawImage(bb.fastGet('assets',film.bitmap),
        box.x,box.y,box.width,box.height,
        0, 0, width*(box.width/box.height), width);


        filmArea.appendChild(preview);
    }




    let editArea = document.createElement('div');
    editArea.id = 'animationPreviewCreate_popup_editarea';
    popUp.appendChild(editArea);

    let delayWrapper = document.createElement('div');
    delayWrapper.classList += 'animationPreviewCreate_popup_editarea_wrap';
    editArea.appendChild(delayWrapper);

    let delaySliderPrompt = document.createElement('div');
    delaySliderPrompt.innerHTML = 'Delay: ';
    delaySliderPrompt.classList += 'animationPreviewCreate_popup_editarea_prompt';
    delayWrapper.appendChild(delaySliderPrompt);

    let delaySlider = document.createElement('input');
    delaySlider.type = 'range';
    delaySlider.id = 'animationPreviewCreate_popup_editarea_delaySlider';
    delaySlider.min = '20';
    delaySlider.max = '200';
    delaySlider.step = '1';
    delaySlider.value = '90';
    delaySlider.classList += 'animationPreviewCreate_popup_editarea_value';
    delayWrapper.appendChild(delaySlider);

    let dxWrapper = document.createElement('div');
    dxWrapper.classList += 'animationPreviewCreate_popup_editarea_wrap';
    editArea.appendChild(dxWrapper);

    let dxPrompt = document.createElement('div');
    dxPrompt.innerHTML = 'Dx: ';
    dxPrompt.classList += 'animationPreviewCreate_popup_editarea_prompt';
    dxWrapper.appendChild(dxPrompt);

    let dxInput = document.createElement('input');
    dxInput.type = 'number';
    dxInput.min = '-50';
    dxInput.max = '50';
    dxInput.step = '1';
    dxInput.value = '0';
    dxWrapper.appendChild(dxInput);    
    
    let dyWrapper = document.createElement('div');
    dyWrapper.classList += 'animationPreviewCreate_popup_editarea_wrap';
    editArea.appendChild(dyWrapper);

    let dyPrompt = document.createElement('div');
    dyPrompt.innerHTML = 'Dy: ';
    dyPrompt.classList += 'animationPreviewCreate_popup_editarea_prompt';
    dyWrapper.appendChild(dyPrompt);

    let dyInput = document.createElement('input');
    dyInput.type = 'number';
    dyInput.min = '-50';
    dyInput.max = '50';
    dyInput.step = '1';
    dyInput.value = '0';
    dyWrapper.appendChild(dyInput);

    let repsWrapper = document.createElement('div');
    repsWrapper.classList += 'animationPreviewCreate_popup_editarea_wrap';
    editArea.appendChild(repsWrapper);

    let repsPrompt = document.createElement('div');
    repsPrompt.innerHTML = 'Repetitions: ';
    repsPrompt.classList += 'animationPreviewCreate_popup_editarea_prompt';
    repsWrapper.appendChild(repsPrompt);

    let repsInput = document.createElement('input');
    repsInput.type = 'number';
    repsInput.min = '-1';
    repsInput.max = '100';
    repsInput.step = '1';
    repsInput.value = '-1';
    repsWrapper.appendChild(repsInput);

    let idWrapper = document.createElement('div');
    idWrapper.classList += 'animationPreviewCreate_popup_editarea_wrap';
    editArea.appendChild(idWrapper);

    let idPrompt = document.createElement('div');
    idPrompt.innerHTML = 'Animation ID: ';
    idPrompt.classList += 'animationPreviewCreate_popup_editarea_prompt';
    idWrapper.appendChild(idPrompt);

    let idInput = document.createElement('input');
    idInput.type = 'text';
    idInput.classList = 'animationPreviewCreate_popup_editarea_value';
    idInput.placeholder = 'my animation';
    idWrapper.appendChild(idInput);

    let startAnim = document.createElement('div');
    startAnim.id = 'animationPreviewCreate_popup_editarea_play';
    startAnim.innerHTML = 'Reset Position';
    editArea.appendChild(startAnim);

    let createAnim = document.createElement('div');
    createAnim.id = 'animationPreviewCreate_popup_editarea_create';
    createAnim.innerHTML = 'Create Animation';
    editArea.appendChild(createAnim);

    let animator = new FRAnimator();
    let animation = new FRAnimation({
        id: '_prevCreate',
        start: 0,
        end: film.totalFrames - 1,
        dx: 0,
        dy: 0,
        reps: -1,
        delay: 90
    });
    let ctx = mainAreaCanvas.getContext('2d');
    ctx.width = mainAreaCanvas.width;
    ctx.height = mainAreaCanvas.height;
    let firstBox = film.getFrameBox(0);
    let currPos = {x:(mainAreaCanvas.width/2) - (firstBox.width*2/2),y:(mainAreaCanvas.height/2) - (firstBox.height*2/2)};

    animator.onAction = (th)=>{
        firstBox = film.getFrameBox(th.currentFrame);
        currPos.x += th.animation.dx;
        currPos.y += th.animation.dy;
        if(currPos.x > mainAreaCanvas.width)
            currPos.x = -firstBox.width;
        else if(currPos.x + firstBox.width < 0)
            currPos.x = mainAreaCanvas.width-firstBox.width;
        if(currPos.y > mainAreaCanvas.height)
            currPos.y = -firstBox.height;
        else if(currPos.y + firstBox.height < 0)
            currPos.y = mainAreaCanvas.height-firstBox.height;
        ctx.clearRect(0,0,mainAreaCanvas.width,mainAreaCanvas.height);
        ctx.drawImage(bb.fastGet('assets',film.bitmap),
            firstBox.x,firstBox.y,firstBox.width,firstBox.height,
            currPos.x ,currPos.y ,firstBox.width*2,firstBox.height*2)
    };

    animator.start({
        animation: animation,
        timestamp: bb.fastGet('state','gameTime'),
    });

    function destroyPopUP(){
        animator.stop();
        wrap.remove();
    }

    function restartAnimation(){
        if(!animator.hasFinished())animator.stop();
        animation = new FRAnimation({
            id: '_prevCreate',
            start: 0,
            end: film.totalFrames - 1,
            dx: Number.parseInt(dxInput.value),
            dy: Number.parseInt(dyInput.value),
            reps: Number.parseInt(repsInput.value),
            delay: Number.parseInt(delaySlider.value)
        });
        animator.start({
            animation: animation,
            timestamp: bb.fastGet('state','gameTime'),
        });
    }

    function saveAnimation(){
        if(idInput.value !== ""){
            Engine.AnimationManager.registerNewAnimation(new FRAnimation({
                id: idInput.value,
                start: 0,
                end: film.totalFrames - 1,
                dx: Number.parseInt(dxInput.value),
                dy: Number.parseInt(dyInput.value),
                reps: Number.parseInt(repsInput.value),
                delay: Number.parseInt(delaySlider.value)
            }),film.id);
            destroyPopUP();
        }
    }

    dxInput.addEventListener('change',restartAnimation);
    dyInput.addEventListener('change',restartAnimation);
    repsInput.addEventListener('change',restartAnimation);
    delaySlider.addEventListener('change',restartAnimation);
    startAnim.addEventListener('click',()=>{currPos = {x:(mainAreaCanvas.width/2) - (firstBox.width*2/2),y:(mainAreaCanvas.height/2) - (firstBox.height*2/2)};});
    createAnim.addEventListener('click',saveAnimation);
    popUpClose.addEventListener('click',destroyPopUP);
    popUpCloseBack.addEventListener('click',destroyPopUP);

}


let animatorsForPreview = [];

function showAnimations(){
    let items = Engine.AnimationManager.getAllFilms();

    let objWrapper = document.getElementById('animationPreviewWrapper');
    objWrapper.innerHTML = '';
    for(let i in items){
        let wrap = document.createElement('div');
        wrap.classList += 'animationPreview_itemWrapper';
        objWrapper.appendChild(wrap);
        let popuplistener = wrap.addEventListener('click',()=>{
            createPopUp(items[i]);
        })

        let title = document.createElement('div');
        title.classList += 'animationPreview_objName';
        title.innerHTML = i;
        wrap.appendChild(title);
        

        let body = document.createElement('div');
        body.classList += 'animationPreview_body';

        let anim = document.createElement('canvas');
        anim.classList += 'animationPreview_film';
        let ctx = anim.getContext('2d');
        
        let animator = new FRAnimator();
        let animation = new FRAnimation({
            id: '_prev_'+i,
            start: 0,
            end: items[i].totalFrames - 1,
            reps: -1,
            delay: 100
        })

        animator.onAction = (th)=>{
            let firstBox = items[i].getFrameBox(th.currentFrame);
            ctx.clearRect(0,0,anim.width,anim.height);
            ctx.drawImage(bb.fastGet('assets',items[i].bitmap),
                firstBox.x,firstBox.y,firstBox.width,firstBox.height,
                (anim.width/2) - (firstBox.width*5/2),(anim.height/2) - (firstBox.height*5/2),firstBox.width*5,firstBox.height*5)
        };

        
    
        animator.start({
            animation: animation,
            timestamp: bb.fastGet('state','gameTime'),
        })

        body.appendChild(anim);

        wrap.appendChild(body);


        animatorsForPreview.push(()=>{
            animator.stop();
            wrap.removeEventListener('click',popuplistener);
        });
    }
}

function removeAllAnimators(){
    animatorsForPreview.forEach((an)=>an());
}

function toggleAnimationPreview(){
    let wrapper = document.getElementById('animationPreviewWrapper');
    let toggleBut = document.getElementById('animationPreview_makeBig');
    if(wrapper.style.height === '200px'){
        removeAllAnimators();
        wrapper.innerHTML = '';
        wrapper.style.height = 0;
        toggleBut.style.bottom = '40px';
    }else{
        wrapper.style.height = '200px';
        toggleBut.style.bottom = '200px';
        showAnimations();
    }
}

function onAnimationPreviewLoaded(){

    let toggleBut = document.getElementById('animationPreview_makeBig');
    toggleBut.addEventListener('click',toggleAnimationPreview)
}