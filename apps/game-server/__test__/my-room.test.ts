import { ColyseusTestServer, boot } from '@colyseus/testing';
import assert from 'assert';
import { cfg } from '../src/app.config';
import { MyRoomState } from '../src/rooms/schema/my-room-schema';

describe('testing my colyseus app', () => {
  let colyseus: ColyseusTestServer;

  before(async () => {
    colyseus = await boot(cfg);
  });
  after(async () => {
    colyseus.shutdown();
  });

  beforeEach(async () => {
    await colyseus.cleanup();
  });

  it('connecting into a room', async () => {
    // `room` is the server-side Room instance reference.
    const room = await colyseus.createRoom<MyRoomState>('my_room');

    // `client1` is the client-side `Room` instance reference (same as JavaScript SDK)
    const client1 = await colyseus.connectTo(room);

    assert.strictEqual(client1.sessionId, room.clients[0].sessionId);

    await room.waitForNextPatch();
    // because the simulated latency, we should wait for next message in client side
    await client1.waitForNextMessage();

    assert.strictEqual('Hello World', (client1.state.toJSON() as any).mySynchronizedProperty);
  });
});
