export class script {
    #defaults = {
        fired(){}
        ,tags:[]
        ,signal: `script`
    }
    constructor(config){
        Object.assign(this,this.#defaults,config,{type:`script`});
    }
}