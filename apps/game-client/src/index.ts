import { Client, Room } from 'colyseus.js';
import Phaser from 'phaser';

// custom scene class
export class GameScene extends Phaser.Scene {
  private client!: Client;
  private room!: Room;

  private playerEntities: { [sessionId: string]: Phaser.Types.Physics.Arcade.ImageWithDynamicBody };

  private currentPlayer!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private remoteRef!: Phaser.GameObjects.Rectangle;

  private inputPayload: { left: boolean; right: boolean; up: boolean; down: boolean };
  private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('main');
    this.playerEntities = {};
    this.inputPayload = { left: false, right: false, up: false, down: false };
  }

  preload() {
    // preload scene
    this.load.image('ship_0001', 'https://cdn.glitch.global/3e033dcd-d5be-4db4-99e8-086ae90969ec/ship_0001.png');
  }

  async create() {
    this.cursorKeys = this.input.keyboard!.createCursorKeys();

    this.client = new Client('http://localhost:2567');
    // create scene
    console.log('Joining room...');

    try {
      this.room = await this.client.joinOrCreate('my_room');

      this.room.state.players.onAdd((player: any, sessionId: any) => {
        const entity = this.physics.add.image(player.x, player.y, 'ship_0001');
        this.playerEntities[sessionId] = entity;

        if (sessionId === this.room.sessionId) {
          // this is the current player!
          // (we are going to treat it differently during the update loop)
          this.currentPlayer = entity;

          // remoteRef is being used for debug only
          this.remoteRef = this.add.rectangle(0, 0, entity.width, entity.height);
          this.remoteRef.setStrokeStyle(1, 0xff0000);

          player.onChange(() => {
            this.remoteRef.x = player.x;
            this.remoteRef.y = player.y;
          });
        } else {
          //
          // all remote players are here!
          // (same as before, we are going to interpolate remote players)
          //
          // listening for server updates
          player.onChange(() => {
            //
            // do not update local position immediately
            // we're going to LERP them during the render loop.
            //
            entity.setData('serverX', player.x);
            entity.setData('serverY', player.y);
          });
        }
      });

      this.room.state.players.onRemove((player: any, sessionId: any) => {
        const entity = this.playerEntities[sessionId];
        if (entity) {
          entity.destroy();
          delete this.playerEntities[sessionId];
        }
      });

      console.log('Joined successfully!');
    } catch (e: any) {
      console.error(e);
    }
  }

  update(time: number, delta: number): void {
    // game loop
    if (!this.room) return;

    this.inputPayload.left = this.cursorKeys.left.isDown;
    this.inputPayload.right = this.cursorKeys.right.isDown;
    this.inputPayload.up = this.cursorKeys.up.isDown;
    this.inputPayload.down = this.cursorKeys.down.isDown;
    this.room.send('0', this.inputPayload);

    const velocity = 2;
    if (this.inputPayload.left) {
      this.currentPlayer.x -= velocity;
    } else if (this.inputPayload.right) {
      this.currentPlayer.x += velocity;
    }

    if (this.inputPayload.up) {
      this.currentPlayer.y -= velocity;
    } else if (this.inputPayload.down) {
      this.currentPlayer.y += velocity;
    }

    for (const sessionId in this.playerEntities) {
      // do not interpolate the current player
      if (sessionId === this.room.sessionId) {
        continue;
      }

      // interpolate all other player entities
      const entity = this.playerEntities[sessionId];
      const { serverX, serverY } = entity.data.values;

      entity.x = Phaser.Math.Linear(entity.x, serverX, 0.2);
      entity.y = Phaser.Math.Linear(entity.y, serverY, 0.2);
    }
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
