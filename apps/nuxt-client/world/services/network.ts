import { IRoomData, Message, RoomType, WeddingSpaceRoomState } from '@voidoor/api-types';
import { Client, Room } from 'colyseus.js';
import { useRoomsStore } from '../../stores/index';
import { Event, phaserEvents } from '../events/event-center';

class Network {
  private client: Client;
  private lobby!: Room;
  private room?: Room<WeddingSpaceRoomState.State>;

  mySessionId!: string;

  constructor() {
    const roomStore = useRoomsStore();
    this.client = new Client('ws://127.0.0.1:2567');
    this.joinLobbyRoom().then(() => {
      console.log('success join lobby room');
      roomStore.setLobbyJoined({ lobbyJoined: true });
      // TODO temp logic
      this.joinCustomRoom().then(() => {
        console.log('success join custom room');
      });
    });
  }

  async joinLobbyRoom() {
    this.lobby = await this.client.joinOrCreate(RoomType.Lobby);

    this.lobby.onMessage('rooms', (rooms) => {
      console.log('new rooms:', rooms);
    });
    this.lobby.onMessage('+', ([roomId, room]) => {
      console.log(`add a new room ${JSON.stringify(room)} with id ${roomId}`);
    });
    this.lobby.onMessage('-', (roomId) => {
      console.log(`delete a room with id ${roomId}`);
    });
  }

  async joinCustomRoom() {
    this.room = await this.client.joinOrCreate(RoomType.Custom);
    this.initialize();
  }

  async createCustom(roomData: IRoomData) {
    const { name, description, password, autoDispose } = roomData;
    this.room = await this.client.create(RoomType.Custom, { name, description, password, autoDispose });
    this.initialize();
  }

  // set up all network listeners before the game starts
  initialize() {
    if (!this.room) return;

    this.lobby.leave();

    this.mySessionId = this.room.sessionId;

    this.room.state.players.onAdd((player, sessionId) => {
      if (sessionId === this.mySessionId) return;
      console.log(`add player ${JSON.stringify(player)} with sessionId: ${sessionId}`);

      // track changes on every child object inside the players MapSchema
      player.listen('name', (name) => {
        // if (name !== '') {
        //   phaserEvents.emit(Event.PLAYER_JOINED, player, sessionId);
        // }
        phaserEvents.emit(Event.PLAYER_JOINED, player, sessionId);
      });
      player.listen('x', (x) => {
        // console.log(`x: ${x}, preX: ${preX}`);
        phaserEvents.emit(Event.PLAYER_UPDATED, 'x', x, sessionId);
      });
      player.listen('y', (y) => {
        // console.log(`y: ${y}, preY: ${preY}`);
        phaserEvents.emit(Event.PLAYER_UPDATED, 'y', y, sessionId);
      });
      player.listen('anim', (anim) => {
        // console.log(`anim: ${anim}, preAnim: ${preAnim}`);
        phaserEvents.emit(Event.PLAYER_UPDATED, 'anim', anim, sessionId);
      });
    });

    this.room.state.players.onRemove((player, sessionId) => {
      console.log(`remove player ${JSON.stringify(player)} with sessionId: ${sessionId}`);
      phaserEvents.emit(Event.PLAYER_LEFT, sessionId);
    });

    this.room.onMessage(Message.SEND_ROOM_DATA, (msg) => {
      console.log('send room data: ', msg);
    });
  }

  // method to register event listener and call back function when a player joined
  onPlayerJoined(callback: (Player: WeddingSpaceRoomState.Player, sessionId: string) => void, context?: any) {
    phaserEvents.on(Event.PLAYER_JOINED, callback, context);
  }

  // method to register event listener and call back function when a player left
  onPlayerLeft(callback: (sessionId: string) => void, context?: any) {
    phaserEvents.on(Event.PLAYER_LEFT, callback, context);
  }

  // method to register event listener and call back function when a player updated
  onPlayerUpdated(callback: (field: string, value: number | string, sessionId: string) => void, context?: any) {
    phaserEvents.on(Event.PLAYER_UPDATED, callback, context);
  }

  updatePlayer(currentX: number, currentY: number, currentAnim: string) {
    if (!this.room) {
      throw new Error('null room instance');
    }
    this.room.send(Message.UPDATE_PLAYER, { x: currentX, y: currentY, anim: currentAnim });
  }
}

export { Network };
