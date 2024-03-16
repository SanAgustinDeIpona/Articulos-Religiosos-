export async function ajax (cdSuccess){
    fetch("bd.json")
    .then(async response => await response.json())
    .then(async data =>{
        let products = await data;  

        if(!localStorage.getItem("statusFiore"))
            localStorage.setItem("statusFiore", false);
        
        //lo puse asi porque primero se ejecuta sorprendentemente esto antes que login
        if(localStorage.getItem("productsFioreDiCarmelo") && localStorage.getItem("login")){
        
            if(localStorage.getItem("statusFiore") === "true")//si hay una actualizacion del producto
            {
                localStorage.setItem("statusFiore", false);

                localStorage.setItem("productsFioreDiCarmelo", JSON.stringify(products))

                //para eliminar los prodcutos con stock 0 en el carrito
                let card = JSON.parse(localStorage.getItem("shoppingCart"));
                let count = 0;

                data.forEach(element => {
                    if(count < card.length) {
                        let p;

                        p = card.findIndex(product => product.id === element.id);
                        
                        p > -1?
                        element.stock <= 0?card[p].stock = 0:card[p].amount > element.stock?
                        console.log(card[p].amount = element.stock, card[p].stock = element.stock):"":"";
                    }
                    else return;

                    count++;
                });

                card = card.filter(product => product.stock > 0);

                localStorage.setItem("shoppingCart", JSON.stringify(card));
                cdSuccess(products);
            }
            else{
                cdSuccess(JSON.parse(localStorage.getItem("productsFioreDiCarmelo")));
            }

        }
        else {
            localStorage.setItem("productsFioreDiCarmelo", JSON.stringify(products))
            cdSuccess(products);
        }
    });
}
