import Engine from '../Engine.js'

import SnapshotManager from './SnapshotManager.js'
Engine.installManager('SnapshotManager', new SnapshotManager());

import ClipboardManager from './ClipboardManager.js'
Engine.installManager('ClipboardManager', new ClipboardManager());

import PauseManager from './PauseManager.js'
Engine.installManager('PauseManager', new PauseManager());

import GridManager from './GridManager.js'
Engine.installManager('GridManager', new GridManager());

import DistanceManager from './DistanceManager.js'
Engine.installManager('DistanceManager', new DistanceManager());

import QuantizerManager from './QuantizerManager.js'
Engine.installManager('QuantizerManager', new QuantizerManager());

import TimewarpManager from './timewarp/TimewarpManager.js'
Engine.installManager('TimewarpManager', new TimewarpManager());

import InputAutomationManager from './InputAutomationManager.js'
Engine.installManager('InputAutomationManager', new InputAutomationManager());

import DummyManager from './DummyManager.js'
Engine.installManager('DummyManager', new DummyManager());

// import PhysicsManager from './physics/physics.js'
// Engine.installManager('PhysicsManager', new PhysicsManager());