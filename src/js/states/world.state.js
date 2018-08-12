import GameState from './game.state';
import Char from '../entities/char';

export default class WorldState extends GameState{
    constructor(app){
        super(app);
        this.mage = new Char(this.scene, {
            position:{x:200, y: 300}
        });
        setTimeout(()=>{
            this.mage.direction = 'left';
        },5000)
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