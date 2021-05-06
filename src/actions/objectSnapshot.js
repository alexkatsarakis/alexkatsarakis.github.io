import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

if(Engine.hasManager('SnapshotManager')){
    bb.fastInstall('actions','snapshotObject',()=>Engine.SnapshotManager.snapshotObject());
    bb.fastInstall('actions','getAllSnapshots',()=>Engine.SnapshotManager.getAllSnapshots());
}