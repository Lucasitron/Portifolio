//retorno correto da saudação
function saud(){
    //Captando a data e o horario locais
    const data = new Date();
    const hora = data.getTime();
    let saudacao;


    //definindo a saudação
    switch (saudação){
        case hora > 6 && hora <= 12:
            saudacao = "Bom dia";
            break;
        case hora > 12 && hora <= 18:
            saudacao = "Boa tarde";
            break;
        default:
            saudacao = "Boa noite";
    }
    return saudacao;
}


// Exibe a saudação no elemento com o ID "saudacao"
document.addEventListener("DOMContentLoaded", () => {
    const saudacaoElement = document.getElementById("saudacao");
    if (saudacaoElement) {
        saudacaoElement.textContent = saud();
    }
});


// Seleciona todos os links do menu
const navLinks = document.querySelectorAll("nav ul li a");

// Função para destacar o menu ativo
function highlightMenu() {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 50; // Ajuste para o tamanho do menu
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href").substring(1) === section.id) {
                    link.classList.add("active");
                }
            });
        }
    });
}

// Adiciona o evento de scroll
window.addEventListener("scroll", highlightMenu);
