import { MapSchema, Schema, type } from '@colyseus/schema';

interface InputData {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  tick: number;
}

class Player extends Schema {
  @type('string') id: string;
  @type('number') x: number;
  @type('number') y: number;
  @type('number') tick: number;

  inputQueue: InputData[] = [];
}

class State extends Schema {
  @type('string') mySynchronizedProperty = 'Hello World';
  @type({ map: Player }) players = new MapSchema<Player>();
}

export { InputData, Player, State };
