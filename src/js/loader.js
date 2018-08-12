import * as PIXI from 'pixi.js';

export default (cb, handleProgress)=>{
    let loader = PIXI.loader;
    loader
        .add('mage','public/assets/mage/mage.json')
        .on("progress", handleProgress)
        .load(cb);
}