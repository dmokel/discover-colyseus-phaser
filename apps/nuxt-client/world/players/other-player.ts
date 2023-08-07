import Phaser from 'phaser';
import { TextureKeys } from '../constants/texturekeys';
import { Player, sittingShiftData } from './player';

class OtherPlayer extends Player {
  private targetPosition: [number, number];
  private lastUpdateTimestamp?: number;

  private playContainerBody: Phaser.Physics.Arcade.Body;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: TextureKeys,
    playerId: string, // client.sessionId
    name: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, playerId, frame);
    this.targetPosition = [x, y];

    this.playerName.setText(name);
    this.playContainerBody = this.playerContainer.body as Phaser.Physics.Arcade.Body;
    if (!this.playContainerBody) {
      throw new Error('null playerContainer body');
    }
  }

  updateOtherPlayer(field: string, value: number | string | boolean) {
    switch (field) {
      case 'name': {
        if (typeof value === 'string') {
          this.playerName.setText(value);
        }
        break;
      }
      case 'x': {
        if (typeof value === 'number') {
          this.targetPosition[0] = value;
        }
        break;
      }
      case 'y': {
        if (typeof value === 'number') {
          this.targetPosition[1] = value;
        }
        break;
      }
      case 'anim': {
        if (typeof value === 'string') {
          this.anims.play(value, true);
        }
        break;
      }
    }
  }

  destroy(fromScene?: boolean) {
    this.playerContainer.destroy();

    super.destroy(fromScene);
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);

    // if Phaser has not updated the canvas (when the game tab is not active) for more than 1 sec,
    // directly snap player to their current locations
    if (this.lastUpdateTimestamp && t - this.lastUpdateTimestamp > 750) {
      this.lastUpdateTimestamp = t;
      this.x = this.targetPosition[0];
      this.y = this.targetPosition[1];
      this.playerContainer.x = this.targetPosition[0];
      this.playerContainer.y = this.targetPosition[1] - 30;
      return;
    }

    this.lastUpdateTimestamp = t;
    this.setDepth(this.y);

    const currentAnim = this.anims.currentAnim;
    if (!currentAnim) {
      throw new Error('null currentAnim');
    }
    const animParts = currentAnim.key.split('_');
    const animState = animParts[1];
    if (animState === 'sit') {
      const animDir = animParts[2] as 'up' | 'down' | 'left' | 'right';
      const sittingShift = sittingShiftData[animDir];
      // set hardcoded depth (differs between directions) if player sits down
      if (sittingShift) {
        this.setDepth(this.depth + sittingShift[2]);
      }
    }

    const speed = 200; // speed is in unit of pixels per second
    const delta = (speed / 1000) * dt; // minimum distance that a player can move in a frame (dt is in unit of ms)
    let dx = this.targetPosition[0] - this.x;
    let dy = this.targetPosition[1] - this.y;

    // if the player is close enough to the target position, directly snap the player to that position
    if (Math.abs(dx) < delta) {
      this.x = this.targetPosition[0];
      this.playerContainer.x = this.targetPosition[0];
      dx = 0;
    }
    if (Math.abs(dy) < delta) {
      this.y = this.targetPosition[1];
      this.playerContainer.y = this.targetPosition[1] - 30;
      dy = 0;
    }

    // if the player is still far from target position, impose a constant velocity towards it
    let vx = 0;
    let vy = 0;
    if (dx > 0) vx += speed;
    else if (dx < 0) vx -= speed;
    if (dy > 0) vy += speed;
    else if (dy < 0) vy -= speed;

    // it should enable body when create myPlayer instance
    if (!this.body) {
      throw new Error('null MyPlayer Body');
    }
    // update character velocity
    this.setVelocity(vx, vy);
    this.body.velocity.setLength(speed);
    // also update playerNameContainer velocity
    this.playContainerBody.setVelocity(vx, vy);
    this.playContainerBody.velocity.setLength(speed);
  }
}

export { OtherPlayer };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      otherPlayer(
        x: number,
        y: number,
        texture: string,
        palyerId: string, // sessionId
        name: string,
        frame?: string | number
      ): OtherPlayer;
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'otherPlayer',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: TextureKeys,
    palyerId: string,
    name: string,
    frame?: string | number
  ) {
    const sprite = new OtherPlayer(this.scene, x, y, texture, palyerId, name, frame);

    this.existing(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    const collisionScale = [6, 4];
    const spriteBody = sprite.body;
    if (!spriteBody) {
      throw new Error('null sprite body');
    }
    spriteBody
      .setSize(sprite.width * collisionScale[0], sprite.height * collisionScale[1])
      .setOffset(sprite.width * (1 - collisionScale[0]) * 0.5, sprite.height * (1 - collisionScale[1]) * 0.5 + 17);

    return sprite;
  }
);
