import { Client, Room } from 'colyseus.js';
import Phaser from 'phaser';

// custom scene class
export class GameScene extends Phaser.Scene {
  private client!: Client;
  private room!: Room;

  private playerEntities: { [sessionId: string]: Phaser.Types.Physics.Arcade.ImageWithDynamicBody };
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
        console.log(`x:${player.x}, y:${player.y}`);
        const entity = this.physics.add.image(player.x, player.y, 'ship_0001');
        this.playerEntities[sessionId] = entity;

        player.onChange(() => {
          // update local position immediately
          console.log(`player: ${JSON.stringify(player)}`);
          entity.x = player.x;
          entity.y = player.y;
        });
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
