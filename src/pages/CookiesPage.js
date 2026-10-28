/**
 * Página: Política e Gestão de Cookies (/cookies)
 * Em conformidade com a LGPD (Lei nº 13.709/2018) e com o Guia Orientativo de Cookies da ANPD.
 * Inclui painel interativo de preferências com persistência em localStorage e tabela técnica.
 */

import { companyData } from '../data/company.js';
import { createLegalHeader } from '../components/LegalNav.js';
import { showToast } from '../components/Toast.js';

export function createCookiesPage({ router }) {
  const container = document.createElement('div');
  container.className = 'w-full bg-white min-h-screen text-[#1D1D1F]';

  // Cabeçalho compartilhado do Hub Jurídico
  const header = createLegalHeader({
    activeTab: 'cookies',
    title: 'Política e Gestão de Cookies',
    subtitle: 'Entenda como e por que utilizamos cookies no portal da Biopar e gerencie suas preferências de privacidade de forma simples, transparente e em total conformidade com a ANPD.'
  });

  const content = document.createElement('div');
  content.className = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12';

  // Carrega preferências salvas no navegador
  const savedPrefs = JSON.parse(localStorage.getItem('biopar_cookie_preferences') || JSON.stringify({
    necessary: true,
    performance: true,
    functionality: true,
    marketing: false
  }));

  content.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- Menu Lateral de Navegação Rápida (Sumário Fixo) -->
      <aside class="lg:col-span-4 order-2 lg:order-1">
        <div class="sticky top-28 bg-[#F5F5F7] p-6 rounded-2xl border border-neutral-200/80 space-y-4">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600">
            <svg class="w-4 h-4 text-[#60B73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Neste Documento
          </div>
          
          <nav class="space-y-1.5 text-xs font-medium text-neutral-600">
            <a href="#o-que-sao" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">1. O que são Cookies?</a>
            <a href="#painel-preferencias" class="block py-1.5 px-2.5 rounded-lg text-[#007A42] font-bold bg-[#EBF7E7]/80 hover:bg-[#EBF7E7] transition-colors">2. Painel de Preferências</a>
            <a href="#categorias" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">3. Categorias de Cookies</a>
            <a href="#tabela-cookies" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">4. Tabela de Cookies Biopar</a>
            <a href="#como-desativar" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">5. Como Desativar no Navegador</a>
            <a href="#duvidas" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">6. Dúvidas & Canal DPO</a>
          </nav>

          <div class="pt-4 border-t border-neutral-200/80">
            <div class="text-[11px] text-neutral-500 mb-2">Deseja revisar seus dados pessoais coletados?</div>
            <a href="#/privacidade" data-link class="block w-full text-center py-2.5 px-3 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-900 text-xs font-semibold transition-colors">
              Ver Política de Privacidade
            </a>
          </div>
        </div>
      </aside>

      <!-- Corpo da Política de Cookies -->
      <main class="lg:col-span-8 order-1 lg:order-2 space-y-10 text-neutral-700 leading-relaxed text-sm">

        <!-- 1. O que são Cookies -->
        <section id="o-que-sao" class="space-y-3 pt-2 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">1. O que são Cookies e por que a Biopar os utiliza?</h2>
          <p>
            Cookies são pequenos arquivos de texto enviados e armazenados no seu navegador ou dispositivo quando você visita o site da <strong>${companyData.legalName}</strong>. Eles atuam como a "memória" da sua navegação, permitindo que a plataforma reconheça seu dispositivo em acessos futuros.
          </p>
          <p>
            No portal da Biopar, utilizamos cookies para garantir que a arquitetura do catálogo de bioinsumos funcione com extrema rapidez, para manter a segurança do site, memorizar filtros de soluções biológicas selecionadas e entender de forma estatística e anônima como nossos visitantes interagem com conteúdos e cotações agrícolas.
          </p>
        </section>

        <!-- 2. Painel Interativo de Preferências -->
        <section id="painel-preferencias" class="space-y-4 pt-4 border-t border-neutral-100 scroll-mt-28">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">2. Painel Interativo de Preferências de Cookies</h2>
              <p class="text-xs text-neutral-500 mt-1">Personalize abaixo quais tipos de cookies você autoriza a Biopar utilizar no seu dispositivo.</p>
            </div>
            <span class="hidden sm:inline-block text-[11px] font-semibold text-[#007A42] bg-[#EBF7E7] px-3 py-1 rounded-full border border-[#60B73F]/30">
              Diretriz ANPD
            </span>
          </div>

          <form id="cookie-preferences-form" class="bg-[#F5F5F7] p-6 rounded-2xl border border-neutral-200 space-y-5">
            
            <!-- Cookies Necessários -->
            <div class="flex items-start justify-between gap-4 pb-4 border-b border-neutral-200/80">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-neutral-900 text-sm">Cookies Estritamente Necessários</span>
                  <span class="text-[10px] uppercase font-bold text-neutral-700 bg-neutral-200 px-2 py-0.5 rounded">Sempre Ativos</span>
                </div>
                <p class="text-xs text-neutral-500">
                  Fundamentais para o funcionamento do portal, roteamento rápido da SPA, segurança contra ataques cibernéticos e registro do seu consentimento. Não podem ser desligados.
                </p>
              </div>
              <div class="pt-1">
                <input type="checkbox" checked disabled class="w-5 h-5 accent-[#60B73F] cursor-not-allowed opacity-70" />
              </div>
            </div>

            <!-- Cookies de Desempenho e Analíticos -->
            <div class="flex items-start justify-between gap-4 pb-4 border-b border-neutral-200/80">
              <div class="space-y-1">
                <div class="font-bold text-neutral-900 text-sm">Cookies de Desempenho e Análise Agronômica</div>
                <p class="text-xs text-neutral-500">
                  Coletam dados anônimos sobre quais fichas técnicas de produtos (ex.: biofungicidas ou bioinseticidas) são mais consultadas, tempo de carregamento e taxas de erro técnico para contínua otimização da plataforma.
                </p>
              </div>
              <div class="pt-1">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="pref-performance" class="sr-only peer" ${savedPrefs.performance ? 'checked' : ''}>
                  <div class="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#60B73F]"></div>
                </label>
              </div>
            </div>

            <!-- Cookies de Funcionalidade -->
            <div class="flex items-start justify-between gap-4 pb-4 border-b border-neutral-200/80">
              <div class="space-y-1">
                <div class="font-bold text-neutral-900 text-sm">Cookies de Funcionalidade e Preferências</div>
                <p class="text-xs text-neutral-500">
                  Permitem que o site memorize seleções do produtor rural (filtros ativos de pragas ou culturas, opções de cotação regional e estados selecionados) para uma experiência personalizada.
                </p>
              </div>
              <div class="pt-1">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="pref-functionality" class="sr-only peer" ${savedPrefs.functionality ? 'checked' : ''}>
                  <div class="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#60B73F]"></div>
                </label>
              </div>
            </div>

            <!-- Cookies de Marketing -->
            <div class="flex items-start justify-between gap-4">
              <div class="space-y-1">
                <div class="font-bold text-neutral-900 text-sm">Cookies de Marketing e Comunicação</div>
                <p class="text-xs text-neutral-500">
                  Utilizados para mensurar o alcance de campanhas de lançamento de novos biológicos da Biopar e eventos do agronegócio, sem rastreamento invasivo.
                </p>
              </div>
              <div class="pt-1">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="pref-marketing" class="sr-only peer" ${savedPrefs.marketing ? 'checked' : ''}>
                  <div class="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#60B73F]"></div>
                </label>
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200">
              <button type="button" id="btn-accept-all-cookies" class="btn-pill-secondary text-xs font-semibold px-4 py-2">
                Aceitar Todos os Cookies
              </button>
              <button type="submit" class="btn-pill-primary text-xs font-bold px-6 py-2.5 shadow-md">
                Salvar Minhas Preferências
              </button>
            </div>

          </form>
        </section>

        <!-- 3. Categorias Detalhadas -->
        <section id="categorias" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">3. Detalhamento das Categorias de Cookies</h2>
          <p>
            Em conformidade com a Lei Federal nº 13.709/2018 (LGPD) e o Guia Orientativo de Cookies da ANPD, estruturamos os arquivos utilizados nas seguintes modalidades:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
              <div class="font-bold text-neutral-900 text-xs">A. Cookies Primários (First-Party)</div>
              <div class="text-xs text-neutral-600">Emitidos diretamente pelo domínio da Biopar, utilizados para gerenciar seu ciclo de navegação e filtros locais.</div>
            </div>
            <div class="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
              <div class="font-bold text-neutral-900 text-xs">B. Cookies de Terceiros (Third-Party)</div>
              <div class="text-xs text-neutral-600">Geridos por provedores homologados de tecnologia (ex.: mapas de localização Google Maps e ferramentas analíticas).</div>
            </div>
            <div class="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
              <div class="font-bold text-neutral-900 text-xs">C. Cookies de Sessão</div>
              <div class="text-xs text-neutral-600">Arquivos temporários excluídos automaticamente assim que você fecha o seu navegador.</div>
            </div>
            <div class="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
              <div class="font-bold text-neutral-900 text-xs">D. Cookies Persistentes</div>
              <div class="text-xs text-neutral-600">Permanecem gravados pelo período estipulado em sua data de expiração para guardar suas preferências de safra.</div>
            </div>
          </div>
        </section>

        <!-- 4. Tabela de Cookies -->
        <section id="tabela-cookies" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">4. Tabela Técnica de Cookies Utilizados</h2>
          <p>
            Abaixo detalhamos a finalidade técnica específica de cada cookie gerado ou utilizado neste portal:
          </p>

          <div class="overflow-x-auto pt-2">
            <table class="w-full text-left text-xs border border-neutral-200 rounded-lg overflow-hidden">
              <thead class="bg-neutral-100 text-neutral-800 font-bold">
                <tr>
                  <th class="p-3 border-b border-neutral-200">Cookie</th>
                  <th class="p-3 border-b border-neutral-200">Categoria</th>
                  <th class="p-3 border-b border-neutral-200">Finalidade</th>
                  <th class="p-3 border-b border-neutral-200">Duração</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-200">
                <tr>
                  <td class="p-3 font-mono font-bold text-neutral-900">biopar_cookie_preferences</td>
                  <td class="p-3 text-neutral-600">Necessário</td>
                  <td class="p-3 text-neutral-600">Guarda suas opções de consentimento escolhidas no painel de cookies.</td>
                  <td class="p-3 text-neutral-800 font-semibold">12 meses</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-neutral-900">biopar_market_cache</td>
                  <td class="p-3 text-neutral-600">Funcionalidade</td>
                  <td class="p-3 text-neutral-600">Mantém em cache os índices de cotações agro para navegação instantânea.</td>
                  <td class="p-3 text-neutral-800 font-semibold">Sessão</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-neutral-900">_ga / _gid</td>
                  <td class="p-3 text-neutral-600">Desempenho</td>
                  <td class="p-3 text-neutral-600">Contabiliza acessos e páginas visitadas anonimamente (Google Analytics).</td>
                  <td class="p-3 text-neutral-800 font-semibold">24 meses / 24h</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-neutral-900">biopar_catalog_filter</td>
                  <td class="p-3 text-neutral-600">Funcionalidade</td>
                  <td class="p-3 text-neutral-600">Lembra o último filtro selecionado no portfólio de biofungicidas ou bioinseticidas.</td>
                  <td class="p-3 text-neutral-800 font-semibold">30 dias</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 5. Como Desativar no Navegador -->
        <section id="como-desativar" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">5. Como Gerenciar ou Desativar Cookies no seu Navegador</h2>
          <p>
            Além do nosso painel de preferências acima, a maioria dos navegadores permite bloquear ou excluir cookies instalados nas configurações de privacidade:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li><strong>Google Chrome:</strong> Configurações > Privacidade e Segurança > Cookies e outros dados do site;</li>
            <li><strong>Mozilla Firefox:</strong> Opções > Privacidade e Segurança > Cookies e dados de sites;</li>
            <li><strong>Apple Safari:</strong> Preferências > Privacidade > Gerenciar dados de sites;</li>
            <li><strong>Microsoft Edge:</strong> Configurações > Permissões do site > Cookies e dados armazenados.</li>
          </ul>
          <p class="pt-2 text-xs text-neutral-500">
            * Nota: A desativação completa de cookies essenciais pode afetar a navegação fluida em rotas e funcionalidades específicas do portal.
          </p>
        </section>

        <!-- 6. Dúvidas & Canal DPO -->
        <section id="duvidas" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">6. Dúvidas sobre Gestão de Cookies e LGPD</h2>
          <p>
            Caso você tenha qualquer dúvida sobre a coleta e gerenciamento de cookies pela Biopar ou queira solicitar detalhes sobre o tratamento de dados pessoais, fale diretamente com o Encarregado pelo Tratamento de Dados (DPO):
          </p>
          <div class="bg-[#F5F5F7] p-5 rounded-xl border border-neutral-200 text-xs sm:text-sm space-y-1.5">
            <div><strong>Atendimento e Encarregado (DPO):</strong> comercial@biopar.agr.br</div>
            <div><strong>Atendimento Telefônico:</strong> ${companyData.contactChannels.phone}</div>
            <div><strong>Horário de Atendimento:</strong> ${companyData.contactChannels.operatingHours}</div>
          </div>
        </section>

      </main>
    </div>
  `;

  // Interatividade do Painel de Cookies
  const form = content.querySelector('#cookie-preferences-form');
  const btnAcceptAll = content.querySelector('#btn-accept-all-cookies');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPrefs = {
        necessary: true,
        performance: content.querySelector('#pref-performance').checked,
        functionality: content.querySelector('#pref-functionality').checked,
        marketing: content.querySelector('#pref-marketing').checked
      };

      localStorage.setItem('biopar_cookie_preferences', JSON.stringify(newPrefs));
      showToast('Suas preferências de cookies foram salvas com sucesso!', 'success');
    });
  }

  if (btnAcceptAll) {
    btnAcceptAll.addEventListener('click', () => {
      content.querySelector('#pref-performance').checked = true;
      content.querySelector('#pref-functionality').checked = true;
      content.querySelector('#pref-marketing').checked = true;

      const newPrefs = {
        necessary: true,
        performance: true,
        functionality: true,
        marketing: true
      };

      localStorage.setItem('biopar_cookie_preferences', JSON.stringify(newPrefs));
      showToast('Todos os cookies foram autorizados com sucesso!', 'success');
    });
  }

  container.appendChild(header);
  container.appendChild(content);

  return container;
}
