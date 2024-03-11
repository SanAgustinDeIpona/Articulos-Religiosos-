export async function ajax (oject){
    let {url, method, data, cbSuccess, error} = oject;

    await fetch(url, {
        method: method || "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    }).then(result => result.ok?result.json():Promise.reject(result))
    .then(json => cbSuccess(json))
    .catch(result => error(result));
}
