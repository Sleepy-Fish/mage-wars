import Keyboard from './keyboard'
import Mouse from './mouse'
export default class Input {
    constructor(app) {
        this._keyboard = new Keyboard(app);
        this._mouse = new Mouse();
    }
    get Keyboard(){
        return this._keyboard;
    }
    get Mouse(){
        return this._mouse;
    }
    update(){
        this._keyboard.update();
        this._mouse.update();
    }
}