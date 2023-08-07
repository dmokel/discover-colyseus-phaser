import Phaser from 'phaser';

const phaserEvents = new Phaser.Events.EventEmitter();

enum Event {
  PLAYER_JOINED = 'player-joined',
  PLAYER_UPDATED = 'player-updated',
  PLAYER_LEFT = 'player-left',
  MY_PLAYER_NAME_CHANGE = 'my-player-name-change',
}

export { Event, phaserEvents };
