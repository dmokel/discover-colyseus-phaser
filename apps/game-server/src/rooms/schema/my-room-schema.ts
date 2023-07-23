import { MapSchema, Schema, type } from '@colyseus/schema';

export interface InputData {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  tick: number;
}

export class Player extends Schema {
  @type('string') id: string;
  @type('number') x: number;
  @type('number') y: number;
  @type('number') tick: number;

  inputQueue: InputData[] = [];
}

export class MyRoomState extends Schema {
  @type('string') mySynchronizedProperty = 'Hello World';
  @type({ map: Player }) players = new MapSchema<Player>();
}
