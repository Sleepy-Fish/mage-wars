import Bump from '../bump';

export default class Char {
    constructor(container, keyboard, options){
        this.container = container;
        this.bump = new Bump(PIXI);
        //Sprite initialization
        this._downFrames = [PIXI.Texture.fromFrame('d1.png'), PIXI.Texture.fromFrame('d2.png'), PIXI.Texture.fromFrame('d3.png')];
        this._upFrames = [PIXI.Texture.fromFrame('u1.png'), PIXI.Texture.fromFrame('u2.png'), PIXI.Texture.fromFrame('u3.png')];
        this._leftFrames = [PIXI.Texture.fromFrame('l1.png'), PIXI.Texture.fromFrame('l2.png'), PIXI.Texture.fromFrame('l3.png')];
        this._rightFrames = [PIXI.Texture.fromFrame('r1.png'), PIXI.Texture.fromFrame('r2.png'), PIXI.Texture.fromFrame('r3.png')];

        this._sprite = new PIXI.extras.AnimatedSprite(this._downFrames);
        this._sprite.anchor.set(0.5,0.5);
        this._sprite.x = options.position.x||0;
        this._sprite.y = options.position.y||0;
        this._sprite.animationSpeed = 0.2;
        this._sprite.play();
        this.container.addChild(this._sprite);

        this._velocity = {x:0,y:0};
        this._speed = 12;
        this._acceleration = 0.5;

        this._directions = {
            'up':false,
            'down':false,
            'left':false,
            'right':false
        }

        this._boundingBoxes = options.boundingBoxes;

        if(options.movementType==='wasd'){
            keyboard.subscribe('w','press',()=>{
                this._directions.up = true;
                this.direction = 'up';
            });
            keyboard.subscribe('a','press',()=>{
                this._directions.left = true;
                this.direction = 'left';
            });
            keyboard.subscribe('s','press',()=>{
                this._directions.down = true;
                this.direction = 'down';
            });
            keyboard.subscribe('d','press',()=>{
                this._directions.right = true;
                this.direction = 'right';
            });
            keyboard.subscribe('w','release',()=>{
                this._directions.up = false;
            });
            keyboard.subscribe('a','release',()=>{
                this._directions.left = false;
            });
            keyboard.subscribe('s','release',()=>{
                this._directions.down = false;
            });
            keyboard.subscribe('d','release',()=>{
                this._directions.right = false;
            });
        }
    }
    get x(){
        return this.sprite.x;
    }
    get y(){
        return this.sprite.y;
    }
    set direction(dir){
        if(!['up','down','left','right'].includes(dir)) throw Error(`${dir} not valid direction`);
        this._sprite.textures = this[`_${dir}Frames`];
        this._sprite.play();
    }
    activate(){

    }
    deactivate(){

    }
    update(){
        if(this._directions.up) this._velocity.y = (this._velocity.y - this._acceleration).clamp(-this._speed,this._speed);
        if(this._directions.down) this._velocity.y = (this._velocity.y + this._acceleration).clamp(-this._speed,this._speed);
        if(!(this._directions.up || this._directions.down) && this._velocity.y != 0){
            if(this._velocity.y > this._acceleration){
                this._velocity.y -= this._acceleration;
            } else if(this._velocity.y < this._acceleration){
                this._velocity.y += this._acceleration;
            } else {
                this._velocity.y = 0;
            }
        }
        if(this._directions.left) this._velocity.x = (this._velocity.x - this._acceleration).clamp(-this._speed,this._speed);
        if(this._directions.right) this._velocity.x = (this._velocity.x + this._acceleration).clamp(-this._speed,this._speed);
        if(!(this._directions.left || this._directions.right) && this._velocity.x != 0){
            if(this._velocity.x > this._acceleration){
                this._velocity.x -= this._acceleration;
            } else if(this._velocity.x < this._acceleration){
                this._velocity.x += this._acceleration;
            } else {
                this._velocity.x = 0;
            }
        }
        if(this._sprite.playing && !(this._directions.up||this._directions.down||this._directions.left||this._directions.right)){
            this._sprite.stop();
        }

        for(let box of this._boundingBoxes){
            if(this.bump.hitTestRectangle(this._sprite, box)){
                let dx = Math.abs(this._sprite.x-box.centerX);
                let dy = Math.abs(this._sprite.y-box.centerY);
                let sb = this._sprite.getBounds();
                if(dx >= dy){//horizontal
                    this._velocity.x = -this._velocity.x;
                    if(sb.left < box.right && sb.right > box.right){
                        console.log('left')
                    } else {
                        console.log('right')
                    }
                } else {//vertical
                    this._velocity.y = -this._velocity.y;
                    if(sb.top < box.bottom && sb.bottom > box.bottom){
                        console.log('top')
                    } else {
                        console.log('bottom');
                    }
                }
                break;
            }
            
        }

        this._sprite.x+=this._velocity.x;
        this._sprite.y+=this._velocity.y;
    }
}