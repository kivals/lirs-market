const menuBurger = document.querySelector(".burger");
const menuBody = document.querySelector(".menu__body");

menuBurger.addEventListener("click", (e) => {
  menuBurger.classList.toggle("_active");
  menuBody.classList.toggle("_active");
})
