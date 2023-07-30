import Phaser from 'phaser';
import Preloader from './scenes/preloader';
import World from './scenes/world';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight + 300,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [Preloader, World],
};

export default new Phaser.Game(config);
