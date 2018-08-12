import GameState from './game.state';
import Char from '../entities/char';
import Map from '../environment/map'

export default class WorldState extends GameState{
    constructor(app){
        super(app);
        this.map = new Map(this.scene);
        this.mage = new Char(this.scene, window.game.input.Keyboard, {
            position:{x:200, y: 300},
            movementType: 'wasd',
            boundingBoxes:this.map.boundingBoxes
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