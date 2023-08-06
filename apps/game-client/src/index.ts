import { MyRoomState } from '@voidoor/api-types';
import { Client, Room } from 'colyseus.js';
import Phaser from 'phaser';

// custom scene class
export class GameScene extends Phaser.Scene {
  private room!: Room<MyRoomState.State>;
  private debugFPS!: Phaser.GameObjects.Text;

  private playerEntities: { [sessionId: string]: Phaser.Types.Physics.Arcade.ImageWithDynamicBody };

  private currentPlayer!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private remoteRef!: Phaser.GameObjects.Rectangle;

  private inputPayload: { left: boolean; right: boolean; up: boolean; down: boolean; tick: number };
  private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;

  private elapsedTime: number;
  private fixedTimeStep: number;
  private currentTick: number;

  constructor() {
    super('main');
    this.playerEntities = {};
    this.inputPayload = { left: false, right: false, up: false, down: false, tick: 0 };

    this.elapsedTime = 0;
    this.fixedTimeStep = 1000 / 60;
    this.currentTick = 0;
  }

  preload() {
    // preload scene
    this.load.image('ship_0001', 'https://cdn.glitch.global/3e033dcd-d5be-4db4-99e8-086ae90969ec/ship_0001.png');
  }

  async create() {
    this.cursorKeys = this.input.keyboard!.createCursorKeys();
    this.debugFPS = this.add.text(4, 4, '', { color: '#ff0000' });

    console.log('Joining room...');

    await this.connect();

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

    this.cameras.main.setBounds(0, 0, 800, 600);

    console.log('Joined successfully!');
  }

  async connect() {
    const connectionStatusText = this.add
      .text(0, 0, 'Trying to connect with the server...')
      .setStyle({ color: '#ff0000' })
      .setPadding(4);

    const client = new Client('http://localhost:2567');

    try {
      this.room = await client.joinOrCreate('my_room');
      connectionStatusText.destroy();
    } catch (e: any) {
      connectionStatusText.text = 'Could not connect with the server.';
    }
  }

  update(time: number, delta: number): void {
    // game loop
    //
    // It is more practical and simple to understand “ticks per second”
    // than “milliseconds per frame” when dealing with determinism.
    // https://learn.colyseus.io/phaser/4-fixed-tickrate.html#fixed-tick-rate
    //
    // during the update() loop, we are going to allow having multiple ticks on a single frame, if needed.
    //

    // skip loop if not connected yet.
    if (!this.currentPlayer) return;

    this.elapsedTime += delta;
    while (this.elapsedTime >= this.fixedTimeStep) {
      this.elapsedTime -= this.fixedTimeStep;
      this.fixedTick(time, this.fixedTimeStep);
    }

    this.debugFPS.text = `Frame rate: ${this.game.loop.actualFps}`;
  }

  fixedTick(time: number, delta: number) {
    this.currentTick++;

    const playerRef = this.room.state.players.get(this.room.sessionId);
    if (!playerRef) {
      throw new Error('invalid sessionId');
    }
    const ticksBehind = this.currentTick - playerRef.tick;
    console.log({ ticksBehind });

    this.inputPayload.left = this.cursorKeys.left.isDown;
    this.inputPayload.right = this.cursorKeys.right.isDown;
    this.inputPayload.up = this.cursorKeys.up.isDown;
    this.inputPayload.down = this.cursorKeys.down.isDown;
    this.inputPayload.tick = this.currentTick;
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
