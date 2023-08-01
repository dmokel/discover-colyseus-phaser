import Phaser from 'phaser';
import { PlayerBehavior } from '../constants/playerbehavior';
import { TextureKeys } from '../constants/texturekeys';
import { Chair } from '../props/chair';
import { NavKeys } from '../types/keyboard-state';
import { Player } from './player';

class MyPlayer extends Player {
  private playerContainerBody: Phaser.Physics.Arcade.Body;
  private chainOnSit?: Chair;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: TextureKeys,
    playerId: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, playerId, frame);
    this.playerContainerBody = this.playerContainer.body as Phaser.Physics.Arcade.Body;
    if (!this.playerContainerBody) {
      throw new Error('null playerContainer body');
    }
  }

  setPlayerName(name: string) {
    this.playerName.setText(name);
  }

  setPlayerTexture(texture: TextureKeys) {
    this.playerTexture = texture;
    this.anims.play(`${this.playerTexture}_idle_down`);
  }

  update(cursors: NavKeys) {
    switch (this.playerBehavior) {
      case PlayerBehavior.Idle: {
        const speed = 200;
        let vx = 0;
        let vy = 0;

        if (cursors.left?.isDown || cursors.A?.isDown) {
          vx -= speed;
        }
        if (cursors.right?.isDown || cursors.D?.isDown) {
          vx += speed;
        }
        if (cursors.up?.isDown || cursors.W?.isDown) {
          vy -= speed;
          this.setDepth(this.y); // change player.depth if player.y changes
        }
        if (cursors.down?.isDown || cursors.S?.isDown) {
          vy += speed;
          this.setDepth(this.y); // change player.depth if player.y changes
        }

        // update character setVelocity
        // it should enable body when create myPlayer instance
        if (!this.body) {
          throw new Error('null MyPlayer Body');
        }
        this.setVelocity(vx, vy);
        this.body.velocity.setLength(speed);
        this.playerContainerBody.setVelocity(vx, vy);
        this.playerContainerBody.velocity.setLength(speed);

        // update animation according to velocity
        // TODO send new location and anim to server
        if (vx > 0) {
          this.play(`${this.playerTexture}_run_right`, true);
        } else if (vx < 0) {
          this.play(`${this.playerTexture}_run_left`, true);
        } else if (vy > 0) {
          this.play(`${this.playerTexture}_run_down`, true);
        } else if (vy < 0) {
          this.play(`${this.playerTexture}_run_up`, true);
        } else {
          // prevents idle animation keeps getting called
          const currentAnim = this.anims.currentAnim;
          if (!currentAnim) {
            throw new Error('null currentAnim');
          }
          const parts = currentAnim.key.split('_');
          parts[1] = 'idle';
          const newAnim = parts.join('_');
          if (currentAnim.key !== newAnim) {
            this.play(newAnim, true);
            // TODO send new location and anim to server
          }
        }

        break;
      }
      case PlayerBehavior.Sitting: {
        break;
      }
    }
  }
}

export { MyPlayer };
