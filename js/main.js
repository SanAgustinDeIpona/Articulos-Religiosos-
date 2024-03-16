import { ajax } from "./ajax.js";

export function main(){
  let products = [];
  const $ = (elemet)=> document.querySelector(elemet);
  const $containerProduct = $('.main__contenedor-productos'),
        $mainTitle = $('.main__title'),
        $shoppingCart = $(".sshopping-car");

      ajax((data)=>{
        products = data; 
        seletProducts(null);
      });
      
  const carryProduct = (data)=>{
    let html = "";
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

    data.forEach(product =>{
      let target = shoppingCart.find(prod=>prod.id === product.id);

      if(product.stock > 0){
        html += `
      <div class="main__products">
        <div class="main__img-product-container">
          <img class="main__img-product" src="${product.image}" alt="${product.title}">
        </div>
        <div class="main__detail-product">
          <h3 class="main__title__producto">${product.title}</h3>
          <p class="main__price__product">C$${product.price} <span class="main_product-stock">Existencias: ${product.stock}</span></p>

          <button class="producto-add ${target?"producto-add--ok":""}" id="${product.id}">${target?"Articulo agregado":"Agregar"} <i class="bi bi-cart-plus-fill"></i></button>
        </div>
      </div>
      `;
      }
    });
    $containerProduct.innerHTML = html;
    }

  const seletProducts = (category)=>{
    let productsEndCategory = null;
    products = localStorage.getItem("productsFioreDiCarmelo")?JSON.parse(localStorage.getItem("productsFioreDiCarmelo")):products;

    if(category != null){
      $mainTitle.innerText = category;
      productsEndCategory = products.filter(product => product.category.name == category?product.category.name == category:product.category.description == category);
      carryProduct(productsEndCategory);
    }
    else {
      carryProduct(products);
      $mainTitle.innerText = "Todos los articulos";
      }

    };

    /*para cerrar menu despegable*/
    document.addEventListener("click", (e)=>{
      if(e.target.classList[0] === "header__sub-category" || e.target.classList[0] === "header__category-all")
      {
        const $bagggedContainer = $(".bagged-container");
        $bagggedContainer.classList.remove("bagged-container--active");

        /**se encarga de cerrar el carrito en caso de que este abierto y lugo carga los productos*/
        $containerProduct.classList.remove("main__contenedor-productos--hidden");
        $shoppingCart.classList.remove("shopping-car--active");
        
        seletProducts(e.target.getAttribute("sub-category")); 
      }
    })
}