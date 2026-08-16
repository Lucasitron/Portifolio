# lucasitron

![GitHub repo size](https://img.shields.io/github/repo-size/Lucasitron/Portifolio?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/Lucasitron/Portifolio?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/Lucasitron/Portifolio?style=for-the-badge)

> Portfólio pessoal de **Lucas G. S. Sousa** — desenvolvedor Back-end, graduando em Engenharia da Computação pela UFPA-CAMTUC, com foco em IoT, sistemas embarcados e Inteligência Artificial.

Este projeto é meu portfólio profissional: um site estático para apresentar quem sou, minhas habilidades e os projetos que desenvolvo — desde APIs e arquiteturas de software até dispositivos embarcados com ESP32 (CNC, bengala inteligente assistiva e sistemas para FabLab). Cada projeto possui uma página de detalhes com galeria, stack e resultados.

## 📁 Estrutura do Projeto

```
├── index.html
├── vercel.json
├── robots.txt
├── sitemap.xml
├── pages/
│   ├── css/
│   │   ├── style.css
│   │   └── projeto.css
│   ├── html/
│   │   ├── habilidades.html
│   │   ├── projetos.html
│   │   ├── contato.html
│   │   └── projetos/
│   │       ├── bengala.html
│   │       ├── cnc.html
│   │       ├── sigfab.html
│   │       ├── mockup-triaJus.html
│   │       └── _template-projeto.html
│   ├── js/
│   │   ├── app.js
│   │   └── projeto.js
│   └── IMG/
├── package.json
├── .gitignore
└── LICENSE
```

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas para as seguintes tarefas:

- [x] Estrutura base do projeto
- [x] Páginas principais (Início, Habilidades, Projetos, Contato)
- [x] Páginas de detalhes dos projetos (CNC, SigFab, Bengala)
- [x] Interface responsiva
- [x] Deploy e SEO (Vercel, sitemap e robots.txt)
- [ ] Novos projetos e atualização de conteúdo
- [ ] Integração com API

## 💻 Copia mas não faz igual

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente do **Node.js**
- Você tem uma máquina **Windows / Linux / Mac**
- Você instalou um editor de código (recomendado: **VS Code**)

## 🚀 Instalando

Para instalar o lucasitron, siga estas etapas:

**Linux e macOS:**
```bash
git clone https://github.com/Lucasitron/Portifolio.git
cd lucasitron
npm install
```

**Windows:**
```bash
git clone https://github.com/Lucasitron/Portifolio.git
cd lucasitron
npm install
```

## ☕ Usando

Para usar lucasitron, siga estas etapas:

```bash
# Iniciar o servidor local
npm run serve

# Ou em modo desenvolvimento
npm run dev
```

Abra o navegador e acesse `http://localhost:3000`

## 🚀 Deploy

O site é estático e roda na Vercel sem build. Para subir:

```bash
npx vercel --prod
```

## 🤝 Quem sou eu

Graduando em Engenharia da Computação pela UFPA-CAMTUC

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/lucasitron" title="Lucas Gonçalves">
        <img src="https://github.com/lucasitron.png" width="100px;" alt="Foto do Lucas Gonçalves"/><br>
        <sub>
          <b>Lucas Gonçalves</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.