export default {
    name: 'Animations',
    svgIcon: '<svg class="inventory-window-tabs-item-icon" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m482 301.266v-222.532c17.232-4.452 30-20.13 30-38.734 0-22.056-17.944-40-40-40-18.604 0-34.282 12.767-38.734 30h-222.531c-4.453-17.233-20.131-30-38.735-30-22.056 0-40 17.944-40 40 0 18.604 12.768 34.282 30 38.734v222.532c-17.232 4.452-30 20.13-30 38.734 0 22.056 17.944 40 40 40 18.604 0 34.282-12.767 38.734-30h66.266c5.522 0 10-4.478 10-10s-4.478-10-10-10h-66.266c-3.626-14.035-14.699-25.108-28.734-28.734v-222.532c14.035-3.626 25.108-14.699 28.734-28.734h222.531c3.626 14.035 14.699 25.108 28.734 28.734v222.532c-14.035 3.626-25.108 14.699-28.734 28.734h-66.265c-5.522 0-10 4.478-10 10s4.478 10 10 10h66.266c4.452 17.233 20.13 30 38.734 30 22.056 0 40-17.944 40-40 0-18.604-12.767-34.282-30-38.734zm-290 38.734c0 11.028-8.972 20-20 20s-20-8.972-20-20 8.972-20 20-20 20 8.972 20 20zm-20-280c-11.028 0-20-8.972-20-20s8.972-20 20-20 20 8.972 20 20-8.971 20-20 20zm280-20c0-11.028 8.972-20 20-20s20 8.972 20 20-8.972 20-20 20-20-8.972-20-20zm20 320c-11.028 0-20-8.972-20-20s8.972-20 20-20 20 8.972 20 20-8.971 20-20 20z"/><circle cx="322" cy="340" r="10"/><path d="m362 190c0-5.522-4.478-10-10-10h-20v-20c0-5.522-4.478-10-10-10s-10 4.478-10 10v20h-20c-5.522 0-10 4.478-10 10s4.478 10 10 10h20v20c0 5.522 4.478 10 10 10s10-4.478 10-10v-20h20c5.523 0 10-4.477 10-10z"/><path d="m89.929 407.929-87 87c-3.905 3.905-3.905 10.237 0 14.143 1.953 1.952 4.512 2.928 7.071 2.928s5.118-.977 7.071-2.929l87-87c3.905-3.905 3.905-10.237 0-14.143-3.906-3.903-10.236-3.903-14.142.001z"/><path d="m209.929 407.929-87 87c-3.905 3.905-3.905 10.237 0 14.143 1.953 1.952 4.512 2.929 7.071 2.929s5.118-.977 7.071-2.929l87-87c3.905-3.905 3.905-10.237 0-14.143-3.906-3.904-10.236-3.904-14.142 0z"/><path d="m89.929 287.929-87 87c-3.905 3.905-3.905 10.237 0 14.143 1.953 1.952 4.512 2.928 7.071 2.928s5.118-.977 7.071-2.929l87-87c3.905-3.905 3.905-10.237 0-14.143-3.906-3.903-10.236-3.903-14.142.001z"/></g></svg>',
    callback: showAnimations,
    clear: removeAllAnimators
}

import Engine from '../../../Engine.js'
import tr from '../../../utils/translator.js'
import uiFactory from '../../../utils/UIFactory.js'
import bb from '../../../utils/blackboard.js'

const FRAnimator = Engine.AnimationManager.getAnimatorCategory('FrameRangeAnimator');
const FRAnimation = Engine.AnimationManager.getAnimationCategory('FrameRangeAnimation');

const animatorsForPreview = [];

function removeAllAnimators(){
    animatorsForPreview.forEach((an)=>an());
}

function createPopUp(film, {id,delay = 90,dx = 0, dy = 0,reps = -1} = {delay: 90,dx: 0, dy: 0,reps: -1}){
    const wrap = document.createElement('div');
    wrap.id = 'animationWorkshopCreateWrapper';
    document.body.appendChild(wrap);

    const popUpCloseBack = document.createElement('div');
    popUpCloseBack.id = 'animationWorkshopCreate_popup_close_back';
    wrap.appendChild(popUpCloseBack);

    const popUp = document.createElement('div');
    popUp.id = 'animationWorkshopCreate_popup';
    wrap.appendChild(popUp);

    const toolbar = document.createElement('div');
    toolbar.id = 'animationWorkshopCreate_popup_toolbar';
    toolbar.innerHTML = tr.get('Animation Workshop');
    popUp.appendChild(toolbar);

    const popUpClose = document.createElement('div');
    popUpClose.id = 'animationWorkshopCreate_popup_close';
    popUpClose.innerHTML = 'X';
    toolbar.appendChild(popUpClose);

    const mainArea = document.createElement('div');
    mainArea.id = 'animationWorkshopCreate_popup_mainarea';
    popUp.appendChild(mainArea);

    const mainAreaCanvas = document.createElement('canvas');
    mainAreaCanvas.id = 'animationWorkshopCreate_popup_mainarea_canvas';
    mainArea.appendChild(mainAreaCanvas);

    const filmArea = document.createElement('div');
    filmArea.id = 'animationWorkshopCreate_popup_filmarea';
    popUp.appendChild(filmArea);

    
    for(let i = 0; i < film.totalFrames; ++i){
        const box = film.getFrameBox(i);
        const preview = document.createElement('canvas');
        const width = filmArea.offsetWidth-2;
        preview.style.width = width;
        preview.style.height = width;
        preview.classList = 'animationWorkshopCreate_popup_filmarea_box';
        const previewCtx = preview.getContext('2d');
        previewCtx.canvas.width = width;
        previewCtx.canvas.height = width;
        previewCtx.drawImage(bb.fastGet('assets',film.bitmap),
        box.x,box.y,box.width,box.height,
        0, 0, width*(box.width/box.height), width);


        filmArea.appendChild(preview);
    }




    const editArea = document.createElement('div');
    editArea.id = 'animationWorkshopCreate_popup_editarea';
    popUp.appendChild(editArea);

    const delayWrapper = document.createElement('div');
    delayWrapper.classList += 'animationWorkshopCreate_popup_editarea_wrap';
    editArea.appendChild(delayWrapper);

    const delaySliderPrompt = document.createElement('div');
    delaySliderPrompt.innerHTML = `${tr.get('Delay')}: ${delay}`;
    delaySliderPrompt.classList += 'animationWorkshopCreate_popup_editarea_prompt';
    delayWrapper.appendChild(delaySliderPrompt);

    const delaySlider = document.createElement('input');
    delaySlider.type = 'range';
    delaySlider.id = 'animationWorkshopCreate_popup_editarea_delaySlider';
    delaySlider.min = '20';
    delaySlider.max = '200';
    delaySlider.step = '1';
    delaySlider.value = delay;
    delaySlider.classList += 'animationWorkshopCreate_popup_editarea_value';
    delayWrapper.appendChild(delaySlider);

    const dxWrapper = document.createElement('div');
    dxWrapper.classList += 'animationWorkshopCreate_popup_editarea_wrap';
    editArea.appendChild(dxWrapper);

    const dxPrompt = document.createElement('div');
    dxPrompt.innerHTML = `${tr.get('Dx')}: `;
    dxPrompt.classList += 'animationWorkshopCreate_popup_editarea_prompt';
    dxWrapper.appendChild(dxPrompt);

    const dxInput = document.createElement('input');
    dxInput.type = 'number';
    dxInput.min = '-50';
    dxInput.max = '50';
    dxInput.step = '1';
    dxInput.value = dx;
    dxWrapper.appendChild(dxInput);    
    
    const dyWrapper = document.createElement('div');
    dyWrapper.classList += 'animationWorkshopCreate_popup_editarea_wrap';
    editArea.appendChild(dyWrapper);

    const dyPrompt = document.createElement('div');
    dyPrompt.innerHTML = `${tr.get('Dy')}: `;
    dyPrompt.classList += 'animationWorkshopCreate_popup_editarea_prompt';
    dyWrapper.appendChild(dyPrompt);

    const dyInput = document.createElement('input');
    dyInput.type = 'number';
    dyInput.min = '-50';
    dyInput.max = '50';
    dyInput.step = '1';
    dyInput.value = dy;
    dyWrapper.appendChild(dyInput);

    const repsWrapper = document.createElement('div');
    repsWrapper.classList += 'animationWorkshopCreate_popup_editarea_wrap';
    editArea.appendChild(repsWrapper);

    const repsPrompt = document.createElement('div');
    repsPrompt.innerHTML = `${tr.get('Repetitions')}: `;
    repsPrompt.classList += 'animationWorkshopCreate_popup_editarea_prompt';
    repsWrapper.appendChild(repsPrompt);

    const repsInput = document.createElement('input');
    repsInput.type = 'number';
    repsInput.min = '-1';
    repsInput.max = '100';
    repsInput.step = '1';
    repsInput.value = reps;
    repsWrapper.appendChild(repsInput);

    const idWrapper = document.createElement('div');
    idWrapper.classList += 'animationWorkshopCreate_popup_editarea_wrap';
    editArea.appendChild(idWrapper);

    const idPrompt = document.createElement('div');
    idPrompt.innerHTML = `${tr.get('Animation')} ID: `;
    idPrompt.classList += 'animationWorkshopCreate_popup_editarea_prompt';
    idWrapper.appendChild(idPrompt);

    const idInput = document.createElement('input');
    idInput.type = 'text';
    idInput.classList = 'animationWorkshopCreate_popup_editarea_value';
    idInput.placeholder = 'my animation';
    if(id){
        idInput.value = id;
        idInput.readOnly = true;
    }
    idWrapper.appendChild(idInput);

    const startAnim = document.createElement('div');
    startAnim.classList = 'animationWorkshopCreate_popup_editarea_button';
    startAnim.innerHTML = tr.get('Reset Position');
    editArea.appendChild(startAnim);

    const replayAnim = document.createElement('div');
    replayAnim.classList = 'animationWorkshopCreate_popup_editarea_button';
    replayAnim.innerHTML = tr.get('Replay Animation');
    editArea.appendChild(replayAnim);

    const createAnim = document.createElement('div');
    createAnim.classList = 'animationWorkshopCreate_popup_editarea_button';
    createAnim.innerHTML = tr.get('Update Animation');
    editArea.appendChild(createAnim);

    if(id){
        const remAnim = document.createElement('div');
        remAnim.classList = 'animationWorkshopCreate_popup_editarea_button';
        remAnim.innerHTML = tr.get('Remove Animation');
        remAnim.style.backgroundColor = 'var(--secondary-color)';
        editArea.appendChild(remAnim);
        remAnim.onclick = ()=>{
            if(bb.fastGet('settings','Show Prompt On Actions')){
                bb.fastSet('events','openPrompt',{
                    title: tr.get('Remove Animation'),
                    description: `${tr.get('If you accept')} ${tr.get('animation')} ${id} ${tr.get('will get removed')}`,
                    onAccept: ()=>{
                        animator.stop();
                        wrap.remove();
                        Engine.AnimationManager.removeAnimation(id);
                        closeInventoryWindow();
                    }
                });
            }else{
                animator.stop();
                wrap.remove();
                Engine.AnimationManager.removeAnimation(id);
                closeInventoryWindow();
            }
        };
    }

    let animator = new FRAnimator();
    let animation = new FRAnimation({
        id: '_prevCreate',
        start: 0,
        end: film.totalFrames - 1,
        dx: Number.parseInt(dxInput.value),
        dy: Number.parseInt(dyInput.value),
        reps: Number.parseInt(repsInput.value),
        delay: Number.parseInt(delaySlider.value)
    });
    const ctx = mainAreaCanvas.getContext('2d');
    ctx.width = mainAreaCanvas.offsetWidth;
    ctx.height = mainAreaCanvas.offsetHeight;
    let firstBox = film.getFrameBox(0);
    let currPos = {
        x:(mainAreaCanvas.width/2) - ((firstBox.width/firstBox.height)*(mainAreaCanvas.height/3)/2),
        y:(mainAreaCanvas.height/2) - ((mainAreaCanvas.height/3)/2)
    };

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
            currPos.x ,
            currPos.y ,
            (firstBox.width/firstBox.height)*(mainAreaCanvas.height/3),
            (mainAreaCanvas.height/3)
        )
    };
    // anim.height*(firstBox.width/firstBox.height), anim.height
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
    delaySlider.addEventListener('change',()=>{
        delaySliderPrompt.innerHTML = `${tr.get('Delay')}: ${escape(delaySlider.value)}`;
        restartAnimation()
    });
    startAnim.addEventListener('click',()=>{
        currPos = {
            x:(mainAreaCanvas.width/2) - ((firstBox.width/firstBox.height)*(mainAreaCanvas.height/3)/2),
            y:(mainAreaCanvas.height/2) - ((mainAreaCanvas.height/3)/2)
        };
    });
    createAnim.addEventListener('click',saveAnimation);
    replayAnim.addEventListener('click',()=>{
        currPos = {
            x:(mainAreaCanvas.width/2) - ((firstBox.width/firstBox.height)*(mainAreaCanvas.height/3)/2),
            y:(mainAreaCanvas.height/2) - ((mainAreaCanvas.height/3)/2)
        };
        restartAnimation();
    });
    popUpClose.addEventListener('click',destroyPopUP);
    popUpCloseBack.addEventListener('click',destroyPopUP);

}


function showAnimations(objWrapper){
    objWrapper.innerHTML = '';
    
    const animations = Engine.AnimationManager.getAllAnimations();
    
    for(let i in animations){
        const animation = animations[i].animation;
        const film = animations[i].film;

        const wrap = uiFactory.createElement({
            classList: 'inventory-window-animationPreview_itemWrapper',
            parent: objWrapper
        });
        const popuplistener = wrap.addEventListener('click',()=>{
            createPopUp(film,{
                id: animation.id,
                dx: animation.dx,
                dy: animation.dy,
                reps: animation.reps,
                delay: animation.delay
            });
        });

        uiFactory.createElement({
            classList: 'inventory-window-animationPreview_objName',
            innerHTML: i,
            parent: wrap
        });

        const body = uiFactory.createElement({
            classList: 'inventory-window-animationPreview_body',
            parent: wrap
        });

        const anim = uiFactory.createElement({
            type: 'canvas',
            classList: 'inventory-window-animationPreview_film',
            parent: body
        });
        const ctx = anim.getContext('2d');
        ctx.canvas.width = anim.offsetWidth;
        ctx.canvas.height = anim.offsetHeight;

        const animator = new FRAnimator();
        const newAnimation = new FRAnimation({
            id: '_prev_'+animation.id,
            start: animation.startFrame,
            end: animation.endFrame,
            reps: -1,
            delay: animation.delay
        });

        animator.onAction = (th)=>{
            const firstBox = film.getFrameBox(th.currentFrame);
            ctx.clearRect(0,0,anim.width,anim.height);
            ctx.drawImage(bb.fastGet('assets',film.bitmap),
                firstBox.x,firstBox.y,firstBox.width,firstBox.height,
                0,0,anim.height*(firstBox.width/firstBox.height), anim.height);
        };

        
    
        animator.start({
            animation: newAnimation,
            timestamp: bb.fastGet('state','gameTime'),
        });


        animatorsForPreview.push(()=>{
            animator.stop();
            wrap.removeEventListener('click',popuplistener);
        });
    }


}