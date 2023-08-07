import { Command } from '@colyseus/command';
import { Client } from '@colyseus/core';
import { WeddingSpace } from '../wedding-space';

type Payload = {
  client: Client;
  x: number;
  y: number;
  anim: string;
};

class PlayerUpdateCommand extends Command<WeddingSpace, Payload> {
  execute(data: Payload) {
    const { client, x, y, anim } = data;

    const player = this.state.players.get(client.sessionId);
    if (!player) return;

    player.x = x;
    player.y = y;
    player.anim = anim;
  }
}

export { Payload, PlayerUpdateCommand };
