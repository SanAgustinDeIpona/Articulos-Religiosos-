export function header(){
  const $ = ($element)=> document.querySelector($element);
  const $containerMenu = $(".header__container-menu"),
        $figureMenu = $(".menu");
  
    let $subMenu = null,  
    $icon;
  
  document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("menu") || e.target.classList.contains("header__sub-category") || e.target.classList.contains("header__category-all")){
      $containerMenu.classList.toggle("header__menu--active");
      
      if ($figureMenu.checked) $figureMenu.checked = false;
      else $figureMenu.checked = true;
    }

    if(e.target.id === "figure-menu")
    {
      if ($figureMenu.checked) $figureMenu.checked = false;
      else $figureMenu.checked = true;
    }
    
    if(e.target.classList[0] == "header__span"){
        if($subMenu != null && $subMenu != $("." + e.target.getAttribute("sub-menu"))){
          $subMenu.classList.remove("header__sub-menu--active");
          $icon.classList.remove("bi-arrow-active");
        }
  
      $subMenu = $("." + e.target.getAttribute("sub-menu")),  
      $icon = $(`.${e.target.classList[0]} .bi[icon-menu="${e.target.getAttribute("sub-menu")}"]`);
  
      $subMenu.classList.toggle("header__sub-menu--active");
      $icon.classList.toggle("bi-arrow-active");
    }
  });
}