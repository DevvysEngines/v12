export function scriptHandler(sCls){
    return class extends sCls {
        get node(){
            return this.context
        }
        on(nodeOrScript, ...info){
            return this.insert(nodeOrScript, ...info);
        }
        add(...nodesOrScripts){
            let results = [];
            nodesOrScripts.forEach((key)=>{
                let script = key;
                let info = [];
                if (Array.isArray(key)){
                    script = key.shift();
                    info = key;
                }
                results.push(this.insert(script, ...info));
            })
            return results;
        }
    }
}