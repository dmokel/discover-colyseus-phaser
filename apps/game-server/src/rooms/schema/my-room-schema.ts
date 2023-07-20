import { MapSchema, Schema, type } from '@colyseus/schema';

export class Player extends Schema {
  @type('string') id: string;
  @type('number') x: number;
  @type('number') y: number;

  inputQueue: any[] = [];
}

export class MyRoomState extends Schema {
  @type('string') mySynchronizedProperty = 'Hello World';
  @type({ map: Player }) players = new MapSchema<Player>();
}
