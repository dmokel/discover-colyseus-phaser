/**
 * A partial definition of the TMX format in JSON.
 */
interface IMap {
  tilewidth: number; // Width in pixels
  tileheight: number; // Height in pixels
  width: number; // Width in tiles
  height: number; // Height in tiles
  tilesets: ITileSet[];
  layers: ILayer[];
}

/**
 * Tileset used by layers
 */
interface ITileSet {
  name: string;
  columns: number;
  image: string;
  margin: number;
  spacing: number;
  imagewidth: number;
  imageheight: number;
  tilewidth: number;
  tileheight: number;
  tilecount: number;
  firstgid: number;
  tiles: ITile[];
}

interface ITile {
  id: number;
  animation?: ITileAnimFrame[];
  type?: string;
  objectgroup?: ITileObjectGroup;
}

interface ITileAnimFrame {
  duration: number;
  tileid: number;
}

interface ITileObjectGroup {
  x: number;
  y: number;
  name: string;
  draworder: string;
  visible: boolean;
  type: string;
  opacity: number;
}

/**
 * Different layers of the map
 */
interface ILayer {
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number; // In tile unit
  height: number; // In tile unit
  opacity: number;
  visible: boolean;
  data: number[]; // Tiles from left-to-right, top-to-bottom
}

export { ILayer, IMap, ITile, ITileAnimFrame, ITileObjectGroup, ITileSet };
