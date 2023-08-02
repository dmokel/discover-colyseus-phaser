import Phaser from 'phaser';
import Preloader from './scenes/preloader';
import World from './scenes/world';

class PhaserController {
  private static singleton: PhaserController;

  constructor() {
    /** empty */
  }

  private async init() {
    /** empty */
  }

  static async getInstance() {
    if (!PhaserController.singleton) {
      PhaserController.singleton = new PhaserController();
      await PhaserController.singleton.init();
    }
    return PhaserController.singleton;
  }

  startWorld(container: HTMLElement) {
    if (!container) throw new Error('you should provide a container used to render Phaser');

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
    config.parent = container;

    return new Phaser.Game(config);
  }
}

export { PhaserController };
