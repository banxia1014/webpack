class Url{

    /**
     *
     * @param path
     * @param filter
     * @returns {string}
     */
    static getPath(path, filter){
        path = path + '?'
        for(let k in filter){
            if(filter[k] === null){
                continue
            }
            if(Array.isArray(filter[k])){
                for (let k2 in filter[k]){
                    path = path+k+'[]='+filter[k][k2]+'&'
                }
            }else{
                path = path+k+'='+filter[k]+'&'
            }

        }
        path = path.substr(0, path.length - 1)
        return path
    }
}
export default Url