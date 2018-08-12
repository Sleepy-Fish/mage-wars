import map01 from '../data/maps/map01';
import 'pixi-tilemap';

export default class Map{
    constructor(container){
        this.container = container;
        this.textures = [
            PIXI.utils.TextureCache["grass"],
            PIXI.utils.TextureCache["brick"],
        ]
        this.boundingBoxes = [];

        this.map = new PIXI.tilemap.CompositeRectTileLayer(0,this.textures);
        this.map.x = 0;
        this.map.y = 0;
        let rows = map01.split('\n');
        for(let y in rows){
            let row = rows[y];
            if(row){
                let tiles = row.split(',');
                for(let x in tiles){
                    let tile = tiles[x];
                    if(tile) {
                        let tileTexture = this.textures[tile[0]];
                        let tilePassable = tile[1]==='0';
                        this.map.addFrame(tileTexture, x*64,y*64);
                        if(!tilePassable){
                            this.boundingBoxes.push(new PIXI.Rectangle(x*64,y*64,64,64));
                        }
                    }
                }
            }
        }
        this.container.addChild(this.map);
    }
}