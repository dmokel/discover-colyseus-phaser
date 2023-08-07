import { RoomType } from '@voidoor/api-types';
import { RoomAvailable } from 'colyseus.js';
import { defineStore } from 'pinia';

/**
 * Colyseus' real time room list always includes the public lobby so we have to remove it manually.
 */
const isCustomRoom = (room: RoomAvailable) => {
  return room.name === RoomType.Custom;
};

const useRoomsStore = defineStore('room', {
  state: () => ({
    lobbyJoined: false,
    roomJoined: false,
    roomId: '',
    roomName: '',
    roomDescription: '',
    availableRooms: new Array<RoomAvailable>(),
  }),
  actions: {
    setLobbyJoined(payload: { lobbyJoined: boolean }) {
      this.lobbyJoined = payload.lobbyJoined;
    },
    setRoomJoined(payload: { roomJoined: boolean }) {
      this.roomJoined = payload.roomJoined;
    },
    setJoinedRoomData(payload: { id: string; name: string; description: string }) {
      this.roomId = payload.id;
      this.roomName = payload.name;
      this.roomDescription = payload.description;
    },
    setAvailableRooms(payload: RoomAvailable[]) {
      this.availableRooms = payload.filter((room) => isCustomRoom(room));
    },
    addAvailableRooms(payload: { roomId: string; room: RoomAvailable }) {
      if (!isCustomRoom(payload.room)) return;
      const roomIndex = this.availableRooms.findIndex((room) => room.roomId === payload.roomId);
      if (roomIndex !== -1) {
        this.availableRooms[roomIndex] = payload.room;
      } else {
        this.availableRooms.push(payload.room);
      }
    },
    removeAvailableRooms(payload: { roomId: string }) {
      this.availableRooms = this.availableRooms.filter((room) => room.roomId !== payload.roomId);
    },
  },
});

export { useRoomsStore };
