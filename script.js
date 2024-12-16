// Seleciona o botão
const backToTop = document.getElementById("topo");

// Adiciona evento de rolagem
window.addEventListener("scroll", () => {
    if (window.scrollY > 20) { // Mostra o botão após 300px de rolagem
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

// Evento de clique para voltar ao topo
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Suavidade na rolagem
    });
});
    