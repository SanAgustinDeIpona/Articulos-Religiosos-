import { ajax } from "./ajax.js";

export function shoppingCart(){
    const $ = (element)=>document.querySelector(element);
    const $mainTitle = $(".main__title"),
        $shoppingCart = $(".sshopping-car"),
        $containerProduct = $(".main__contenedor-productos"),
        $containerShoppingCart = $(".shopping-car__products-container"),
        $shoppingCartAction = $(".shopping-car__actions"),
        $shoppingCartSpan = $(".shopping-car__span"),
        $shoppingCartTotal = $(".shopping-car__total"),
        $productStock = $(".main_product-stock"),
        $loader = $(".loader");

    let products = [],
    productAndCart = [],
    total = 0;

    const formatTotal = (number)=>{
      return number.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' })
    };

    ajax(async (data)=>products = await data);

  const addShoppingCart = (idProduct)=>{
          productAndCart = localStorage.getItem("shoppingCart");
          productAndCart = productAndCart ? JSON.parse(productAndCart) : [];

      if(productAndCart) {
        let data = productAndCart.find((product) => product.id === idProduct),
            index =  productAndCart.findIndex((product) => product.id === idProduct);

          //valida si existe el articulo
        if(data){
          if(data.amount < data.stock){
            //para aumentar la cantidad
            productAndCart[index].amount = (productAndCart[index].amount + 1); 
            localStorage.setItem("shoppingCart", JSON.stringify(productAndCart));

            /**para actualizar la cantidad en el carrito */
            const $shoppingCartAmount = $(".shopping-car__amount" + idProduct);
            total = JSON.parse(localStorage.getItem("total"));

            //para obtener el nuevo total y luego mostarlo
            total += productAndCart[index].price;
            localStorage.setItem("total", JSON.stringify(total));

            //muestro la cantidad actualizada
            $shoppingCartAmount.innerText = productAndCart[index].amount;

            //muestro el total del carrito actualizado
            $shoppingCartTotal.innerText = formatTotal(total); 
            console.log("cantidad aumentada");  
          }
          else
          console.log("Ya no hay stock");
        }
        else{
          let result = products.find(product => product.id === idProduct),
            produnt = {
              id: result.id,
              title: result.title,
              image: result.image,
              price: result.price,
              stock: result.stock,
              amount: 1
            };

            productAndCart.push(produnt);
            localStorage.setItem("shoppingCart", JSON.stringify(productAndCart));
            console.log("producto agregado al carrito");
        }
    }
  };

  const menosProductCart = (id)=>{
    let productsCart = JSON.parse(localStorage.getItem("shoppingCart")),
    index = productsCart.findIndex((product) => product.id === id); //busca el indice
    const $shoppingCartAmount = $(".shopping-car__amount" + id);

    if(productsCart[index].amount > 1){
      //redusco la cantidad
      productsCart[index].amount = (productsCart[index].amount - 1);
      //obtengo el total
      total = localStorage.getItem("total");
      //redusco el total
      total = total - productsCart[index].price;
      //le doy formato al total y lo muestro
      $shoppingCartTotal.innerText = formatTotal(total);

      //actualizo la cantidad
      $shoppingCartAmount.innerText = productsCart[index].amount;

      localStorage.setItem("total", JSON.stringify(total));
      localStorage.setItem("shoppingCart", JSON.stringify(productsCart));
    }
    else{
      console.log("No se puede reducir mas");
    }
  };

  const renderedShoppingCart = ()=>{
    productAndCart = JSON.parse(localStorage.getItem("shoppingCart"));
    total = 0;

    if(productAndCart.length > 0){
      $shoppingCartSpan.classList.remove("shopping-car__span--active");
      $shoppingCartAction.classList.add("shopping-car__actions--active");
      let html = "";
      
      productAndCart.forEach(product => {
        html += `
        <div class="shopping-car__product">
        <img class="shopping-car__product-img" src="${product.image}" alt="rosario">
        
        <div class="shopping-car__product__description">
        <small class="shopping-car__product__title">Título</small>
        <h2 class="shopping-car__product__name">${product.title}</h2>
        </div>
        <div class="shopping-car__product__description">
        <h3 class="main__title__producto">Cantidad</h3>
        <div class="shopping-car__count-container">
          <p class="shopping-car__menos shopping-car__coutn" id="${product.id}">-</p> 
          <p class="shopping-car__amount${product.id}">${product.amount}</p>
          <p class="shopping-car__mas shopping-car__coutn" id="${product.id}">+</p>
        </div>
        </div>
        <div class="shopping-car__product__description">
        <small class="shopping-car__product__title">Precio</small>
        <p class="shopping-car__product__price">C$${product.price}</p>
        </div>
        <button class="shopping-car__delete" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
        </div>
        `;

        total += (product.amount * product.price)
        localStorage.setItem("total", JSON.stringify(total)); 
      });

      $shoppingCartTotal.innerText = `${formatTotal(total)}`;
      $containerShoppingCart.innerHTML = html;
    }
    else{
      $containerShoppingCart.innerHTML = "";
      $shoppingCartAction.classList.remove("shopping-car__actions--active");
      $shoppingCartSpan.classList.add("shopping-car__span--active");
    }
  };

  const deleteProductCart = (id)=>{
    let productAndCart = JSON.parse(localStorage.getItem("shoppingCart")),
      newProducts = productAndCart.filter(product => product.id !== id);
    
      localStorage.setItem("shoppingCart", JSON.stringify(newProducts));
      renderedShoppingCart();
  };

  const emphyShoppingCart = ()=>{
    let productAndCart = JSON.parse(localStorage.getItem("shoppingCart")),
    products = JSON.parse(localStorage.getItem("productsFioreDiCarmelo")),
    result = localStorage.getItem("baggedProducts"),
    baggedProducts = JSON.parse(localStorage.getItem("baggedProducts")) || [];

    localStorage.setItem("total", JSON.stringify(0));

      productAndCart.forEach(element => {
        let indexProduct = products.findIndex(product => product.id === element.id);
        products[indexProduct].stock = products[indexProduct].stock - element.amount;
  
        if(result){
          if(baggedProducts.find(product => product.id === element.id)){
            indexProduct = baggedProducts.findIndex(product => product.id === element.id);
            baggedProducts[indexProduct].amount += productAndCart[indexProduct].amount;
          }
          else{
            baggedProducts.push(element);
          }
        }
        else{
          baggedProducts.push(element);
        }
      });

      localStorage.setItem("productsFioreDiCarmelo", JSON.stringify(products));
      localStorage.setItem("baggedProducts", JSON.stringify(baggedProducts));
      localStorage.setItem("shoppingCart", JSON.stringify([]));
      renderedShoppingCart();
  };

  const shoppingCartBuy = ()=>{
    //activo el loader
    $loader.classList.add("loader--active");

    //obtengo el carrito de compras
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")),
      person = JSON.parse(localStorage.getItem("login"));

       //desplegar targeta de conplete compra
      const $cardSuccess = $(".card--success"),
      $cardError = $(".card__error-container"),
      $cardTitle = $(".card__text--success");

    // Crear un objeto FormData
    let formData = new FormData();

      formData.append("Name", person.name);
      formData.append("Phone", person.telephone);
      formData.append("subject", "Compra exitosa desde la Tienda online Fiore Di Carmelo");
      formData.append("product", JSON.stringify(shoppingCart));
      formData.append("Total", JSON.parse(localStorage.getItem("total")));

      //envio a mi correo la compra
    let ajax = fetch("https://formsubmit.co/ajax/joseromero86971883@gmail.com", {
        method: "POST",
        body: formData
    }).then(res => res.ok ? res.json():Promise.reject(res))
    .then((resul)=>{
        $loader.classList.remove("loader--active");
              
        $cardTitle.innerText = "!Su compra esta siendo procesada, pronto nos contactaremos con usted¡";
        $cardSuccess.classList.add("card--active");
        emphyShoppingCart();

    }).catch((err)=>{
      $loader.classList.remove("loader--active");
      $cardError.classList.add("card__error-container--active");
    });

  };
  
  const renderedBaggedProducts = (data)=>{
    data  = data == null?0:data;

    if(data.length > 0){
      total = 0;
      let html = "";

      data.forEach(product => {
        html += `
        <div class="shopping-car__product">
        <img class="shopping-car__product-img" src="${product.image}" alt="rosario">
        
        <div class="shopping-car__product__description">
        <small class="shopping-car__product__title">Título</small>
        <h2 class="shopping-car__product__name">${product.title}</h2>
        </div>
        <div class="shopping-car__product__description">
        <div class="shopping-car__product__description">
          <h3 class="main__title__producto">Cantidad</h3>
          <p class="shopping-car__amount${product.id}" style="text-align:center;">${product.amount}</p>
        </div>
        </div>
        <div class="shopping-car__product__description">
        <small class="shopping-car__product__title">Precio</small>
        <p class="shopping-car__product__price">C$${product.price}</p>
        </div>
        </div>
        `;

        total += (product.amount * product.price)
      });
      html += `
      <div class="shopping-car__product" style="background:rgb(119, 194, 120); color:white;">
      <p class="shopping-car__title">Total:</p>
      <p class="shopping-car__total">${total}</p>
      </div>
      `;
      const $bagggedContainer = $(".bagged-container");

      $containerProduct.classList.add("main__contenedor-productos--hidden");
      $shoppingCartSpan.classList.remove("shopping-car__span--active");
      $shoppingCart.classList.remove("shopping-car--active");
      $mainTitle.innerText = "Articulos comprados";
      $bagggedContainer.innerHTML = html;
      $bagggedContainer.classList.add("bagged-container--active");
    }
  };

    document.addEventListener("click", (e)=>{
        if(e.target.classList.contains("shopping-car"))
        {          
          const $bagggedContainer = $(".bagged-container");
          $bagggedContainer.classList.remove("bagged-container--active");

            $mainTitle.innerText = "Carrito de compras";
            /*despliega el carrito de compras y cierra el contenedor de los productos en caso que 
            que este abierto*/
            $containerProduct.classList.add("main__contenedor-productos--hidden");
            $shoppingCart.classList.add("shopping-car--active");

            renderedShoppingCart();
        }

        if(e.target.classList.contains("producto-add"))
        {
            e.target.innerHTML = `Articulo agregado <i class="bi bi-cart-plus-fill"></i>`;
            e.target.classList.add("producto-add--ok");
            addShoppingCart(e.target.getAttribute("id"));
        }

        if(e.target.classList.contains("shopping-car__mas")){
          addShoppingCart(e.target.getAttribute("id"));
        }

        if(e.target.classList.contains("shopping-car__menos"))
        {
          menosProductCart(e.target.getAttribute("id"));
        }

        if(e.target.classList.contains("shopping-car__empty"))
        {
          if(confirm("Seguro que deseas vaciar tu carrito de compras")){
            productAndCart = [];
            localStorage.setItem("shoppingCart", JSON.stringify(productAndCart));
            renderedShoppingCart();
          }
        }

        if(e.target.classList.contains("shopping-car__delete")){
          deleteProductCart(e.target.getAttribute("id"));
        }

        if(e.target.classList.contains("card__button")){
          
          const $cardSuccess = $(".card"),
                $cardError = $(".card__error-container");

          if(e.target.classList.contains("card__button-error"))
            $cardError.classList.remove("card__error-container--active");
          else
          $cardSuccess.classList.remove("card--active");
        }

        if(e.target.classList.contains("shopping-car__buy")){
          shoppingCartBuy();
        }

        if(e.target.classList.contains("bagged-products")){
          let products = JSON.parse(localStorage.getItem("baggedProducts"));
          renderedBaggedProducts(products);
        }
    }); 

}