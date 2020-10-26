import bb from '../utils/blackboard.js'

import soundManager from './soundManager.js'

bb.fastInstall('sound','addSound',(tag,url)=>soundManager.addSound(tag,url));
bb.fastInstall('sound','removeSound',(tag)=>soundManager.removeSound(tag));
bb.fastInstall('sound','getSounds',()=>{return soundManager.getSounds()});
bb.fastInstall('sound','playSound',(tag)=>soundManager.playSound(tag));
bb.fastInstall('sound','playBackground',(tag)=>soundManager.playSoundOnRepeat(tag));
bb.fastInstall('sound','stopSound',(tag)=>soundManager.stopSound(tag));
bb.fastInstall('sound','stopBackground',(tag)=>soundManager.stopSoundOnRepeat(tag));
bb.fastInstall('sound','stopAllSounds',(tag)=>soundManager.stopAllSounds(tag));