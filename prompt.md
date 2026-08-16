# Prompt genérico — Mockup interativo de projeto (para integrar ao portfólio)

> Template reutilizável. Preencha os campos marcados com `[...]` e cole o prompt em uma LLM capaz de gerar código HTML/CSS/JS. O resultado é **apenas o mockup/simulador** de um único projeto, pronto para ser embutido na página de apresentação do portfólio. Os projetos listados servem apenas como exemplos de estrutura.

---

## Prompt

Você é um desenvolvedor front-end especializado em simuladores interativos. Gere **um único arquivo `mockup-<projeto>.html`** — o mockup/simulador de **um projeto** do meu portfólio — autossuficiente (HTML + CSS + JS embutidos, sem build steps), com tema escuro idêntico ao do meu site. **Não gere o site do portfólio, nem navegação, nem outras páginas**: gere somente o simulador deste projeto, pois ele será embutido dentro da página de apresentação já existente.

### 1. Contexto de integração

- **Site do portfólio**: portfólio pessoal com seções Home, Habilidades, Projetos e Contato. Cada card de projeto tem um botão "Ver mais de perto" que abre a página de apresentação do projeto (`pages/html/projetos/<projeto>.html`).
- **Página de apresentação**: possui hero com cover e meta (ano, função, stack, status), seções "Sobre o projeto", "Desafios e soluções", "Resultados", galeria e detalhes técnicos. O mockup será inserido nessa página, entre o hero e os detalhes, ocupando uma seção própria intitulada "Simulador" / "Explore o projeto".
- **Tema do site**: dark — fundo `[cor de fundo]`, superfícies `[cor]`, acentos `[cor primária]`, `[cor secundária]`, `[cor terciária]`. Fontes: `[títulos]` e `[corpo]`. Cards com borda sutilmente luminosa, gradientes e brilho. Idioma: português do Brasil.
- **Como será embutido**: o arquivo gerado pode ser carregado em um `<iframe>` dentro da página de apresentação (recomendado) ou colado inline. Por isso ele **não pode depender do CSS/JS externo do site** — tudo embutido no próprio arquivo. O mockup deve se adaptar à largura do contêiner (responsivo, testado em ~320px a ~1400px).

### 2. O projeto a simular

- **Título do projeto**: [título]
- **Categoria**: [Software / Hardware / IoT / IA / Outro]
- **Resumo do projeto**: [descrição em 1–2 frases]
- **Stack/Tecnologias**: [lista, ex.: Node.js, Express, PostgreSQL / ESP32, C++ / KiCad, GRBL / Python, YOLO]
- **O que o projeto faz**: [explicar o comportamento real do sistema, processos e funcionalidades que o simulador deve reproduzir]
- **Status**: [Concluído / Em andamento]
- **Blocos interativos desejados**: [lista da seção 3]
- **Dados fictícios de exemplo**: [sugestão dos valores/demonstrações a exibir]

### 3. Biblioteca de blocos interativos

Implemente como componentes reutilizáveis dentro do arquivo, instanciando apenas os blocos declarados para este projeto. Onde o conteúdo depende de arquivos/dados reais (STL, Gerber, imagens, datasets), use um placeholder visual claro (borda tracejada + rótulo) **com interatividade funcional de exemplo por baixo**.

- `dashboard`: painel de KPIs + gráficos (linha/barra/pizza) com alternância de tipo de visualização e botão "gerar novos dados".
- `graficos`: gráficos de séries temporais com eixos, legenda e slider para navegar o tempo (ex.: métricas por épocas, períodos, versões).
- `viewer-3d`: visualizador 3D (Three.js ou `<model-viewer>` via CDN) de uma representação do dispositivo, rotacionável com o mouse, com controles de animação quando fizer sentido.
- `pcb`: visualizador de circuito/PCB em SVG/CSS com camadas alternáveis (top copper, bottom copper, silkscreen, máscara) e elementos clicáveis que destacam conexões.
- `circuito`: diagrama de blocos de hardware (módulos e sensores) com toggles ligar/desligar que destacam os módulos ativos e atualizam um painel de telemetria ao vivo.
- `simulador`: simulação de um processo do projeto (ex.: fluxo de dados, fila, máquina) com botões iniciar/pausar e parâmetros ajustáveis.
- `terminal`: console simulado que "executa" comandos do projeto e imprime a saída com efeito de digitação.
- `codigo`: área com snippet de código do projeto, com syntax highlight simples e botão copiar.
- `inferencia`: área com imagem fictícia em que o usuário clica e marcadores (bounding boxes, rótulos, confiança) aparecem.
- `mapa`: mapa/rota interativo com marcadores animados (ex.: rastreamento, geolocalização).
- `timeline`: linha do tempo do projeto com marcos clicáveis que abrem detalhes de cada fase.
- `upload`: área de upload de arquivos (STL/STEP, Gerber, imagens, CSV) com fallback para o visualizador embutido correspondente.

### 4. Requisitos do mockup

- Autossuficiente em um único arquivo; sem dependência de CSS/JS do site; comentado em português.
- Sem espaçamentos excessivos; consistente com o tema dark; responsivo (desktop e mobile).
- Conter título do bloco ("Simulador — [nome do projeto]"), descrição curta de como usar e controles claros (botões, sliders, toggles com rótulos).
- Todos os dados exibidos são fictícios e rotulados como exemplo.
- CDNs (Three.js, Chart.js etc.) somente se necessárias, com fallback caso falhem.
- Incluir um pequeno cabeçalho interno com altura máxima compatível com iframe (evitar scroll dentro do iframe, ou avisar quando inevitável).

### Entrega

Responda com o código completo do `mockup-<projeto>.html` pronto para uso, comentado em português, e a lista das CDNs utilizadas. Nada além do mockup.
