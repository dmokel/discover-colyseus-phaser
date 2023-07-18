import { Client, Room } from '@colyseus/core';
import { MyRoomState } from './schema/my-room-schema';

export class MyRoom extends Room {
  onCreate() {
    this.setState(new MyRoomState());

    this.onMessage('type', (client, message) => {
      console.log(`When create, clientId: ${client.sessionId}, message: ${JSON.stringify(message)}`);
    });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, 'joined!');
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left!');
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}
