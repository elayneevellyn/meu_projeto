# Idiomas Sousa — Website Institucional

Website moderno, responsivo e de alta performance para a escola de idiomas **Idiomas Sousa** (Sousa - PB). Cursos de Inglês, Espanhol, Francês, Italiano e Libras para crianças, jovens e adultos, em turmas e aulas individuais VIP.

---

## 🚀 Como Executar o Projeto

O projeto utiliza uma arquitetura estática leve com sistema de templates modulares em Python, sem dependências externas (apenas a biblioteca padrão do Python 3).

### 1. Compilar as Páginas
Para compilar os templates e gerar os arquivos HTML prontos para produção na raiz do projeto:

```bash
python build.py
```

### 2. Iniciar Servidor Local de Pré-Visualização
Para compilar e iniciar um servidor local automaticamente:

```bash
python build.py --serve
```
O site estará acessível em: `http://localhost:8000`

---

## 📁 Estrutura de Diretórios

```
meu_projeto/
├── build.py                  # Script de compilação modular e servidor local
├── index.html                # Página Início (gerada)
├── cursos.html               # Página Catálogo de Cursos (gerada)
├── escola.html               # Página A Escola e Estrutura (gerada)
├── precos-horarios.html      # Página Valores e Horários (gerada)
├── contato.html              # Página Contato e Atendimento (gerada)
│
├── css/
│   └── style.css             # Folha de estilos unificada (Design System)
│
├── js/
│   └── main.js               # JavaScript interativo (Menu, FAQ, partículas, filtros, cópia rápida)
│
├── imagens/                  # Banners cinematográficos 16:9 e imagens dos cursos
│   ├── fundo-hero.jpg        # Hero principal (index.html)
│   ├── banner-cursos.jpg     # Hero da página de cursos
│   ├── banner-escola.jpg     # Hero da página da escola
│   ├── banner-metodologia.jpg# Hero da página de preços e horários
│   ├── banner-contato.jpg    # Hero da página de contato
│   └── curso-*.webp          # Imagens individuais dos cursos
│
└── templates/                # Arquitetura modular de componentes
    ├── layouts/
    │   └── base.html         # Template base HTML (Head, meta, scripts)
    ├── components/
    │   ├── header.html       # Cabeçalho global com navegação e status ativo
    │   ├── footer.html       # Rodapé institucional completo
    │   ├── promo-ribbon.html # Faixa superior de avisos e matrículas
    │   └── floating-whatsapp.html # Botão flutuante de WhatsApp
    └── pages/
        ├── index.html        # Conteúdo da página Início
        ├── cursos.html       # Conteúdo da página Cursos
        ├── escola.html       # Conteúdo da página A Escola
        ├── precos-horarios.html # Conteúdo da página Preços e Horários
        └── contato.html      # Conteúdo da página Contato
```

---

## 🎨 Identidade Visual e Recursos

- **Design System**: Tipografia `Inter` combinada com toques humanos e acolhedores em `Caveat` (cursiva).
- **Heróis Cinematográficos**: Animação sutil de movimento (Ken Burns parallax), iluminação suave e micropartículas de luz estelar em `<canvas>`.
- **Conexão Visual**: Fundos temáticos nos cards de contato final derivados da imagem principal de cada página.
- **Microinterações**:
  - Acordeão interativo para FAQ em `precos-horarios.html`
  - Filtro interativo de cursos por categoria em `cursos.html`
  - Copiar dados de contato com 1 clique em `contato.html`
  - Integração direta com WhatsApp em formulários e botões de ação
  - Navegação mobile com drawer responsivo
- **Acessibilidade e Desempenho**:
  - Respeito à preferência de movimento reduzido (`prefers-reduced-motion`)
  - Alto contraste em títulos e textos sobre as imagens de fundo
  - Imagens otimizadas com proporção 16:9 e carregamento sob demanda

---

## 📄 Licença e Direitos

&copy; 2026 Idiomas Sousa. Todos os direitos reservados. Sousa - PB.
