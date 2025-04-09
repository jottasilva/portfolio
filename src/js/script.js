// Configuração de Recolher Menu com Scroll
window.addEventListener("scroll", function () {
  const menu = document.querySelector("#menu");
  menu.classList.toggle("rolagem", window.scrollY > 0);
});
//Configuração de Botao voltar ao Topo
window.addEventListener("scroll", function () {
  const gotop = document.querySelector("#gotop");
  gotop.classList.toggle("show", window.scrollY > window.screen.height / 1);
});


