import GameState from './game.state';
import Char from '../entities/char';

export default class WorldState extends GameState{
    constructor(app){
        super(app);
        this.mage = new Char(this.scene, window.game.input.Keyboard, {
            position:{x:200, y: 300},
            movementType: 'wasd'
        });
    }
    run(delta){
        super.run(delta);
        this.mage.update();
    }
    activate(){
        super.activate();
        this.mage.activate();
    }
    deactivate(){
        super.deactivate();
        this.mage.deactivate();
    }
}