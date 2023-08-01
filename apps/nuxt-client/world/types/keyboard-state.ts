import Phaser from 'phaser';

type Keyboard = {
  W: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
};

type NavKeys = Keyboard & Phaser.Types.Input.Keyboard.CursorKeys;

export { Keyboard, NavKeys };
