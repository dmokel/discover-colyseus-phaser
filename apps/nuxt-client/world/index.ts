import Phaser from 'phaser';
import Preloader from './scenes/preloader';
import World from './scenes/world';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [Preloader, World],
};

export default new Phaser.Game(config);
