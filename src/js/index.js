import * as PIXI from 'pixi.js';
import config from './app-config';
import loader from './loader';
import MenuState from './states/menu.state';
import WorldState from './states/world.state';
import Input from './input';

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type)
let app = new PIXI.Application(window.innerWidth, window.innerHeight, config);

window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

app.view.tabIndex = 1;
document.body.appendChild(app.view);
app.view.focus();

loader(setup, progress);

function progress(loader, resource){
    console.info(`${Math.round(loader.progress)}% Loaded`);
}

function setup(loader, resources){
    window.game = {}
    window.game.workingOn = "Making Collision Not Shitty";
    window.game.input = new Input(app);
    window.game.states = {
        menu: new MenuState(app),
        world: new WorldState(app),
    };
    window.game.setState = stateName=>{
        for(const state in window.game.states){
            state
            window.game.states[state].deactivate();
        }
        window.game.state = window.game.states[stateName];
        window.game.states[stateName].activate()
    };
    window.game.loop = delta => {
        window.game.input.update();
        window.game.state.run(delta);
    };
    window.game.setState('world');
    app.ticker.add(delta=>window.game.loop(delta));
}