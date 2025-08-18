import { utilities } from "../../utilities.js";

export class base_module{
    #context = [];
    #files = {
        scripts_storage:{}
        ,signals_storage:{}
    };
    get id(){
        return this.#files[`id`];
    }
    get context(){
        return this.#context[this.#context.length-1];
    }
    set_context(context){
        return this.#context.push(context);
    }
    remove_context(){
        return this.#context.pop();
    }
    system_set(path=[],value=0){
        let current = this.#files
        let oldValue;
        for (let part = 0; part<path.length-1; part++){
            if (typeof current[path[part]] != `object`)current[path[part]]={};
            current = current[path[part]];
        }
        oldValue = current[path[path.length-1]];
        current[path[path.length-1]] = value;
        return [oldValue,value,...path];
    }
    system_delete(path=[]){
        let current = this.#files
        let possible = true;
        let oldValue;
        for (let part = 0; part<path.length-1; part++){
            if (typeof current[path[part]] != `object`)return [undefined,false,...path];
            current = current[path[part]];
        }
        oldValue = current[path[path.length-1]];
        if (!current[path[path.length-1]])possible=false;
        delete current[path[path.length-1]];
        return [oldValue,possible,...path];
    }
    system_get(path=[]){
        let current = this.#files
        for (let part = 0; part<path.length-1; part++){
            if (typeof current[path[part]] != `object`)return;
            current = current[path[part]];
        }
        return current[path[path.length-1]];
    }
    set(...path){
        let value = path.pop();
        let normalized_path = utilities.normalize_path(...path);
        let change = this.system_set(normalized_path,value);
        if (change[0]==value)return [change[0], false];
        let newpath = ``;
        this.emit(`*v9$i$m:{system-set}:{>>}*`,change);
        normalized_path.forEach((part)=>{
            newpath+=`>${part}`;
            this.emit(`*v9$i$m:{system-set}:{${newpath}>}*`,change);
        })
        this.emit(`*v9$i$m:{system-set}:{${newpath}}*`,change);
        return [change[0], true];
    }
    get(...path){
        return this.system_get(utilities.normalize_path(...path));
    }
    delete(...path){
        let normalized_path = utilities.normalize_path(...path);
        let change = this.system_delete(normalized_path);
        if (!change[1])return [change[0],change[1]];
        let newpath = ``;
        this.emit(`*v9$i$m:{system-delete}:{>>}*`,change);
        normalized_path.forEach((part)=>{
            newpath+=`>${part}`;
            this.emit(`*v9$i$m:{system-delete}:{${newpath}>}*`,change)
        })
        this.emit(`*v9$i$m:{system-delete}:{${newpath}}`,change);
        return [change[0],change[1]];
    }
    sets(...sets){
        let value = sets.pop();
        let returner = [];
        sets.forEach((set)=>{
            set.split(`,`).forEach((s)=>{
                returner.push(this.set(s, value));
            })
        })
        return returner;
    }
    gets(...gets){
        let returner = [];
        gets.forEach((get)=>{
            get.split(`,`).forEach((g)=>{
                returner.push(this.get(g));
            })
        })
        return returner;
    }
    deletes(...deletes){
        let returner = [];
        deletes.forEach((deleter)=>{
            deleter.split(`,`).forEach((d)=>{
                returner.push(this.delete(d));
            })
        })
        return returner;
    }
    constructor(config,...scripts){
        Object.assign(this.#files,config,{scripts_storage:{},signals_storage:{},id:utilities.generateId()});
        scripts.forEach((script)=>{
            this.insert(...script);
        })
    }
}