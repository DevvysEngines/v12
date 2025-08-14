import { game } from "../Unlocked/game.js";

window.game = game;

window.element = new game.element();
window.element2 = new game.element();

new game.event(`mousedown`,function(){
    window.element.set(`mouse/left/down`,true);
})

new game.event(`mouseup`,function(){
    window.element.set(`mouse/left/down`,false);
})

window.element.insert(new game.v9.script({
    trigger([ov,v],info){
        if (!v)return;
        this.remove(this.node);
        console.log(info)
    }
    ,onInsert(info){
        console.log(info);
        return {info:[info+1]};
    }
    ,signal: game.v9.utilities.system_signal_converter(`mouse/left/down`)
}), 5)