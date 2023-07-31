import { PropKeys } from '../constants/propkeys';
import { Prop } from './prop';

class Chair extends Prop {
  propDirection?: string;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    this.propKey = PropKeys.Chair;
  }

  onOverlapDialog() {
    this.setDialogBox('Press E to sit');
  }
}

export { Chair };
