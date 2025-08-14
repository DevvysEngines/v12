import { element } from "./internal/element/element.js"
import { scene } from "./internal/scenes.js";
import { v9 } from "./v9/v9.js";
import { event } from "./smart-events/event.js";

class Game {
    element = element;
    v9=v9;
    event = event;
    scene = scene;
    #scenes = {};
    currentscene;
    generateId = v9.utilities.generateId;
    insert(item){
        let fail;
        switch(item.type){
            case `scene`:
                const name = item.name
                if (this.#scenes[name]){
                    fail = true;
                    break;
                }
                this.#scenes[name] = item;
        }
        return fail;
    }
    addScene(name){
        let scene = new this.scene(this, name);
        if (!this.insert(scene))return;
        this.currentscene = scene;
    }
    setScene(name){
        let scene = this.#scenes[name];
        if (!scene)return;
        this.currentscene=scene;
    }
    constructor(){
        this.addScene(`Main`);
    }
}

export let game = new Game();