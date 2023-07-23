import { Client, Room } from '@colyseus/core';
import { InputData, MyRoomState, Player } from './schema/my-room-schema';

export class MyRoom extends Room<MyRoomState> {
  private elapsedTime: number;
  private fixedTimeStep: number;

  constructor() {
    super();
    this.elapsedTime = 0;
    this.fixedTimeStep = 1000 / 60;
  }

  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage('type', (client, message) => {
      console.log(`clientId: ${client.sessionId}, message: ${JSON.stringify(message)}`);
    });

    this.onMessage(0, (client, data) => {
      const player = this.state.players.get(client.sessionId);
      //
      // not handle the input data immediately
      //
      player.inputQueue.push(data);
    });

    this.setSimulationInterval((deltaTime) => {
      this.elapsedTime += deltaTime;

      while (this.elapsedTime >= this.fixedTimeStep) {
        this.elapsedTime -= this.fixedTimeStep;
        this.fixedTick(this.fixedTimeStep);
      }
    });
  }

  onJoin(client: Client, options: any, auth: any) {
    console.log(client.sessionId, 'joined!');

    const mapWidth = 800;
    const mapHeight = 600;

    const player = new Player();
    player.id = client.sessionId;
    player.x = Math.random() * mapWidth;
    player.y = Math.random() * mapHeight;

    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left!');
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }

  fixedTick(deltaTime: number) {
    const velocity = 2;

    this.state.players.forEach((player) => {
      let input: InputData;

      while ((input = player.inputQueue.shift())) {
        if (input.left) {
          player.x -= velocity;
        } else if (input.right) {
          player.x += velocity;
        }

        if (input.up) {
          player.y -= velocity;
        } else if (input.down) {
          player.y += velocity;
        }

        player.tick = input.tick;
      }
    });
  }
}
