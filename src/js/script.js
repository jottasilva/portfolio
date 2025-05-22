// Configuração de Recolher Menu com Scroll
window.addEventListener("scroll", function () {
  const menu = document.querySelector("#menu");
  menu.classList.toggle("rolagem", window.scrollY > 0);
});
//Configuração de Botao voltar ao Topo
window.addEventListener("scroll", function () {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };  
});


