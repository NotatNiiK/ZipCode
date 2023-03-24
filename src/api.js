
export async function getAPIcall(URL, cb){
    try{
        const response = await (await fetch(URL)).json();
        const result = await response;
        return result;
    }catch(err){
        cb(err);
    }
   
}