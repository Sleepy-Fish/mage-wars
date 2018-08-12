import State from './state'
import Menu from '../ui/menu';

export default class MenuState extends State{
    constructor(app){
        super(app)
        this.menu = new Menu(this.scene,[
            { label: 'Play', callback: ()=>{window.game.setState('world');}}
        ]);
    }
    run(delta){
        super.run(delta);
    }
    activate(){
        super.activate();
        this.menu.reset();
    }
}