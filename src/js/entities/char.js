export default class Char {
    constructor(container, options){
        this.container = container;
        //Sprite initialization
        this._downFrames = [PIXI.Texture.fromFrame('d1.png'), PIXI.Texture.fromFrame('d2.png'), PIXI.Texture.fromFrame('d3.png')];
        this._upFrames = [PIXI.Texture.fromFrame('u1.png'), PIXI.Texture.fromFrame('u2.png'), PIXI.Texture.fromFrame('u3.png')];
        this._leftFrames = [PIXI.Texture.fromFrame('l1.png'), PIXI.Texture.fromFrame('l2.png'), PIXI.Texture.fromFrame('l3.png')];
        this._rightFrames = [PIXI.Texture.fromFrame('r1.png'), PIXI.Texture.fromFrame('r2.png'), PIXI.Texture.fromFrame('r3.png')];

        this._animation = new PIXI.extras.AnimatedSprite(this._downFrames);
        this._animation.anchor.set(0.5,0.5);
        this._animation.x = options.position.x||0;
        this._animation.y = options.position.y||0;
        this._animation.animationSpeed = 0.2;
        this._animation.play();
        this.container.addChild(this._animation);

        this._velocity = {x:0,y:0};
        this._speed = 5;
        window.game.input.Keyboard.subscribe('w','press',()=>{
            this.direction = 'up';
            this._velocity.y-=this._speed;
        });
        window.game.input.Keyboard.subscribe('a','press',()=>{
            this.direction = 'left';
            this._velocity.x-=this._speed;
        });
        window.game.input.Keyboard.subscribe('s','press',()=>{
            this.direction = 'down';
            this._velocity.y+=this._speed;
        });
        window.game.input.Keyboard.subscribe('d','press',()=>{
            this.direction = 'right';
            this._velocity.x+=this._speed;
        });
        window.game.input.Keyboard.subscribe('w','release',()=>{
            this._velocity.y+=this._speed;
        });
        window.game.input.Keyboard.subscribe('a','release',()=>{
            this._velocity.x+=this._speed;
        });
        window.game.input.Keyboard.subscribe('s','release',()=>{
            this._velocity.y-=this._speed;
        });
        window.game.input.Keyboard.subscribe('d','release',()=>{
            this._velocity.x-=this._speed;
        });
    }
    get x(){
        return this.sprite.x;
    }
    get y(){
        return this.sprite.y;
    }
    get direction(){
        return this._direction;
    }
    set direction(dir){
        if(!['up','down','left','right'].includes(dir)) throw Error(`${dir} not valid direction`);
        this._direction = dir;
        this._animation.textures = this[`_${dir}Frames`];
        this._animation.play();
    }
    activate(){

    }
    deactivate(){

    }
    update(){
        this._animation.x+=this._velocity.x;
        this._animation.y+=this._velocity.y;
    }
}