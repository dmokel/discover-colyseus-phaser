import Phaser from 'phaser';
import { PlayerBehavior } from '../constants/playerbehavior';
import { TextureKeys } from '../constants/texturekeys';
import { Chair } from '../props/chair';
import { Network } from '../services/network';
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
    playerId: string, // client.sessionId
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

  update(cursors: NavKeys, network: Network) {
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
        const currentAnim = this.anims.currentAnim;
        if (!currentAnim) {
          throw new Error('null currentAnim');
        }
        if (vx !== 0 || vy !== 0) network.updatePlayer(this.x, this.y, currentAnim.key);
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
            network.updatePlayer(this.x, this.y, newAnim);
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

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      myPlayer(x: number, y: number, texture: string, id: string, frame?: string | number): MyPlayer;
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'myPlayer',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: TextureKeys,
    id: string,
    frame?: string | number
  ) {
    const sprite = new MyPlayer(this.scene, x, y, texture, id, frame);

    this.existing(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    const collisionScale = [0.5, 0.2];
    const spriteBody = sprite.body;
    if (!spriteBody) {
      throw new Error('null sprite body');
    }
    spriteBody
      .setSize(sprite.width * collisionScale[0], sprite.height * collisionScale[1])
      .setOffset(sprite.width * (1 - collisionScale[0]) * 0.5, sprite.height * (1 - collisionScale[1]));

    return sprite;
  }
);
