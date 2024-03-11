export function main(){
  let products = [];
  const $ = (elemet)=> document.querySelector(elemet);
  const $containerProduct = $('.main__contenedor-productos'),
        $mainTitle = $('.main__title'),
        $shoppingCart = $(".sshopping-car");

  fetch("bd.json")
  .then(async response => await response.json())
  .then(async data =>{
    products = await data; 
    seletProducts(null);
  });

  const carryProduct = (data)=>{

    let html = "";

    data.forEach(product =>{
      console.log(product);
      html += `
      <div class="main__products">
        <div class="main__img-product-container">
          <img class="main__img-product" src="${product.image}" alt="${product.title}">
        </div>
        <div class="main__detail-product">
          <h3 class="main__title__producto">${product.title}</h3>
          <p class="main__price__product">${product.price} <span class="main_product-stock">Stock: ${product.stock}</span></p>
          <button class="producto-add" id="${product.id}">Agregar <i class="bi bi-cart-plus-fill"></i></button>
        </div>
      </div>
      `;
    });
    $containerProduct.innerHTML = html;
    }

  const seletProducts = (category)=>{
    let productsEndCategory = null;

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
                /**se encarga de cerrar el carrito en caso de que este abierto y lugo carga los productos*/
                $containerProduct.classList.remove("main__contenedor-productos--hidden");
                $shoppingCart.classList.remove("shopping-car--active");
        
                seletProducts(e.target.getAttribute("sub-category")); 
      }
    })
}