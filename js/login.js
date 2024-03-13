import { ajax } from "./ajax.js";

export function login (){

    const $login = document.querySelector('.login'),
        $html = document.querySelector('html'),
        $card = document.querySelector(".card"),
        $showProdcuts = document.querySelector(".header__category-all"); 

    if(!localStorage.getItem("login")) $login.classList.remove("login--inactive");
    else $html.classList.remove("scroll--inactive");

    document.addEventListener("submit", (e)=>{
        if(e.target.classList.contains("logo__form")){
            e.preventDefault();

            if(localStorage.getItem("login")) {
                console.log("Tu cuenta ya existe");
                return ;
            }

            if(e.target.name != "" && e.target.telephone != ""){
                localStorage.setItem("login", JSON.stringify({
                    name: e.target.name.value,
                    telephone: e.target.telephone.value
                }));

                localStorage.setItem("shoppingCart", JSON.stringify([]));

                $card.classList.add("card--active");
                $login.classList.add("login--inactive");

                document.addEventListener("click", (e)=>{
                    if(e.target.classList.contains("card__button")){
                        $card.classList.remove("card--active");
                        $html.classList.remove("scroll--inactive");
                        location.reload();
                    }
                });
            }
            else console.log("Ocurrio un error");
        }
    });
}