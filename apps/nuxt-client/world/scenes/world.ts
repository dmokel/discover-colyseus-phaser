import { WeddingSpaceRoomState } from '@voidoor/api-types';
import Phaser from 'phaser';
import { createPlayerAnims } from '../anims/playeranims';
import { SceneKeys } from '../constants/scenekeys';
import { TextureKeys } from '../constants/texturekeys';
import '../players/my-player';
import { MyPlayer } from '../players/my-player';
import '../players/other-player';
import { OtherPlayer } from '../players/other-player';
import { Chair } from '../props/chair';
import { Network } from '../services/network';
import { Keyboard, NavKeys } from '../types/keyboard-state';

export default class World extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap;
  private cursors!: NavKeys;

  network!: Network;
  myPlayer!: MyPlayer;

  private otherPlayers!: Phaser.Physics.Arcade.Group;
  private otherPlayerMap = new Map<string, OtherPlayer>();

  constructor() {
    super(SceneKeys.World);

    this.network = new Network();
  }

  registerKeys() {
    if (!this.input.keyboard) {
      throw new Error('null keyboard');
    }
    this.cursors = {
      ...this.input.keyboard?.createCursorKeys(),
      ...(this.input.keyboard?.addKeys('W,S,A,D') as Keyboard),
    };

    this.input.keyboard.disableGlobalCapture();
  }

  disableKeys() {
    if (!this.input.keyboard) {
      throw new Error('null keyboard');
    }
    this.input.keyboard.enabled = false;
  }

  enableKeys() {
    if (!this.input.keyboard) {
      throw new Error('null keyboard');
    }
    this.input.keyboard.enabled = true;
  }

  create() {
    createPlayerAnims(this.anims);

    this.map = this.make.tilemap({ key: TextureKeys.TileMap });

    // add my player into scene, and enable it's physics dynamic body
    this.myPlayer = this.add.myPlayer(705, 500, TextureKeys.Adam, this.network.mySessionId);

    // groundLayer with FloorAndGround
    const FloorAndGround = this.map.addTilesetImage('FloorAndGround', TextureKeys.TilesWall);
    if (!FloorAndGround) {
      throw new Error('null FloorAndGround tielset');
    }
    const groundLayer = this.map.createLayer('Ground', FloorAndGround);
    if (!groundLayer) {
      throw new Error('null Ground Layer');
    }
    groundLayer.setCollisionByProperty({ collides: true });

    // import chair objects from Tiled map to Phaser
    const chairs = this.physics.add.staticGroup({ classType: Chair });
    const chairLayer = this.map.getObjectLayer('Chair');
    if (!chairLayer) {
      throw new Error('null Chair Layer');
    }
    chairLayer.objects.forEach((chairObj) => {
      const chair = this.addObjectFromTiled(chairs, chairObj, TextureKeys.Chairs, 'chair') as Chair;
      chair.propDirection = chairObj.properties[0].value;
    });

    // import other objects from Tiled map to Phaser
    this.addGroupFromTiled('Wall', TextureKeys.TilesWall, 'FloorAndGround', false);
    this.addGroupFromTiled('Objects', TextureKeys.Office, 'Modern_Office_Black_Shadow', false);
    this.addGroupFromTiled('ObjectsOnCollide', TextureKeys.Office, 'Modern_Office_Black_Shadow', true);
    this.addGroupFromTiled('GenericObjects', TextureKeys.Generic, 'Generic', false);
    this.addGroupFromTiled('GenericObjectsOnCollide', TextureKeys.Generic, 'Generic', true);
    this.addGroupFromTiled('Basement', TextureKeys.Basement, 'Basement', true);

    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer });

    this.cameras.main.zoom = 1.5;
    this.cameras.main.startFollow(this.myPlayer, true);

    this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], groundLayer);

    this.registerKeys();
    this.enableKeys();

    this.network.onPlayerJoined(this.handlePlayerJoined, this);
    this.network.onPlayerLeft(this.handlePlayerLeft, this);
    this.network.onPlayerUpdated(this.handlePlayerUpdated, this);
  }

  private addObjectFromTiled(
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: TextureKeys,
    tilesetName: string
  ) {
    if (!object.x || !object.width || !object.y || !object.height || !object.gid) {
      throw new Error('invalid object');
    }

    const actualX = object.x + object.width * 0.5;
    const actualY = object.y - object.height * 0.5;

    const tileset = this.map.getTileset(tilesetName);
    if (!tileset) {
      throw new Error('invalid tileset');
    }

    const obj = group.get(actualX, actualY, key, object.gid - tileset.firstgid).setDepth(actualY);
    return obj;
  }

  private addGroupFromTiled(objectLayerName: string, key: TextureKeys, tilesetName: string, collidable: boolean) {
    const group = this.physics.add.staticGroup();

    const objectLayer = this.map.getObjectLayer(objectLayerName);
    if (!objectLayer) {
      throw new Error(`null object Layer for objectLayerName: ${objectLayerName}`);
    }

    objectLayer.objects.forEach((object) => {
      if (!object.x || !object.width || !object.y || !object.height || !object.gid) {
        throw new Error('invalid object');
      }

      const actualX = object.x + object.width * 0.5;
      const actualY = object.y - object.height * 0.5;

      const tileset = this.map.getTileset(tilesetName);
      if (!tileset) {
        throw new Error('invalid tileset');
      }

      group.get(actualX, actualY, key, object.gid - tileset.firstgid).setDepth(actualY);

      if (this.myPlayer && collidable) {
        this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], group);
      }
    });
  }

  // function to add new player to the otherPlayer group
  private handlePlayerJoined(newPlayer: WeddingSpaceRoomState.Player, sessionId: string) {
    const otherPlayer = this.add.otherPlayer(newPlayer.x, newPlayer.y, TextureKeys.Adam, sessionId, newPlayer.name);
    this.otherPlayers.add(otherPlayer);
    this.otherPlayerMap.set(sessionId, otherPlayer);
  }

  // function to remove the player who left from the otherPlayer group
  private handlePlayerLeft(sessionId: string) {
    if (this.otherPlayerMap.has(sessionId)) {
      const otherPlayer = this.otherPlayerMap.get(sessionId);
      if (!otherPlayer) return;
      console.log('otherPlayer:', JSON.stringify(otherPlayer));
      this.otherPlayers.remove(otherPlayer, true, true);
      this.otherPlayerMap.delete(sessionId);
      // otherPlayer.destroy(true);
    }
  }

  // function to update target position upon receiving player updates
  private handlePlayerUpdated(field: string, value: number | string, sessionId: string) {
    const otherPlayer = this.otherPlayerMap.get(sessionId);
    otherPlayer?.updateOtherPlayer(field, value);
  }

  update(t: number, dt: number) {
    if (this.myPlayer && this.network) {
      this.myPlayer.update(this.cursors, this.network);
    }
  }
}
