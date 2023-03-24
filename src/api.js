export async function getAPIcall(URL){
    const response = await (await fetch(URL)).json();
    const result = await response;
    return result;
}