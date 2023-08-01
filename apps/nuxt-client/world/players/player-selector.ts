import Phaser from 'phaser';
import { PlayerBehavior } from '../constants/playerbehavior';
import { MyPlayer } from './my-player';

class PlayerSelector extends Phaser.GameObjects.Zone {
  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height);

    scene.physics.add.existing(this);
  }

  udpate(player: MyPlayer) {
    // no need to update player selection while sitting
    if (player.playerBehavior === PlayerBehavior.Sitting) {
      return;
    }

    // update player selection box position so that it's always in front of the player
  }
}

export { PlayerSelector };
