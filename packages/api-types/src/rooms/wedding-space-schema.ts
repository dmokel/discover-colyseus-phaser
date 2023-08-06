import { MapSchema, Schema, type } from '@colyseus/schema';

interface IRoomData {
  name: string;
  description: string;
  password: string | null;
  autoDispose: boolean;
}

class Player extends Schema {
  @type('string') name = '';
  @type('number') x = 705;
  @type('number') y = 500;
  @type('string') anim = 'adam_idle_down';
  @type('boolean') readyToConnect = false;
}

class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();
}

export { IRoomData, Player, State };
