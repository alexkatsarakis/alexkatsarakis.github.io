# This project is part of Alexandros Katsarakis' Master Thesis

### Title: Interactive Programmable Game Environment for Blockly


Done from Machine:
- [X] [Sound](#Sound)
- [X] [Scripting](#Scripting)
- [X] [Physics](#Physics)
- [X] [Collisions](#Collisions)
- [ ] ObjectManager

### Scripting 
##### Source Code @[src/scripting]:
- scripting.js (binds project and scripting)
Currently Included scripting mechanisms:
    - blockly
    - vanilla JS
    - Python (pyodide)
- {scriptingMechanisms}.js
    Every scripting mechanisms installs the following functions
    1) currentScriptAsText()
    2) currentScriptAsCode()
    3) executeCode(code:string)
    4) executeText(text:string)
    5) clear()
    6) clearAndLoadFromText(text:string)
    5) injectInDiv(div:DOMElement)

##### Example:
```js
bb.fastGet('scripting','injectInDiv')(document.getElementById('languageDiv'));
...
let code = bb.fastGet('scripting','currentScriptAsCode')();
bb.fastGet('scripting','executeCode')(code);
...
```
##### Dependencies:
None, since the scripting mechanisms are totally isolated from all the other components and doesn't interact with any other component.



### Physics 
##### Source Code @[src/physics]:
- physics.js (binds project and physics)
Currently Included physics mechanisms:
    - matter
- {scriptingMechanisms}.js
    Every physics mechanisms installs the following functions
    1) addToWorld(obj)
    2) removeFromWorld(obj)
    3) force(obj:Object,pos:{x,y},force:{x,y})
    4) move(obj:Object,pos:{x,y})
    5) update()

##### Example:
```js
bb.fastGet('physics','addToWorld')(player);
...
bb.fastGet('physics','move')(player,{1,0});
...
bb.fastGet('physics','update')();
...
```
##### Dependencies:
- Dependent to Object.
Uses: bb.fastGet('liveObjects',obj) to update position on update.


### Sound 
##### Source Code @[src/sound]:
- sound.js (binds project and soundManager.js)
    1) addSound(tag:string, url:string)
    2) removeSound(tag:string)
    3) getSounds()
    4) playSound(tag:string)
    5) playBackground(tag:string)
    6) stopSound(tag:string)
    7) stopBackground(tag:string)
    8) stopAllSounds()
- soundManager.js
    - Saves sounds and play on request
    - Totally independent from the project

##### Example:
```js
...
bb.fastGet('sound','addSound')('tag','url');
...
bb.fastGet('sound','playSoundOnRepeat')('tag');
...
```

##### Dependencies:
None, since the sound manager is totally isolated from all the other components and doesn't interact with any other component.

### Collisions 
##### Source Code @[src/collisions]:
- sound.js (binds project and collisionsManager.js)
    1) removeCollision(objID1:string, objID2:string)
    2) setCollision(obj1ID:string, obj2ID:string,codeAsText:string)
    3) getAllCollisions()
    4) getCollisions(objID:string)
    5) getCollision(objID1:string, objID2:string)
    6) checkAndInvoke(arrOfObj: ArrayOfObjects)
- collisionsManager.js
    - Saves sounds and play on request
    - Totally independent from the project

##### Example:
```js
...
bb.fastGet('collisions','addSound')('id1','id2','console.log("collided")');
...
bb.fastGet('collisions','checkAndInvoke')([...obects]);
...
```

##### Dependencies:
- Dependent to Object. (CAN BE CHANGED if in check and invoke changes the argument)
Because it's the only way to translate IDs to Names and needs the position