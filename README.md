# Biopar Website — Presença Digital & Plataforma de Biointeligência Agronômica

Plataforma digital corporativa premium da **Biopar**, integrando catálogo técnico de soluções biológicas, inteligência de mercado em tempo real (commodities do agro) e hub de conteúdo científico.

---

## 🌟 Princípios de Experiência & Design System

- **Estética Minimalista Inspirada na Apple:** Linhas limpas, uso generoso de espaço em branco, tipografia nítida, cantos arredondados (`20px-28px`), botões estilo pílula/cápsula e sombras ultramacias.
- **Rigor Científico & Agronômico:**
  - Nomes científicos em *itálico* em todas as telas (ex: *Trichoderma harzianum*, *Bacillus subtilis*, *Azospirillum brasilense*).
  - Tabela de identidade técnica oficial com registro MAPA, concentrações em UFC/g ou UFC/mL e formulações registradas.
  - Resultados experimentais separados claramente de dados regulatórios, sempre com citação da instituição de pesquisa e safra.
- **Inteligência de Mercado Desacoplada (`MarketDataProvider`):**
  - Cotações com auto-refresh e status (*Live*, *Delayed*, *Cached*).
  - Indicadores físicos e futuros (Soja Paranaguá, Milho Campinas, Boi Gordo B3, USD/BRL PTAX, Café Arábica, Trigo PR, Algodão, Açúcar).
  - Atribuição oficial de fontes (CEPEA/ESALQ-USP, CME/CBOT, B3, Banco Central do Brasil, CONAB).
- **Calculadora Interativa de Dosagem:**
  - Estimativa dinâmica de volume de produto (L ou kg) e calda por hectare (ha) na página do produto.
- **Leitor Técnico com Barra de Progresso:**
  - Artigos completos com citações bibliográficas (ABNT) e produtos relacionados.

---

## 📍 Localização & Endereço Oficial

- **Endereço:** Estrada Rural Adroaldo José Bombardelli, S/N
- **Google Maps:** [https://maps.app.goo.gl/BYmNGKjw41yeP8T8A](https://maps.app.goo.gl/BYmNGKjw41yeP8T8A)

---

## 🚀 Como Executar

### Opção 1: Com o Node.js embutido do Antigravity
```powershell
& "C:\Users\Usuario\AppData\Roaming\Antigravity\bin\agy-node.cmd" server.js
```
Acesse no navegador: `http://localhost:3000`

### Opção 2: Abertura direta no navegador
Abra diretamente o arquivo `index.html` em qualquer navegador moderno.

---

## 📁 Estrutura de Pastas

```
biopar-website/
├── index.html                  # Shell HTML com Tailwind CDN e bootstrap SPA
├── server.js                   # Servidor HTTP ultrarrápido em Node.js puro
├── package.json                # Metadados do projeto
├── README.md                   # Documentação do projeto
├── src/
│   ├── css/
│   │   └── styles.css          # Design system, glassmorphism, sparklines e variáveis
│   ├── data/
│   │   ├── products.js         # Base de dados taxonômica e regulatória de produtos
│   │   ├── market.js           # Base de indicadores e fontes do agronegócio
│   │   ├── articles.js         # Artigos técnicos, autores e citações científicas
│   │   └── company.js          # Pilares institucionais e pipeline de P&D
│   ├── services/
│   │   ├── marketProvider.js   # Camada desacoplada de dados de mercado (Live/Cache)
│   │   └── router.js           # Roteador SPA fluido (/ , /produtos , /blog)
│   ├── components/
│   │   ├── Header.js           # Header sticky com glassmorphism e dropdown
│   │   ├── Footer.js           # Rodapé corporativo e avisos regulatórios MAPA
│   │   ├── MarketTicker.js     # Ticker de cotações em tempo real
│   │   ├── MarketModal.js      # Modal detalhado com gráfico de evolução
│   │   ├── ContactModal.js     # Modal de atendimento agronômico
│   │   ├── DoseCalculator.js   # Calculadora de dosagem por hectare
│   │   └── Toast.js            # Notificações contextuais
│   └── pages/
│       ├── HomePage.js         # Home com Hero, Mercado Agora, Soluções e Destaques
│       ├── CatalogPage.js      # Catálogo com busca e filtros multifacetados
│       ├── ProductDetailPage.js# Template de produto com dados de bula e ensaios
│       ├── BlogPage.js         # Hub de conhecimento com artigo em destaque
│       └── ArticleDetailPage.js# Leitor de artigos com barra de progresso
```
