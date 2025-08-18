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

let mousePreset = new game.v9.script({
    trigger([ov,v],fn,...args){
        if (!v)return;
        let call = fn.call(this,...args)
        if (typeof call == `object`)call.info.unshift(fn);
        return call;
    }
    ,onInsert(fn,...args){
        if (typeof fn != `function`)fn=function(){}
        return {info:[fn,...args]};
    }
    ,signal: game.v9.utilities.system_signal_converter(`mouse/left/down`)
})

window.element.insert(mousePreset, function(thing){console.log(thing);return {info:[thing+1]}}, 5)

window.element.insert(new game.v9.script({
    trigger([ov,v],info){
        if (!v)return;
        this.remove();
        console.log(info)
    }
    ,onInsert(info){
        console.log(info);
        return {info:[info+1]};
    }
    //,signal: game.v9.utilities.system_signal_converter(`mouse/left/down`)
}), 8)


window.element.insert(new game.v9.script({
    trigger(){
        console.log(`true`)
    }
    ,signal: `so is not crazy`
}))
window.element.emit(`umm is not crazy`)   