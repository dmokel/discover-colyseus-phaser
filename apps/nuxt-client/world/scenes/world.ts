import Phaser from 'phaser';
import { SceneKeys } from 'world/constants/scenekeys';
import { TextureKeys } from 'world/constants/texturekeys';

export default class World extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap;

  constructor() {
    super(SceneKeys.World);
  }

  create() {
    this.map = this.make.tilemap({ key: TextureKeys.TileMap });
    const FloorAndGround = this.map.addTilesetImage('FloorAndGround', TextureKeys.TilesWall);
    if (!FloorAndGround) {
      throw new Error('null FloorAndGround tielset');
    }

    this.map.createLayer('Ground', FloorAndGround);
  }

  update(t: number, dt: number) {
    /** empty */
  }
}
