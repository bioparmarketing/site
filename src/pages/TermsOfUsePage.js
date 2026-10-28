/**
 * Página: Termos de Uso (/termos)
 * Em conformidade com o Marco Civil da Internet (Lei nº 12.965/2014),
 * Código Civil Brasileiro, Código de Defesa do Consumidor e regulamentação
 * fitossanitária e agronômica do MAPA (Ministério da Agricultura e Pecuária).
 */

import { companyData } from '../data/company.js';
import { createLegalHeader } from '../components/LegalNav.js';
import { openContactModal } from '../components/ContactModal.js';

export function createTermsOfUsePage({ router }) {
  const container = document.createElement('div');
  container.className = 'w-full bg-white min-h-screen text-[#1D1D1F]';

  // Cabeçalho compartilhado do Hub Jurídico
  const header = createLegalHeader({
    activeTab: 'termos',
    title: 'Termos e Condições de Uso',
    subtitle: 'Diretrizes legais, propriedade intelectual, regulamentação agronômica oficial do MAPA e condições gerais para navegação e utilização dos serviços digitais da Biopar.'
  });

  const content = document.createElement('div');
  content.className = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12';

  content.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- Menu Lateral de Navegação Rápida (Sumário Fixo) -->
      <aside class="lg:col-span-4 order-2 lg:order-1">
        <div class="sticky top-28 bg-[#F5F5F7] p-6 rounded-2xl border border-neutral-200/80 space-y-4">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600">
            <svg class="w-4 h-4 text-[#60B73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Neste Documento
          </div>
          
          <nav class="space-y-1.5 text-xs font-medium text-neutral-600">
            <a href="#aceitacao" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">1. Aceitação & Objeto</a>
            <a href="#aviso-agronomico" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">2. Aviso Regulatório MAPA</a>
            <a href="#propriedade-intelectual" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">3. Propriedade Intelectual</a>
            <a href="#cotacoes-mercado" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">4. Cotações Agro & Indicadores</a>
            <a href="#conduta-usuario" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">5. Conduta e Obrigações</a>
            <a href="#limitacao-responsabilidade" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">6. Limitação de Responsabilidade</a>
            <a href="#foro" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">7. Legislação & Foro</a>
          </nav>

          <div class="pt-4 border-t border-neutral-200/80">
            <div class="text-[11px] text-neutral-500 mb-2">Precisa de esclarecimentos técnicos ou bulas oficiais registradas?</div>
            <button id="btn-terms-contact" class="w-full text-center py-2.5 px-3 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer">
              Falar com Engenharia Agronômica
            </button>
          </div>
        </div>
      </aside>

      <!-- Corpo dos Termos de Uso -->
      <main class="lg:col-span-8 order-1 lg:order-2 space-y-10 text-neutral-700 leading-relaxed text-sm">

        <!-- Alerta Obrigatório: Regulatório MAPA & Receituário Agronômico -->
        <div class="p-6 bg-[#EBF7E7]/60 border border-[#60B73F]/40 rounded-2xl space-y-3">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#007A42]">
            <svg class="w-4 h-4 text-[#60B73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Aviso Regulatório Obrigatório — Ministério da Agricultura e Pecuária (MAPA)
          </div>
          <p class="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
            ${companyData.regulatoryDisclaimer}
          </p>
          <div class="text-[11px] text-neutral-600">
            * Todas as recomendações de aplicação, dosagem por hectare e alvos biológicos contidas neste site devem ser estritamente referendadas por um Engenheiro Agrônomo responsável, mediante emissão do competente Receituário Agronômico.
          </div>
        </div>

        <!-- 1. Aceitação & Objeto -->
        <section id="aceitacao" class="space-y-3 pt-2 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">1. Aceitação dos Termos & Objeto</h2>
          <p>
            Bem-vindo ao portal da <strong>${companyData.legalName}</strong>. Ao acessar, navegar ou utilizar qualquer funcionalidade do nosso site, você declara ter lido, compreendido e concordado integralmente com estes Termos de Uso e com a nossa Política de Privacidade.
          </p>
          <p>
            O portal tem por objetivo institucional e informativo divulgar o catálogo científico de soluções de controle biológico e nutrição de plantas (biofungicidas, bioinseticidas, inoculantes e promotores de crescimento), aproximar produtores e cooperativas da nossa equipe técnica e disponibilizar dados de inteligência agronômica de mercado.
          </p>
        </section>

        <!-- 2. Aviso Regulatório MAPA -->
        <section id="aviso-agronomico" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">2. Natureza das Informações Técnicas e Agronômicas</h2>
          <p>
            As fichas técnicas, dosagens sugeridas, espectros de controle de pragas e doenças e modos de ação descritos nas páginas dos produtos (ex.: Trixma®, MB Control®, BPR Tetra®) derivam diretamente dos registros oficiais outorgados pelos órgãos reguladores competentes: <strong>Ministério da Agricultura e Pecuária (MAPA), ANVISA e IBAMA</strong>.
          </p>
          <p>
            No entanto, a eficácia agronômica de agentes biológicos vivos no campo está intrinsecamente vinculada a fatores edafoclimáticos locais, tais como:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li>Temperatura ambiente e umidade relativa no momento da pulverização;</li>
            <li>Horário de aplicação (priorizando períodos de baixa radiação ultravioleta);</li>
            <li>Qualidade da calda, pH da água e compatibilidade em misturas de tanque com outros defensivos ou fertilizantes;</li>
            <li>Condições e calibração correta de pontas e bicos de pulverização.</li>
          </ul>
          <p class="pt-2 text-xs bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            <strong>Importante:</strong> Nenhuma informação contida neste site substitui a consulta direta ao profissional legalmente habilitado (Engenheiro Agrônomo). Leia sempre a bula oficial que acompanha o produto antes de sua utilização.
          </p>
        </section>

        <!-- 3. Propriedade Intelectual -->
        <section id="propriedade-intelectual" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">3. Propriedade Intelectual e Científica</h2>
          <p>
            Todos os elementos presentes neste portal são de propriedade exclusiva da <strong>${companyData.legalName}</strong> ou de seus licenciantes e parceiros científicos, estando protegidos pela Lei de Propriedade Industrial (Lei nº 9.279/1996) e Lei de Direitos Autorais (Lei nº 9.610/1998):
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li><strong>Marcas Registradas e Nomes Comerciais:</strong> incluindo marcas de produtos, logotipos da Biopar e identidade visual corporativa;</li>
            <li><strong>Conteúdo Científico e Didático:</strong> artigos técnicos, laudos de ensaios agronômicos, tabelas de compatibilidade microbiológica e dados de isolados genômicos;</li>
            <li><strong>Mídias e Fotografias Oficiais:</strong> fotografias oficiais de embalagens, apresentações comerciais de produtos e banco de imagens de bioalvos;</li>
            <li><strong>Código-fonte e Arquitetura:</strong> layouts, componentes visuais, animações em canvas e arquitetura digital da plataforma.</li>
          </ul>
          <p class="pt-2">
            É expressamente proibida a reprodução, distribuição, modificação, engenharia reversa ou exploração comercial desautorizada de qualquer material sem o prévio e expresso consentimento por escrito da Biopar.
          </p>
        </section>

        <!-- 4. Cotações Agro & Indicadores -->
        <section id="cotacoes-mercado" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">4. Cotações Agro e Indicadores de Mercado</h2>
          <p>
            Os módulos de cotações agropecuárias (ex.: Soja Paranaguá, Milho Campinas, Boi Gordo B3, Dólar PTAX) exibidos na página inicial e nas páginas de inteligência de mercado têm caráter estritamente consultivo e informativo para suporte à tomada de decisão do produtor rural.
          </p>
          <p>
            Tais indicadores podem sofrer atrasos regulatórios de bolsas de mercadorias ou flutuações de praças regionais e não constituem oferta vinculante ou recomendação de compra/venda de ativos financeiros e commodities.
          </p>
        </section>

        <!-- 5. Conduta e Obrigações -->
        <section id="conduta-usuario" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">5. Conduta e Obrigações do Usuário</h2>
          <p>
            Ao utilizar o website da Biopar, você se compromete a:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li>Fornecer dados verídicos, exatos e atualizados ao solicitar contato ou orçamentos;</li>
            <li>Não utilizar mecanismos automatizados (bots, crawlers, spiders) para sobrecarregar nossos servidores ou raspar conteúdos de forma predatória;</li>
            <li>Respeitar a integridade das comunicações e não disseminar códigos maliciosos, vírus ou cavalos de troia;</li>
            <li>Respeitar as recomendações técnicas agronômicas legais relativas à destinação correta de embalagens vazias de insumos (logística reversa do inpEV) e uso de Equipamentos de Proteção Individual (EPI).</li>
          </ul>
        </section>

        <!-- 6. Limitação de Responsabilidade -->
        <section id="limitacao-responsabilidade" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">6. Limitação de Responsabilidade</h2>
          <p>
            Nos limites permitidos pela legislação aplicável, a Biopar não se responsabiliza por:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li>Perdas de produtividade ou falhas de controle fitossanitário decorrentes de aplicação em desacordo com as instruções de bula ou sem acompanhamento técnico agronômico;</li>
            <li>Danos ocasionados por armazenamento de produtos biológicos sob temperaturas superiores às recomendadas ou exposição direta à insolação por parte de distribuidores ou produtores;</li>
            <li>Interrupções temporárias de acesso ao site decorrentes de falhas gerais de telecomunicações, provedores terceiros ou manutenções programadas;</li>
            <li>Links para sites de terceiros (como Google Maps, órgãos reguladores ou cooperativas parceiras), cujo conteúdo e políticas são de exclusiva responsabilidade de seus respectivos mantenedores.</li>
          </ul>
        </section>

        <!-- 7. Legislação & Foro -->
        <section id="foro" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">7. Legislação Aplicável e Foro de Eleição</h2>
          <p>
            Estes Termos de Uso são regidos e interpretados em conformidade com as leis da República Federativa do Brasil, em especial o Marco Civil da Internet (Lei nº 12.965/2014) e o Código Civil.
          </p>
          <p>
            Fica eleito o Foro da Comarca da sede da <strong>${companyData.legalName}</strong> para dirimir quaisquer litígios ou controvérsias decorrentes destes Termos, com expressa renúncia a qualquer outro foro, por mais privilegiado que seja ou venha a ser.
          </p>
        </section>

      </main>
    </div>
  `;

  content.querySelector('#btn-terms-contact')?.addEventListener('click', () => openContactModal());

  container.appendChild(header);
  container.appendChild(content);

  return container;
}
