export default function dragElement(elmnt,ev) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  dragMouseDown();

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.move(-pos1,-pos2);

  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}