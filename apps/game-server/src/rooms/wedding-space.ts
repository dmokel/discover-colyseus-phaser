import { Dispatcher } from '@colyseus/command';
import { Room } from '@colyseus/core';
import { WeddingSpaceRoomState } from '@voidoor/api-types';
import bcrypt from 'bcrypt';

export class WeddingSpace extends Room<WeddingSpaceRoomState.State> {
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
  }
}
