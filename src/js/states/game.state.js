import State from './state'
import Button from '../ui/button'

export default class GameState extends State {
    constructor(app){
        super(app);
        this.hud = new PIXI.Container()
        this.fpsText = new PIXI.Text(`FPS: ${Math.round(app.ticker.FPS)}`);
        this.fpsText.x = 100;
        this.fpsText.y = 10;

        this.workingOnText = new PIXI.Text(`Working On: ${window.game.workingOn}`);
        this.workingOnText.x = 250;
        this.workingOnText.y = 10;
        
        this.backButton = new Button({
            text:'Back',
            x:45,
            y: 30,
            width:70,
            height:40
        },()=>{
            window.game.setState('menu')
        });

        this.hud.addChild(this.backButton.init, this.fpsText, this.workingOnText);
        this.hud.visible = false;
        app.stage.addChild(this.hud);
    }
    run(delta){
        super.run(delta);
        this.fpsText.text = `FPS: ${Math.round(this.app.ticker.FPS)}`;
    }
    activate(){
        super.activate();
        this.hud.visible = true;
        this.backButton.reset();
    }
    deactivate(){
        super.deactivate();
        this.hud.visible = false;
    }
}