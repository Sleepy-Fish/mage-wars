import * as PIXI from 'pixi.js';

export default (cb, handleProgress)=>{
    let loader = PIXI.loader;
    loader
        .add('mage','public/assets/mage/mage.json')
        .add('grass','public/assets/tiles/grass.png')
        .add('brick','public/assets/tiles/brick.png')
        .on("progress", handleProgress)
        .load(cb);
}