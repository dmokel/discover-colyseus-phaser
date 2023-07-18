import Phaser from 'phaser';

// custom scene class
export class GameScene extends Phaser.Scene {
  preload() {
    // preload scene
  }

  create() {
    // create scene
  }

  update(time: number, delta: number): void {
    // game loop
  }
}

// game config
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#b6d53c',
  parent: 'phaser-example',
  physics: { default: 'arcade' },
  pixelArt: true,
  scene: [GameScene],
};

// instantiate the game
export default new Phaser.Game(config);
