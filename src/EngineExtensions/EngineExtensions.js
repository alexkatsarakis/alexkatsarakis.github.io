import Engine from '../Engine.js'

import ObjectSnapshotManager from './ObjectSnapshotManager.js'
Engine.installManager('ObjectSnapshotManager', new ObjectSnapshotManager());

import ClipboardManager from './ClipboardManager.js'
Engine.installManager('ClipboardManager', new ClipboardManager());

import PauseManager from './PauseManager.js'
Engine.installManager('PauseManager', new PauseManager());

import GridManager from './GridManager.js'
const gridManager = new GridManager();
Engine.installManager('GridManager', gridManager);
Engine.app.addLoadFunction(()=>{gridManager.calculateGrid()});