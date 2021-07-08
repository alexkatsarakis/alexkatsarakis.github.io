import env from '../Engine/renderer/EnvironmentObject.js'

export default function dragElement(elmnt,ev) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  dragMouseDown(ev);

  const ratio = env._aspectRatio;

  function dragMouseDown(e) {
    e = e || window.event;
    if(e instanceof TouchEvent){    
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
    }else{
      e.preventDefault();
    }
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.ontouchend = closeDragElement;
    document.ontouchmove = elementDrag;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    if(e instanceof TouchEvent){    
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
    }else{
      e.preventDefault();
    }

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    if(e.ctrlKey){
      elmnt.move(0,-pos2*ratio);
    } else if(e.shiftKey) {
      elmnt.move(-pos1*ratio,0);
    }else{
      elmnt.move(-pos1*ratio,-pos2*ratio);
    }

  }

  function closeDragElement() {
    document.ontouchend = null;
    document.ontouchmove = null;

    document.onmouseup = null;
    document.onmousemove = null;
  }
}