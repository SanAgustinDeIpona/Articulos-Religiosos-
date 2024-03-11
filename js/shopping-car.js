export function shoppingCart(){
    const $ = (element)=>document.querySelector(element);
    const $mainTitle = $(".main__title"),
        $shoppingCart = $(".sshopping-car"),
        $containerProduct = $(".main__contenedor-productos");
    

    document.addEventListener("click", (e)=>{
        if(e.target.classList.contains("shopping-car"))
        {
            $mainTitle.innerText = "Carrito de compras";
            /*despliega el carrito de compras y cierra el contenedor de los productos en caso que 
            que este abierto*/
            $containerProduct.classList.add("main__contenedor-productos--hidden");
            $shoppingCart.classList.add("shopping-car--active");
        }
    });
}