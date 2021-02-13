import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

if(Engine.hasManager('ObjectSnapshotManager')){
    bb.fastInstall('actions','snapshotObject',()=>Engine.ObjectSnapshotManager.snapshotObject());
    bb.fastInstall('actions','getAllSnapshots',()=>Engine.ObjectSnapshotManager.getAllSnapshots());
}