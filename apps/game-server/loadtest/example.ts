import { Options, cli } from '@colyseus/loadtest';
import { Client, Room } from 'colyseus.js';

async function example(opts: Options) {
  const client = new Client(opts.endpoint);
  const room: Room = await client.joinOrCreate(opts.roomName);

  console.log('joined successfully!');

  room.onMessage('*', (type, message) => {
    console.log('onMessage:', type, message);
  });

  room.onStateChange((state) => {
    console.log(room.sessionId, 'new state:', state);
  });

  room.onError((err: any) => {
    console.log(room.sessionId, '!! ERROR !!', err.message);
  });

  room.onLeave((code) => {
    console.log(room.sessionId, 'left.');
  });
}

cli(example);
