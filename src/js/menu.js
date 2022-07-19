const menuBurger = document.querySelector(".burger");
const menuBody = document.querySelector(".menu__body");

const switchActiveMenu = () => {
  menuBurger.classList.toggle("_active");
  menuBody.classList.toggle("_active");
}

menuBody.addEventListener("click", switchActiveMenu);

menuBurger.addEventListener("click", switchActiveMenu);


const routeLinks = document.querySelectorAll('.nav-list__link');
Array.from(routeLinks).forEach(link => {
  const linkUrl = new URL(link.href);
  if (linkUrl.pathname === document.location.pathname) {
    link.classList.add('_active');
  }
})
