import { Client, Room } from 'colyseus.js';
import Phaser from 'phaser';

// custom scene class
export class GameScene extends Phaser.Scene {
  private client: Client;
  private room: Room;

  preload() {
    // preload scene
  }

  async create() {
    this.client = new Client('http://localhost:2567');
    // create scene
    console.log('Joining room...');

    try {
      this.room = await this.client.joinOrCreate('my_room');
      this.room.state.players.onAdd((player: any, sessionId: any) => {
        console.log('A player has joined! Their unique session id is', sessionId);
      });
      console.log('Joined successfully!');
    } catch (e: any) {
      console.error(e);
    }
  }

  update(time: number, delta: number): void {
    // game loop
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
