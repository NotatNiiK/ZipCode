export async function getIPaddress(){
    const URL = 'http://ip-api.com/json';
    const response = (await fetch(URL)).json();
    const result = await response;
    return result;
}

export async function getInfo(zipCode){
    const URL = `https://api.zippopotam.us/us/${zipCode}`;
    const request = await (await fetch(URL)).json();
    const result = await request;
    return result;
}