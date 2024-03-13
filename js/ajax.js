export async function ajax (cdSuccess){
    fetch("bd.json")
    .then(async response => await response.json())
    .then(async data =>{
        let products = await data;  
        
        if(localStorage.getItem("productsFioreDiCarmelo")){
            cdSuccess(JSON.parse(localStorage.getItem("productsFioreDiCarmelo")));
        }
        else {
            localStorage.setItem("productsFioreDiCarmelo", JSON.stringify(products))
            cdSuccess(products);
        }
    });
}
