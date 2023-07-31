import Phaser from 'phaser';
import { SceneKeys } from '../constants/scenekeys';

class Background extends Phaser.Scene {
  private cloud!: Phaser.Physics.Arcade.Group;

  constructor() {
    super(SceneKeys.Background);
  }
}
