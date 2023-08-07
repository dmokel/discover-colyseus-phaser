import { Dispatcher } from '@colyseus/command';
import { Client, Room } from '@colyseus/core';
import { Message } from '@voidoor/api-types';
import bcrypt from 'bcrypt';
import { Payload, PlayerUpdateCommand } from './commands/player-update-command';
import { WeddingSpaceRoomSchema, WeddingSpaceRoomState } from './schema/wedding-space-schema';

export class WeddingSpace extends Room<WeddingSpaceRoomSchema> {
  private dispatcher = new Dispatcher(this);
  private name: string;
  private description: string;
  private password: string | null = null;

  async onCreate(options: WeddingSpaceRoomState.IRoomData) {
    const { name, description, password, autoDispose } = options;
    this.name = name;
    this.description = description;
    this.autoDispose = autoDispose;

    let hasPassword = false;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(password, salt);
      hasPassword = true;
    }

    this.setMetadata({ name, description, hasPassword });

    this.setState(new WeddingSpaceRoomSchema());

    this.onMessage<Payload>(Message.UPDATE_PLAYER, (client, message) => {
      this.dispatcher.dispatch(new PlayerUpdateCommand(), {
        client,
        x: message.x,
        y: message.y,
        anim: message.anim,
      });
    });
  }

  onJoin(client: Client, options?: any): void | Promise<any> {
    this.state.players.set(client.sessionId, new WeddingSpaceRoomState.Player());
    client.send(Message.SEND_ROOM_DATA, { id: this.roomId, name: this.name, description: this.description });
  }

  onLeave(client: Client, consented?: boolean): void | Promise<any> {
    if (this.state.players.has(client.sessionId)) {
      this.state.players.delete(client.sessionId);
    }
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
    this.dispatcher.stop();
  }
}
