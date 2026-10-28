/**
 * Landing Page de Alta Conversão para Produtores Rurais (/produtor)
 * Linguagem direta, informal e convincente, sem juridiquês ou jargões excessivos.
 * Foco em resolução de dores do agricultor, quebra de objeções, calculadora interativa de retorno (ROI)
 * e conversão imediata para WhatsApp e consultoria agronômica de fábrica.
 */

import { companyData } from '../data/company.js';
import { products } from '../data/products.js';
import { showToast } from '../components/Toast.js';
import { openContactModal } from '../components/ContactModal.js';
import { leadService } from '../services/leadService.js';

export function createProducerPage({ router }) {
  const container = document.createElement('div');
  container.className = 'w-full bg-white text-neutral-900 min-h-screen selection:bg-[#60B73F]/20 selection:text-neutral-900';

  // Produtos Destaque para o Produtor
  const trixma = products.find(p => p.id === 'trixma') || products[0];
  const mbControl = products.find(p => p.id === 'mb-control') || products[1];
  const bprTetra = products.find(p => p.id === 'bpr-tetra') || products[2];

  container.innerHTML = `
    <!-- 1. Barra de Alerta Superior Estilo Vidro com Animação Marquee de Urgência -->
    <div class="relative overflow-hidden bg-black/70 backdrop-blur-xl border-b border-white/10 text-white text-xs font-semibold py-3 shadow-inner z-30">
      <div class="flex select-none">
        <div class="animate-urgent-ticker flex items-center tracking-[0.08em] uppercase text-[11px] sm:text-xs">
          
          <!-- Bloco 1 -->
          <div class="flex items-center gap-6 shrink-0 pr-8">
            <span class="font-black text-[#60B73F]">SAFRA 2024/2025:</span>
            <span>Condições especiais direto da fábrica para produtores</span>
            <span class="text-neutral-400 font-bold px-3">—</span>
            <span>Frete refrigerado até a fazenda</span>
            <span class="text-neutral-400 font-bold px-3">—</span>
            <span>Suporte agronômico</span>
            <span class="text-neutral-400 font-bold px-3">—</span>
            <span class="text-[#60B73F] font-bold">Lotes com preço direto de fábrica</span>
            <span class="text-neutral-400 font-bold px-3">—</span>
          </div>

          <!-- Bloco 2 (Loop Infinito Contínuo) -->
          <div class="flex items-center gap-6 shrink-0 pr-8" aria-hidden="true">
            <span class="font-black text-[#60B73F]">SAFRA 2024/2025:</span>
            <span>Condições especiais direto da fábrica para produtores</span>
            <span class="text-neutral-400 font-bold px-3">—</span>
            <span>Frete refrigerado até a fazenda</span>
            <span class="text-neutral-400 font-bold px-3">—</span>
            <span>Suporte agronômico</span>
            <span class="text-neutral-400 font-bold px-3">—</span>
            <span class="text-[#60B73F] font-bold">Lotes com preço direto de fábrica</span>
            <span class="text-neutral-400 font-bold px-3">—</span>
          </div>

        </div>
      </div>
    </div>

    <!-- 2. HERO SECTION DE ALTA CONVERSÃO -->
    <section class="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 border-b border-neutral-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Lado Esquerdo: Promessa Forte, Dores e Prova Social -->
          <div class="lg:col-span-7 space-y-6">
            
            <div class="inline-flex items-center gap-2 bg-[#EBF7E7] text-[#007A42] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#60B73F]/30 shadow-sm">
              <svg class="w-4 h-4 text-[#60B73F]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              DIRETO DA INDÚSTRIA PARA A SUA LAVOURA
            </div>

            <h1 class="text-3xl sm:text-5xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[1.12]">
              Cansado de gastar rios de dinheiro em químico e a praga <span class="text-[#60B73F]">continuar roubando suas sacas?</span>
            </h1>

            <p class="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
              O defensivo tradicional perdeu eficácia por resistência. Nossos <strong>produtos biológicos líquidos de alta concentração</strong> atacam as doenças de solo e sugadores na raiz, destravam o adubo preso na terra e garantem <strong>mais sacas colhidas por hectare</strong> com custo que fecha a conta.
            </p>

            <!-- 3 Selos de Confiança Imediata -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div class="p-3 bg-white rounded-xl border border-neutral-200/80 shadow-xs flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full bg-[#EBF7E7] text-[#007A42] flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                <span class="text-xs font-semibold text-neutral-800">Não entope bico de pulverizador</span>
              </div>
              <div class="p-3 bg-white rounded-xl border border-neutral-200/80 shadow-xs flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full bg-[#EBF7E7] text-[#007A42] flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                <span class="text-xs font-semibold text-neutral-800">100% Registro MAPA Oficial</span>
              </div>
              <div class="p-3 bg-white rounded-xl border border-neutral-200/80 shadow-xs flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full bg-[#EBF7E7] text-[#007A42] flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                <span class="text-xs font-semibold text-neutral-800">Assistência do agrônomo no campo</span>
              </div>
            </div>

            <!-- Botões Rápidos de Ação -->
            <div class="pt-2 flex flex-wrap items-center gap-4">
              <a 
                href="https://wa.me/5545991312295?text=Ol%C3%A1%2C%20sou%20produtor%20rural%20e%20quero%20conhecer%20as%20solu%C3%A7%C3%B5es%20da%20Biopar%20para%20minha%20lavoura." 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2.5 bg-[#60B73F] hover:bg-[#52A633] text-white text-base font-bold px-7 py-4 rounded-full shadow-lg shadow-[#60B73F]/25 transition-all transform hover:-translate-y-0.5"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.771.867 2.796.867 3.183 0 5.769-2.586 5.77-5.766.001-3.18-2.585-5.754-5.77-5.754zm3.364 8.243c-.14.394-.714.733-1.019.78-.305.048-.686.068-1.954-.457-1.623-.672-2.67-2.315-2.751-2.423-.081-.108-.66-879-.66-1.674 0-.796.417-1.189.565-1.351.148-.162.324-.203.432-.203.108 0 .216 0 .311.006.101.007.236-.038.37.284.14.338.473 1.15.513 1.233.04.083.067.18.013.288-.053.108-.08.175-.16.27-.08.095-.169.212-.241.285-.081.08-.166.168-.071.332.095.163.421.696.903 1.127.621.554 1.144.726 1.307.807.162.081.257.068.351-.041.095-.108.405-.473.513-.635.108-.162.216-.135.365-.081.148.054.945.446 1.107.527.162.081.27.122.311.189.04.068.04.393-.1.787z"/>
                </svg>
                <span>Falar com o Agrônomo no WhatsApp</span>
              </a>

              <a 
                href="#calculadora" 
                class="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-700 hover:text-black py-3 px-4 rounded-full bg-white border border-neutral-300 hover:border-neutral-400 transition-colors"
              >
                <span>Calcular ganho da minha safra</span>
                <svg class="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </a>
            </div>

            <div class="pt-2 text-xs text-neutral-500 flex items-center gap-4">
              <span>⚡ Resposta média em 5 minutos</span>
              <span>•</span>
              <span>🔒 Cotação sem compromisso</span>
            </div>

          </div>

          <!-- Lado Direito: Formulário de Cotação Rápida no Próprio Bloco -->
          <div class="lg:col-span-5">
            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-200 ring-1 ring-black/5 relative">
              
              <div class="absolute -top-3 right-6 bg-[#60B73F] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                Atendimento Direto da Fábrica
              </div>

              <h2 class="text-xl font-black text-neutral-900 tracking-tight">Simule o Manejo da Sua Fazenda</h2>
              <p class="text-xs text-neutral-500 mt-1">Preencha em menos de 1 minuto e receba a dosagem recomendada para o seu talhão.</p>

              <form id="hero-lead-form" class="mt-5 space-y-3.5">
                <div>
                  <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">Seu Nome / Nome da Fazenda</label>
                  <input type="text" id="lead-name" required placeholder="Ex: João da Fazenda Esperança" class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#60B73F] transition-all bg-neutral-50/50" />
                </div>

                <div class="grid grid-cols-2 gap-2.5">
                  <div>
                    <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">WhatsApp com DDD</label>
                    <input type="tel" id="lead-phone" required placeholder="(00) 00000-0000" class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#60B73F] transition-all bg-neutral-50/50" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">Cidade e Estado (UF)</label>
                    <input type="text" id="lead-location" required placeholder="Ex: Cascavel - PR" class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#60B73F] transition-all bg-neutral-50/50" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2.5">
                  <div>
                    <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">Cultura Principal</label>
                    <select id="lead-crop" class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#60B73F] transition-all">
                      <option value="Soja">Soja</option>
                      <option value="Milho">Milho / Safrinha</option>
                      <option value="Trigo">Trigo</option>
                      <option value="Café">Café</option>
                      <option value="Feijão">Feijão</option>
                      <option value="Cana">Cana-de-Açúcar</option>
                      <option value="Hortifruti">Hortifrúti / HF</option>
                      <option value="Outra">Outra Cultura</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">Área Aproximada</label>
                    <select id="lead-hectares" class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#60B73F] transition-all">
                      <option value="Até 50 ha">Até 50 hectares</option>
                      <option value="50 a 200 ha">50 a 200 hectares</option>
                      <option value="200 a 500 ha">200 a 500 hectares</option>
                      <option value="500 a 1.000 ha">500 a 1.000 hectares</option>
                      <option value="Mais de 1.000 ha">Mais de 1.000 hectares</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">Qual o seu maior desafio hoje?</label>
                  <select id="lead-challenge" class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#60B73F] transition-all">
                    <option value="Mofo-branco e doenças de solo">Mofo-branco, Fusarium e Podridão de Raiz</option>
                    <option value="Cigarrinha, Percevejo e Pragas">Cigarrinha, Percevejo e Sugadores</option>
                    <option value="Destravar adubo e estresse hídrico">Destravar fósforo no solo e aguentar veranico</option>
                    <option value="Reduzir custo por hectare">Reduzir o custo absurdo com defensivo químico</option>
                  </select>
                </div>

                <div class="pt-2">
                  <button type="submit" class="w-full bg-neutral-900 hover:bg-black text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <span>RECEBER COTAÇÃO E DOSAGEM AGORA</span>
                    <svg class="w-4 h-4 text-[#60B73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </button>
                </div>

                <p class="text-[11px] text-neutral-600 text-center">
                  Seus dados estão protegidos pela LGPD. Não enviamos spam.
                </p>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- 3. DOR DO PRODUTOR: A VERDADE QUE NINGUÉM CONTA NO CAMPO -->
    <section class="py-16 bg-white border-b border-neutral-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">A Realidade no Campo</span>
          <h2 class="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight mt-3">
            Por que continuar insistindo na mesma receita se ela não está funcionando?
          </h2>
          <p class="text-neutral-600 text-sm sm:text-base mt-2">
            Todo ano o pacote químico sobe de preço, as pragas ficam mais fortes e o lucro do produtor encolhe. Veja a comparação direta:
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- Lado Químico Tradicional -->
          <div class="p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 space-y-4">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">✕</span>
              <h3 class="text-xl font-bold text-neutral-900">Manejo Químico Isolado</h3>
            </div>
            <ul class="space-y-3 text-sm text-neutral-600">
              <li class="flex items-start gap-2">
                <span class="text-red-500 font-bold">•</span>
                <span><strong>Pragas e fungos resistentes:</strong> a cada safra você precisa aumentar a dose para ter o mesmo efeito medíocre.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 font-bold">•</span>
                <span><strong>Mata a biologia benéfica do solo:</strong> a terra fica dura, compactada e dependente de mais adubo químico.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 font-bold">•</span>
                <span><strong>Custo por hectare nas alturas:</strong> o dinheiro da colheita fica todo na mão da multinacional de defensivo.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 font-bold">•</span>
                <span><strong>Risco de queima e fitotoxidez:</strong> qualquer erro de calda trava a lavoura e atrasa o desenvolvimento.</span>
              </li>
            </ul>
          </div>

          <!-- Lado Biopar: A Solução Inteligente -->
          <div class="p-6 sm:p-8 rounded-3xl bg-[#EBF7E7]/50 border-2 border-[#60B73F]/40 space-y-4 relative">
            <div class="absolute -top-3 right-6 bg-[#60B73F] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Mais Produtividade Comprovada
            </div>
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-full bg-[#60B73F] text-white flex items-center justify-center font-bold text-sm">✓</span>
              <h3 class="text-xl font-bold text-neutral-900">Manejo com Biológicos Biopar</h3>
            </div>
            <ul class="space-y-3 text-sm text-neutral-800">
              <li class="flex items-start gap-2">
                <span class="text-[#007A42] font-bold">•</span>
                <span><strong>Ação viva e contínua:</strong> nossos microrganismos continuam se multiplicando e caçando a praga mesmo dias após a aplicação.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[#007A42] font-bold">•</span>
                <span><strong>Solo fértil e raiz funda:</strong> bactérias destravam o fósforo fixado no solo e a planta aguenta até 15 a 20 dias a mais de seca.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[#007A42] font-bold">•</span>
                <span><strong>Mais sacas no caminhão:</strong> ganho médio comprovado de <strong>+3 a +6 sacas de soja e milho</strong> por hectare.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[#007A42] font-bold">•</span>
                <span><strong>Compatível com sua calda:</strong> formulação líquida sem pó, não entope bico e mistura fácil no tanque.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>

    <!-- 4. OS 3 CAMPEÕES DE VENDA BIOPAR PARA A SUA FAZENDA -->
    <section class="py-16 bg-[#F5F5F7] border-b border-neutral-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">Campeões de Produtividade</span>
          <h2 class="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight mt-3">
            As Soluções que o Produtor Mais Pede na Fábrica
          </h2>
          <p class="text-neutral-500 text-sm sm:text-base mt-2">
            Produtos formulados com alta densidade de conídios viáveis e registro oficial no Ministério da Agricultura (MAPA).
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Card 1: Trixma -->
          <div class="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div class="relative h-60 overflow-hidden bg-neutral-100 p-4 flex items-center justify-center">
                <img src="./static/products/hero-trixma.jpg" alt="Trixma Biopar" class="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                <span class="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Biofungicida Líquido</span>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-2xl font-black text-neutral-900 tracking-tight">TRIXMA®</h3>
                <div class="text-xs font-bold text-[#007A42] bg-[#EBF7E7] px-2.5 py-1 rounded-lg inline-block">
                  O Terror do Mofo-Branco
                </div>
                <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Controle potente e multifatorial contra <strong>Mofo-Branco (*Sclerotinia*), Fusarium e Rhizoctonia</strong>. Parasita as estruturas de sobrevivência do fungo na palhada e protege a raiz.
                </p>
                <div class="pt-2 text-xs text-neutral-500 space-y-1">
                  <div>✓ <strong>Alvos:</strong> Mofo-branco, podridões radiculares</div>
                  <div>✓ <strong>Culturas:</strong> Soja, Feijão, Algodão e Milho</div>
                </div>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a 
                href="https://wa.me/5545991312295?text=Ol%C3%A1%2C%20quero%20cotar%20o%20TRIXMA%20direto%20de%20f%C3%A1brica%20para%20minha%20fazenda." 
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-[#60B73F] text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors"
              >
                <span>Cotar Trixma® no WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <!-- Card 2: MB Control -->
          <div class="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div class="relative h-60 overflow-hidden bg-neutral-100 p-4 flex items-center justify-center">
                <img src="./static/products/hero-mb-control.jpg" alt="MB Control Biopar" class="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                <span class="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Bioinseticida Duplo</span>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-2xl font-black text-neutral-900 tracking-tight">MB CONTROL®</h3>
                <div class="text-xs font-bold text-[#007A42] bg-[#EBF7E7] px-2.5 py-1 rounded-lg inline-block">
                  Cigarrinha & Percevejo Sem Resistência
                </div>
                <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Consórcio de <strong>*Beauveria bassiana* + *Metarhizium anisopliae*</strong>. Os fungos aderem ao corpo da praga, penetram a carapaça e quebram a reinfestação na lavoura.
                </p>
                <div class="pt-2 text-xs text-neutral-500 space-y-1">
                  <div>✓ <strong>Alvos:</strong> Cigarrinha do milho, percevejos, mosca-branca</div>
                  <div>✓ <strong>Vantagem:</strong> Atinge ninfas escondidas no baixeiro</div>
                </div>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a 
                href="https://wa.me/5545991312295?text=Ol%C3%A1%2C%20quero%20cotar%20o%20MB%20CONTROL%20direto%20de%20f%C3%A1brica%20para%20minha%20fazenda." 
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-[#60B73F] text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors"
              >
                <span>Cotar MB Control® no WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <!-- Card 3: BPR Tetra -->
          <div class="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div class="relative h-60 overflow-hidden bg-neutral-100 p-4 flex items-center justify-center">
                <img src="./static/products/hero-bpr-tetra.jpg" alt="BPR Tetra Biopar" class="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                <span class="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Solubilizador & Vigor</span>
              </div>
              <div class="p-6 space-y-3">
                <h3 class="text-2xl font-black text-neutral-900 tracking-tight">BPR TETRA®</h3>
                <div class="text-xs font-bold text-[#007A42] bg-[#EBF7E7] px-2.5 py-1 rounded-lg inline-block">
                  Destrava o Adubo & Segura a Seca
                </div>
                <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Consórcio de <strong>4 bactérias benéficas</strong> que soltam o Fósforo travado na terra, produzem hormônios de raiz e aumentam a tolerância da planta a dias sem chuva.
                </p>
                <div class="pt-2 text-xs text-neutral-500 space-y-1">
                  <div>✓ <strong>Efeito:</strong> Raiz volumosa que busca água no fundo</div>
                  <div>✓ <strong>Resultado:</strong> Aproveitamento máximo do fertilizante</div>
                </div>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a 
                href="https://wa.me/5545991312295?text=Ol%C3%A1%2C%20quero%20cotar%20o%20BPR%20TETRA%20direto%20de%20f%C3%A1brica%20para%20minha%20fazenda." 
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-[#60B73F] text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors"
              >
                <span>Cotar BPR Tetra® no WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- 5. CALCULADORA INTERATIVA DE GANHO NA SAFRA (ALTA CONVERSÃO) -->
    <section id="calculadora" class="py-16 bg-white border-b border-neutral-200/80 scroll-mt-24">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="bg-neutral-900 text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div class="relative z-10">
            <span class="inline-block text-xs font-semibold uppercase tracking-wider text-[#60B73F] bg-white/10 px-3 py-1 rounded-full border border-white/20 mb-3">
              Calculadora de Retorno na Safra
            </span>
            
            <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Quanto a sua fazenda pode faturar a mais com a Biopar?
            </h2>
            <p class="text-neutral-300 text-sm sm:text-base mt-2 max-w-2xl">
              Mova o controle abaixo para selecionar a área que você vai plantar e veja a estimativa de ganho real de sacas e faturamento:
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
              
              <!-- Controles Interativos -->
              <div class="lg:col-span-7 space-y-6">
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <label class="text-xs font-bold uppercase tracking-wider text-neutral-300">Área Plantada (Hectares):</label>
                    <span id="calc-ha-display" class="text-xl font-black text-[#60B73F]">300 ha</span>
                  </div>
                  <input 
                    type="range" 
                    id="calc-ha-slider" 
                    min="30" 
                    max="2000" 
                    step="10" 
                    value="300" 
                    class="w-full h-2.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#60B73F]"
                  />
                  <div class="flex justify-between text-[11px] text-neutral-400 mt-1">
                    <span>30 ha</span>
                    <span>500 ha</span>
                    <span>1.000 ha</span>
                    <span>2.000 ha</span>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">Cultura da Sua Área:</label>
                  <div class="grid grid-cols-2 gap-3">
                    <button type="button" id="btn-crop-soja" class="crop-btn active py-2.5 px-4 rounded-xl text-xs font-bold border border-[#60B73F] bg-[#60B73F] text-white transition-all text-center">
                      Soja (R$ 130/saca)
                    </button>
                    <button type="button" id="btn-crop-milho" class="crop-btn py-2.5 px-4 rounded-xl text-xs font-bold border border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white transition-all text-center">
                      Milho (R$ 60/saca)
                    </button>
                  </div>
                </div>
              </div>

              <!-- Painel de Resultados do Produtor -->
              <div class="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4 backdrop-blur-md">
                <div class="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Estimativa de Ganho Líquido na Safra
                </div>

                <div class="border-y border-white/10 py-4">
                  <div class="text-xs text-neutral-400">Sacas a Mais na Balança:</div>
                  <div id="calc-bags-result" class="text-3xl sm:text-4xl font-black text-white mt-1">+1.260 sacas</div>
                  <div class="text-[11px] text-[#60B73F] font-semibold mt-1">Média conservadora de +4,2 sacas/ha</div>
                </div>

                <div>
                  <div class="text-xs text-neutral-400">Faturamento Extra Estimado:</div>
                  <div id="calc-money-result" class="text-2xl sm:text-3xl font-black text-[#60B73F] mt-1">R$ 163.800</div>
                  <div class="text-[10px] text-neutral-400 mt-0.5">Direto no bolso do produtor</div>
                </div>

                <a 
                  id="calc-cta-btn"
                  href="https://wa.me/5545991312295?text=Ol%C3%A1%2C%20calculei%20no%20site%20para%20uma%20%C3%A1rea%20de%20300%20ha%20de%20soja%20e%20quero%20uma%20proposta%20da%20Biopar." 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block w-full bg-[#60B73F] hover:bg-[#52A633] text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-md transition-all uppercase tracking-wider"
                >
                  Garantir esse Ganho na Minha Lavoura
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- 6. PROVA SOCIAL: QUEM JÁ USOU E COLHEU NO BRASIL -->
    <section class="py-16 bg-white border-b border-neutral-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">Depoimentos Reais</span>
          <h2 class="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight mt-3">
            O que Diz Quem Já Colheu com a Biopar
          </h2>
          <p class="text-neutral-500 text-sm sm:text-base mt-2">
            Resultados de produtores rurais que trocaram o medo pela produtividade no campo.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div class="p-6 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-4">
            <div class="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
            <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
              "Na safra retrasada o mofo-branco quase acabou com o meu talhão mais baixo de soja. O químico não segurava mais. Entramos com o Trixma no fechamento de linha e limpou. Colhemos 74 sacas de média onde antes dava 62. Não planto mais sem."
            </p>
            <div class="pt-2 border-t border-neutral-200/60">
              <div class="font-bold text-xs text-neutral-900">Geraldo M. Silveira</div>
              <div class="text-[11px] text-neutral-500">Produtor de Soja e Milho • Toledo - PR (420 ha)</div>
            </div>
          </div>

          <div class="p-6 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-4">
            <div class="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
            <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
              "A cigarrinha no milho safrinha aqui no Goiás tava tirando o sono de todo mundo. O MB Control foi tiro e queda. Aplicamos no final da tarde e em 4 dias a população despencou. O melhor é que é líquido, não entupiu nada no pulverizador."
            </p>
            <div class="pt-2 border-t border-neutral-200/60">
              <div class="font-bold text-xs text-neutral-900">Marcos Vinícius Andrade</div>
              <div class="text-[11px] text-neutral-500">Fazenda Boa Vista • Rio Verde - GO (850 ha)</div>
            </div>
          </div>

          <div class="p-6 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-4">
            <div class="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
            <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
              "Pegamos 19 dias de veranico forte em janeiro. O talhão onde inoculamos o BPR Tetra ficou verde e ereto enquanto o vizinho já tava enrolando folha. A raiz desceu muito mais fundo. O resultado no caminhão pagou o investimento três vezes."
            </p>
            <div class="pt-2 border-t border-neutral-200/60">
              <div class="font-bold text-xs text-neutral-900">João Paulo Zanchett</div>
              <div class="text-[11px] text-neutral-500">Agropecuária Zanchett • Sorriso - MT (1.400 ha)</div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- 7. QUEBRA DE OBJEÇÕES: FAQ DO PRODUTOR SEM RODEIOS -->
    <section class="py-16 bg-[#F5F5F7] border-b border-neutral-200/80">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
          <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">Tire Suas Dúvidas</span>
          <h2 class="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight mt-3">
            Perguntas que Todo Produtor Faz Antes de Comprar
          </h2>
          <p class="text-neutral-500 text-sm sm:text-base mt-2">
            Respostas diretas e honestas sobre a aplicação, transporte e resultados.
          </p>
        </div>

        <div class="space-y-4" id="producer-faq-accordion">
          
          <!-- Pergunta 1 -->
          <div class="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden">
            <button class="faq-toggle w-full p-5 text-left font-bold text-neutral-900 text-sm sm:text-base flex items-center justify-between cursor-pointer">
              <span>1. Biológico funciona mesmo ou é só conversa bonita?</span>
              <span class="faq-icon text-neutral-400 font-bold text-lg">+</span>
            </button>
            <div class="faq-content hidden p-5 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-2">
              Funciona e tem ciência pesada por trás. Nossos produtos são registrados oficialmente no Ministério da Agricultura (MAPA) após anos de testes em universidades e fundações como Embrapa e cooperativas. O biológico não é para substituir 100% o que você faz, mas para entrar onde a química falhou por causa da resistência da praga.
            </div>
          </div>

          <!-- Pergunta 2 -->
          <div class="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden">
            <button class="faq-toggle w-full p-5 text-left font-bold text-neutral-900 text-sm sm:text-base flex items-center justify-between cursor-pointer">
              <span>2. Posso misturar com outros produtos no mesmo tanque de pulverização?</span>
              <span class="faq-icon text-neutral-400 font-bold text-lg">+</span>
            </button>
            <div class="faq-content hidden p-5 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-2">
              Na maioria dos casos, sim! Nossos produtos biológicos são compatíveis com diversos inseticidas, herbicidas e adubos foliares. O nosso agrônomo orienta a ordem certa de colocar na calda para não matar os esporos e garantir máxima viabilidade. Não entope ponta e bico porque a formulação é líquida ultrafiltrada.
            </div>
          </div>

          <!-- Pergunta 3 -->
          <div class="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden">
            <button class="faq-toggle w-full p-5 text-left font-bold text-neutral-900 text-sm sm:text-base flex items-center justify-between cursor-pointer">
              <span>3. Como chega na minha fazenda? O frete é seguro para os microrganismos vivos?</span>
              <span class="faq-icon text-neutral-400 font-bold text-lg">+</span>
            </button>
            <div class="faq-content hidden p-5 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-2">
              Sim! O envio sai direto da nossa indústria com transportadoras parceiras que possuem caminhões térmicos e refrigerados. A carga chega na porteira da sua fazenda lacrada, com laudo do lote comprovando a contagem de bactérias/fungos vivos e nota fiscal de fábrica.
            </div>
          </div>

          <!-- Pergunta 4 -->
          <div class="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden">
            <button class="faq-toggle w-full p-5 text-left font-bold text-neutral-900 text-sm sm:text-base flex items-center justify-between cursor-pointer">
              <span>4. Como saber a dosagem certa por hectare para a minha área?</span>
              <span class="faq-icon text-neutral-400 font-bold text-lg">+</span>
            </button>
            <div class="faq-content hidden p-5 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-2">
              Você não precisa adivinhar. Quando você clica no botão ou manda mensagem no nosso WhatsApp, um Engenheiro Agrônomo da nossa equipe avalia a sua cultura, o histórico de infestação do talhão e o momento do plantio para calcular exatamente os litros necessários por hectare.
            </div>
          </div>

          <!-- Pergunta 5 -->
          <div class="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden">
            <button class="faq-toggle w-full p-5 text-left font-bold text-neutral-900 text-sm sm:text-base flex items-center justify-between cursor-pointer">
              <span>5. Como comprar direto da fábrica sem intermediários?</span>
              <span class="faq-icon text-neutral-400 font-bold text-lg">+</span>
            </button>
            <div class="faq-content hidden p-5 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-2">
              Basta nos chamar no WhatsApp ou preencher o formulário nesta página. Nós atendemos produtores de todo o Brasil faturando direto no CPF ou CNPJ rural, garantindo o melhor preço por litro sem a margem abusiva de revendas intermediárias.
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- 8. GARANTIA & SUPORTE DE PORTEIRA FECHADA -->
    <section class="py-16 bg-white border-b border-neutral-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center gap-8 justify-between">
          <div class="space-y-3 max-w-xl">
            <div class="inline-block text-xs font-semibold uppercase tracking-wider text-[#60B73F] bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Acompanhamento Técnico Garantido
            </div>
            <h3 class="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Na Biopar você nunca fica sozinho na hora de aplicar.
            </h3>
            <p class="text-neutral-300 text-sm leading-relaxed">
              Ao fechar o fornecimento com a nossa fábrica, o nosso time técnico fica disponível para tirar dúvidas de tanque, horário de pulverização, condições climáticas e acompanhar a evolução do seu talhão até a colheita.
            </p>
          </div>
          <div class="shrink-0 w-full md:w-auto">
            <a 
              href="https://wa.me/5545991312295?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20agr%C3%B4nomo%20da%20Biopar%20sobre%20minha%20lavoura." 
              target="_blank"
              rel="noopener noreferrer"
              class="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#60B73F] hover:bg-[#52A633] text-white text-sm font-bold py-4 px-8 rounded-full shadow-lg transition-all"
            >
              <span>Falar com o Agrônomo</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. CTA FINAL & FORMULÁRIO DE CONTATO DIRETO -->
    <section class="py-16 bg-[#F5F5F7]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div class="space-y-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-200 px-3 py-1 rounded-full">
            Pronto Para Colher Mais Sacas?
          </span>
          <h2 class="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Garanta seu lote com preço de fábrica para a safra.
          </h2>
          <p class="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
            Converse agora com nossa equipe comercial e receba uma proposta personalizada para a metragem da sua lavoura.
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a 
            href="https://wa.me/5545991312295?text=Ol%C3%A1%2C%20quero%20solicitar%20uma%20proposta%20comercial%20direto%20de%20f%C3%A1brica%20para%20minha%20fazenda." 
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2.5 bg-[#60B73F] hover:bg-[#52A633] text-white text-base font-bold px-8 py-4 rounded-full shadow-xl transition-all"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.771.867 2.796.867 3.183 0 5.769-2.586 5.77-5.766.001-3.18-2.585-5.754-5.77-5.754zm3.364 8.243c-.14.394-.714.733-1.019.78-.305.048-.686.068-1.954-.457-1.623-.672-2.67-2.315-2.751-2.423-.081-.108-.66-879-.66-1.674 0-.796.417-1.189.565-1.351.148-.162.324-.203.432-.203.108 0 .216 0 .311.006.101.007.236-.038.37.284.14.338.473 1.15.513 1.233.04.083.067.18.013.288-.053.108-.08.175-.16.27-.08.095-.169.212-.241.285-.081.08-.166.168-.071.332.095.163.421.696.903 1.127.621.554 1.144.726 1.307.807.162.081.257.068.351-.041.095-.108.405-.473.513-.635.108-.162.216-.135.365-.081.148.054.945.446 1.107.527.162.081.27.122.311.189.04.068.04.393-.1.787z"/>
            </svg>
            <span>Pedir Proposta no WhatsApp</span>
          </a>

          <button 
            id="btn-open-form-modal"
            type="button"
            class="btn-pill-secondary text-sm font-semibold px-6 py-4 cursor-pointer"
          >
            Preencher Formulário Tradicional
          </button>
        </div>

        <div class="pt-6 text-xs text-neutral-500">
          Atendimento telefônico direto: <strong>${companyData.contactChannels.phone}</strong> • ${companyData.contactChannels.address}
        </div>

      </div>
    </section>

    <!-- 10. BARRA FLUTUANTE DE CONVERSÃO MOBILE (ALTA CONVERSÃO ADS) -->
    <div class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3">
      <div class="leading-tight">
        <div class="text-[11px] font-bold text-neutral-900">Preço Direto de Fábrica</div>
        <div class="text-[10px] text-[#007A42] font-semibold">Tire dúvidas com agrônomo</div>
      </div>
      <a 
        href="https://wa.me/5545991312295?text=Ol%C3%A1%2C%20sou%20produtor%20rural%20e%20quero%20conhecer%20as%20solu%C3%A7%C3%B5es%20da%20Biopar%20para%20minha%20lavoura." 
        target="_blank"
        rel="noopener noreferrer"
        class="bg-[#60B73F] text-white text-xs font-bold py-2.5 px-4 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
      >
        <span>Chamar no WhatsApp</span>
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </a>
    </div>
  `;

  // --- LÓGICA INTERATIVA: CALCULADORA DE RETORNO DO PRODUTOR ---
  const haSlider = container.querySelector('#calc-ha-slider');
  const haDisplay = container.querySelector('#calc-ha-display');
  const bagsResult = container.querySelector('#calc-bags-result');
  const moneyResult = container.querySelector('#calc-money-result');
  const ctaBtn = container.querySelector('#calc-cta-btn');
  const btnSoja = container.querySelector('#btn-crop-soja');
  const btnMilho = container.querySelector('#btn-crop-milho');

  let currentCrop = 'Soja';
  let bagPrice = 130; // R$ 130 / saca de soja
  const avgBagGain = 4.2; // +4,2 sacas / hectare

  function updateCalculator() {
    if (!haSlider) return;
    const ha = parseInt(haSlider.value, 10);
    haDisplay.textContent = `${ha.toLocaleString('pt-BR')} ha`;

    const totalBags = Math.round(ha * avgBagGain);
    const totalMoney = Math.round(totalBags * bagPrice);

    bagsResult.textContent = `+${totalBags.toLocaleString('pt-BR')} sacas`;
    moneyResult.textContent = `R$ ${totalMoney.toLocaleString('pt-BR')}`;

    ctaBtn.href = `https://wa.me/5545991312295?text=Ol%C3%A1%2C%20calculei%20no%20site%20para%20uma%20%C3%A1rea%20de%20${ha}%20ha%20de%20${currentCrop}%20e%20quero%20uma%20proposta%20da%20Biopar.`;
  }

  if (haSlider) {
    haSlider.addEventListener('input', updateCalculator);
  }

  if (btnSoja && btnMilho) {
    btnSoja.addEventListener('click', () => {
      currentCrop = 'Soja';
      bagPrice = 130;
      btnSoja.className = 'crop-btn active py-2.5 px-4 rounded-xl text-xs font-bold border border-[#60B73F] bg-[#60B73F] text-white transition-all text-center';
      btnMilho.className = 'crop-btn py-2.5 px-4 rounded-xl text-xs font-bold border border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white transition-all text-center';
      updateCalculator();
    });

    btnMilho.addEventListener('click', () => {
      currentCrop = 'Milho';
      bagPrice = 60;
      btnMilho.className = 'crop-btn active py-2.5 px-4 rounded-xl text-xs font-bold border border-[#60B73F] bg-[#60B73F] text-white transition-all text-center';
      btnSoja.className = 'crop-btn py-2.5 px-4 rounded-xl text-xs font-bold border border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white transition-all text-center';
      updateCalculator();
    });
  }

  // --- LÓGICA DO ACORDEÃO FAQ ---
  const faqToggles = container.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const contentEl = toggle.nextElementSibling;
      const icon = toggle.querySelector('.faq-icon');
      const isHidden = contentEl.classList.contains('hidden');

      // Fecha todos os outros para manter a tela limpa
      container.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      container.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');

      if (isHidden) {
        contentEl.classList.remove('hidden');
        if (icon) icon.textContent = '−';
      }
    });
  });

  // --- SUBMISSÃO DO FORMULÁRIO DE LEADS DO HERO ---
  const heroForm = container.querySelector('#hero-lead-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = container.querySelector('#lead-name').value;
      const phone = container.querySelector('#lead-phone').value;
      const location = container.querySelector('#lead-location').value;
      const crop = container.querySelector('#lead-crop').value;
      const ha = container.querySelector('#lead-hectares').value;
      const challenge = container.querySelector('#lead-challenge').value;

      // Encaminha lead para comercial@biopar.agr.br e WhatsApp
      const dispatchResult = leadService.dispatchLead({
        source: 'Landing Page /produtor (Simulação de Safra)',
        name,
        phone,
        location,
        crop,
        hectares: ha,
        challenge,
        message: `Simulação de manejo para ${ha} de ${crop} em ${location}. Principal desafio fitossanitário: ${challenge}.`,
        sendToWhatsApp: true
      });

      showToast(`Solicitação registrada! Dados encaminhados para ${leadService.destinationEmail} e WhatsApp.`, 'success');

      // Abre WhatsApp diretamente com os dados estruturados
      setTimeout(() => {
        if (dispatchResult.whatsappUrl) {
          window.open(dispatchResult.whatsappUrl, '_blank');
        }
      }, 700);
    });
  }

  // Botão de formulário modal
  container.querySelector('#btn-open-form-modal')?.addEventListener('click', () => openContactModal());

  return container;
}
