import { header } from "./header.js";
import { main } from "./main.js";
import { shoppingCart } from "./shopping-car.js";
import { login } from "./login.js";


document.addEventListener("DOMContentLoaded", ()=>{ 
  login();
  header();
  main();
  shoppingCart();
});