import Phaser from 'phaser';
import { SceneKeys } from '../constants/scenekeys';
import { TextureKeys } from '../constants/texturekeys';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    this.load.tilemapTiledJSON(TextureKeys.TileMap, 'map/map.json');
    this.load.spritesheet(TextureKeys.TilesWall, 'map/FloorAndGround.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet(TextureKeys.Chairs, 'items/chair.png', {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet(TextureKeys.Office, 'tileset/Modern_Office_Black_Shadow.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(TextureKeys.Basement, 'tileset/Basement.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(TextureKeys.Generic, 'tileset/Generic.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.scene.start(SceneKeys.World);
  }
}
