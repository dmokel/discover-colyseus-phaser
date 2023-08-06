import { RoomType } from '@voidoor/api-types';
import { Client, Room } from 'colyseus.js';

class Network {
  private client: Client;
  private lobby!: Room;

  constructor() {
    this.client = new Client('ws://127.0.0.1:2567');
    this.joinLobbyRoom().then(() => {
      console.log('success join lobby romm');
    });
  }

  async joinLobbyRoom() {
    this.lobby = await this.client.joinOrCreate(RoomType.Lobby);

    this.lobby.onMessage('rooms', (rooms) => {
      console.log('new rooms:', rooms);
    });
    this.lobby.onMessage('+', ([roomId, room]) => {
      console.log(`add a new romm with id ${roomId}, the room: ${room}`);
    });
    this.lobby.onMessage('-', (roomId) => {
      console.log(`add a romm with id ${roomId}`);
    });
  }
}

export { Network };
