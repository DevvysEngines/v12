import {v9} from "../../../v9/v9.js";

let defaults = () => {
    return {
        position:{
            x:0
            ,y:0
        }
        ,renderer:{
            color:[0,0,0]
            ,transparency:1
            ,width:30
            ,height:30
            ,radius:15
            ,string:``
        }
        ,hitbox:{
            width:30
            ,height:30
            ,radius:15
        }
        ,mouse:{
            left:false
            ,right:false
            ,middle:false
        }
        ,unlocked_storage:{
            chunk:[0,0]
        }
    }
}

function mergeObjects(obj1,obj2){
    return Object.assign({},obj1,obj2);
}

let element_scripts = [
    [new v9.script({signal: v9.utilities.system_signal_converter(`scripts_storage/`),fired([ov,script]){if (!script.proto.onInsert)return;v9.utilities.ctxUse(script, this, `onInsert`)(...script.info);}})]
    ,[new v9.script({signal: v9.utilities.system_signal_converter(`scripts_storage/`,`delete`),fired([script]){if (!script.proto.onRemove)return;v9.utilities.ctxUse(script, this, `onRemove`)(...script.info);}})]
    ,[
        new v9.script({
            signal: `unlocked:render`
            ,fired(ctx){
                console.log(`ahhhh`);
                ctx.fillRect(0,0,50,50);
            }
        })
    ]
]

export class baseElement extends v9.module {
    constructor(position={},renderer={},hitbox={},...nodesOrScripts){
        let newDefaults = defaults();
        super({
            position:mergeObjects(newDefaults.position,position)
            ,renderer:mergeObjects(newDefaults.renderer,renderer)
            ,hitbox:mergeObjects(newDefaults.hitbox,hitbox)
            ,unlocked_storage:mergeObjects({},newDefaults.unlocked_storage)
        },...element_scripts,...nodesOrScripts)
    }
    system_has(path){
        return typeof this.system_get(path) != `undefined`;
    }
    has(...path){
        return typeof this.get(...path) != `undefined`;
    }
    update(...args){
        this.emit(`unlocked:update`,...args);
    }
    render(...args){
        this.emit(`unlocked:render`,...args);
    }
}