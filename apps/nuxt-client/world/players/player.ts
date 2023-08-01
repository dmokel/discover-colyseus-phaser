import Phaser from 'phaser';
import { PlayerBehavior } from '../constants/playerbehavior';
import { TextureKeys } from '../constants/texturekeys';

class Player extends Phaser.Physics.Arcade.Sprite {
  private playerDialogBubble: Phaser.GameObjects.Container;
  private timeoutId?: number;

  playerId: string;
  playerTexture: TextureKeys;
  playerBehavior = PlayerBehavior.Idle;
  readyToConnect = false;
  // videoConnected = false;
  playerName: Phaser.GameObjects.Text;
  playerContainer: Phaser.GameObjects.Container;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: TextureKeys,
    playerId: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.playerId = playerId;
    this.playerTexture = texture;

    this.setDepth(this.y);

    this.anims.play(`${this.playerTexture}_idle_down`);

    this.playerContainer = this.scene.add.container(this.x, this.y - 30).setDepth(5000);

    // add dialogBubble to playerContainer
    this.playerDialogBubble = this.scene.add.container().setData(5000);
    this.playerContainer.add(this.playerDialogBubble);

    // add playerName to playerContainer
    this.playerName = this.scene.add
      .text(0, 0, '')
      .setFontFamily('Arial')
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5);
    this.playerContainer.add(this.playerName);

    this.scene.physics.world.enable(this.playerContainer);
    const playContainerBody = this.playerContainer.body as Phaser.Physics.Arcade.Body;
    const collisionScale = [0.5, 0.2];
    playContainerBody
      .setSize(this.width * collisionScale[0], this.height * collisionScale[1])
      .setOffset(-8, this.width * (1 - collisionScale[1] + 6));
  }

  updateDialogBubble(text: string) {
    this.clearDialogBubble();

    // preprocessing for dialog bubble text (maximum 70 characters)
    const dialogBubbleText = text.length <= 70 ? text : text.substring(0, 70).concat('...');

    const innerText = this.scene.add
      .text(0, 0, dialogBubbleText, { wordWrap: { width: 165, useAdvancedWrap: true } })
      .setFontFamily('Arial')
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5);

    // set dialogBox slightly larger than the text in it
    const innerTextHeight = innerText.height;
    const innerTextWidth = innerText.width;
    innerText.setY(-innerTextHeight / 2 - this.playerName.height / 2);

    const dialogBoxWidth = innerTextWidth + 10;
    const dialogBoxHeight = innerTextHeight + 3;
    const dialogBoxX = innerText.x - innerTextWidth / 2 - 5;
    const dialogBoxY = innerText.y - innerTextHeight / 2 - 2;

    this.playerDialogBubble.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(dialogBoxX, dialogBoxY, dialogBoxWidth, dialogBoxHeight, 3)
        .lineStyle(1, 0x000000, 1)
        .strokeRoundedRect(dialogBoxX, dialogBoxY, dialogBoxWidth, dialogBoxHeight, 3)
    );
    this.playerDialogBubble.add(innerText);

    // After 6 seconds, clear the dialog bubble
    this.timeoutId = window.setTimeout(() => {
      this.clearDialogBubble();
    }, 6000);
  }

  private clearDialogBubble() {
    clearTimeout(this.timeoutId);
    this.playerDialogBubble.removeAll(true);
  }
}

export { Player };
