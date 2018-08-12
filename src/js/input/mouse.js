export default class Mouse {
    constructor() {
        this._subscriptions = {
            press:[],
            release:[],
            during:[],
            hover:[],
            scroll:[]
        };
        this._buttons = [];
        this._position = { x: 0, y: 0 };

        document.addEventListener('contextmenu', event => event.preventDefault());

        window.addEventListener("mousedown", event=>{
            if(!this._buttons[event.button]){
                this._buttons[event.button]=true;
                let data = { x:event.offsetX, y:event.offsetY }
                this._process_event(event.button, 'press', data);
            }
            event.preventDefault();
        });
        window.addEventListener("mouseup", event=>{
            this._buttons[event.button]=false;
            let data = { x:event.offsetX, y:event.offsetY }
            this._process_event(event.button, 'release', data);
            event.preventDefault();
        });

        window.addEventListener('wheel', event=>{
            let data = { x:event.offsetX, y:event.offsetY, deltaX: event.deltaX, deltaY: event.deltaY }
            this._process_event(0, 'scroll', data);
            if(event.deltaX>0){this._process_event(1, 'scroll', data);}//left
            if(event.deltaX<0){this._process_event(2, 'scroll', data);}//right
            if(event.deltaY>0){this._process_event(3, 'scroll', data);}//up
            if(event.deltaY<0){this._process_event(4, 'scroll', data);}//down

            event.preventDefault();
        });

        window.addEventListener('mousemove', event=>{
            this._position = { x:event.offsetX, y:event.offsetY}
            let data = { x:event.offsetX, y:event.offsetY}
            this._process_event(0, 'hover', data);
            this._process_event(1, 'hover', data);//enter
            this._process_event(2, 'hover', data);//exit

            event.preventDefault();
        });

    }

    update(){
        for(let index in this._subscriptions.during){
            if(this._buttons[index]){
                this._process_event(index, 'during', Object.assign({},this._position));
            }
        }
    }

    get x(){
        return this._position.x;
    }
    get y(){
        return this._position.y;
    }

    _check_bounds(mouse, bounds, alt){
        let contained = ( (mouse.x > bounds.getGlobalPosition().x && mouse.x < (bounds.getGlobalPosition().x + bounds.width)) && (mouse.y > bounds.getGlobalPosition().y && mouse.y < (bounds.getGlobalPosition().y + bounds.height)) );
        return alt ? !contained : contained;
    }

    _process_event(button, action, data){
        var subscribed_events = this._subscriptions[action][button];
        if(Array.isArray(subscribed_events)){
            for(let subscribed_event of subscribed_events){
                if(!subscribed_event.options.spent){
                    if(subscribed_event.options.bounds === undefined || this._check_bounds(data, subscribed_event.options.bounds, !!subscribed_event.options.inverted)) {
                        if (typeof subscribed_event.fn === "function") {
                            subscribed_event.fn(data);
                            if(subscribed_event.options.fireOnlyOnceWhileInBounds) subscribed_event.options.spent = true
                        }
                    }
                } else if(subscribed_event.options.fireOnlyOnceWhileInBounds && this._check_bounds(data, subscribed_event.options.bounds, !subscribed_event.options.inverted)){
                    subscribed_event.options.spent = false;
                }
            }
        }
    }

    subscribe(button, action, fn, options={}){
        this._buttons[button] = false;
        if(!Array.isArray(this._subscriptions[action][button]))this._subscriptions[action][button] = [];
        if(options.fireOnlyOnceWhileInBounds) options.spent = true;
        return this._subscriptions[action][button].push({fn: fn, options: options})-1;
    }
    unsubscribe(button, action, id){
        if(id!==undefined){
            this._subscriptions[action][button][id] = undefined;
        }
    }
}