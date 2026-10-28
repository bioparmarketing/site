/**
 * Página: Política de Privacidade (/privacidade)
 * Em conformidade com a LGPD (Lei Federal nº 13.709/2018), Marco Civil da Internet
 * e diretrizes regulatórias do agronegócio e bioinsumos (MAPA).
 */

import { companyData } from '../data/company.js';
import { createLegalHeader } from '../components/LegalNav.js';
import { openContactModal } from '../components/ContactModal.js';

export function createPrivacyPolicyPage({ router }) {
  const container = document.createElement('div');
  container.className = 'w-full bg-white min-h-screen text-[#1D1D1F]';

  // Cabeçalho compartilhado do Hub Jurídico
  const header = createLegalHeader({
    activeTab: 'privacidade',
    title: 'Política de Privacidade',
    subtitle: 'Saiba como a Biopar protege, coleta e trata dados pessoais de produtores rurais, agrônomos, cooperativas e parceiros do agronegócio em conformidade rigorosa com a LGPD.'
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Neste Documento
          </div>
          
          <nav class="space-y-1.5 text-xs font-medium text-neutral-600">
            <a href="#controlador" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">1. Identificação do Controlador</a>
            <a href="#escopo" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">2. Escopo & Agronegócio</a>
            <a href="#dados-coletados" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">3. Dados Pessoais Coletados</a>
            <a href="#finalidades" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">4. Finalidades & Bases Legais</a>
            <a href="#compartilhamento" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">5. Compartilhamento de Dados</a>
            <a href="#seguranca" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">6. Segurança & Retenção</a>
            <a href="#direitos" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">7. Seus Direitos (Art. 18 LGPD)</a>
            <a href="#contato-dpo" class="block py-1.5 px-2.5 rounded-lg hover:text-black hover:bg-white/80 transition-colors">8. Canal do Titular & DPO</a>
          </nav>

          <div class="pt-4 border-t border-neutral-200/80">
            <div class="text-[11px] text-neutral-500 mb-2">Dúvidas sobre o tratamento de dados da sua fazenda ou empresa?</div>
            <button id="btn-privacy-contact" class="w-full text-center py-2.5 px-3 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer">
              Contatar Encarregado (DPO)
            </button>
          </div>
        </div>
      </aside>

      <!-- Corpo da Política de Privacidade -->
      <main class="lg:col-span-8 order-1 lg:order-2 space-y-10 text-neutral-700 leading-relaxed text-sm">

        <!-- Destaque Inicial / Sumário Executivo -->
        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800">
            <svg class="w-4 h-4 text-[#60B73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Compromisso de Transparência Biopar
          </div>
          <p class="text-xs sm:text-sm text-neutral-600">
            Na <strong>${companyData.legalName}</strong>, respeitamos a privacidade e a confidencialidade das informações dos produtores rurais, consultores agronômicos, revendas e parceiros. Esta Política descreve com clareza como tratamos seus dados pessoais em nosso website, canais de cotação e assistência técnica, cumprindo integralmente a Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018 - LGPD).
          </p>
        </div>

        <!-- 1. Controlador -->
        <section id="controlador" class="space-y-3 pt-2 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">1. Identificação do Controlador de Dados</h2>
          <p>
            O controlador dos dados pessoais tratados no âmbito deste portal e dos serviços da Biopar é:
          </p>
          <div class="bg-[#F5F5F7] p-5 rounded-xl border border-neutral-200 text-xs sm:text-sm space-y-1.5">
            <div><strong>Razão Social:</strong> ${companyData.legalName}</div>
            <div><strong>Endereço Sede:</strong> ${companyData.contactChannels.address}</div>
            <div><strong>Atendimento Técnico e Comercial:</strong> ${companyData.contactChannels.phone}</div>
            <div><strong>E-mail Institucional:</strong> ${companyData.contactChannels.emailTechnical}</div>
            <div><strong>Encarregado pelo Tratamento de Dados (DPO):</strong> comercial@biopar.agr.br</div>
          </div>
        </section>

        <!-- 2. Escopo & Agronegócio -->
        <section id="escopo" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">2. Escopo & Especificidades do Agronegócio</h2>
          <p>
            A Biopar atua no desenvolvimento, fabricação e fornecimento de bioinsumos agrícolas de alta pureza e densidade celular (biofungicidas, bioinseticidas, inoculantes e promotores de crescimento). Nossas interações envolvem profissionais do ecossistema agropecuário:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li><strong>Produtores Rurais e Gestores Agrícolas:</strong> para cálculo de dosagens por hectare, recomendação técnica de manejo e emissão de orçamentos;</li>
            <li><strong>Engenheiros Agrônomos e Consultores Fitossanitários:</strong> para validação de ensaios de eficácia, compatibilidade biológica e suporte à prescrição agronômica;</li>
            <li><strong>Distribuidores, Revendas e Cooperativas:</strong> para faturamento, suporte logístico refrigerado e rastreabilidade de lotes;</li>
            <li><strong>Visitantes do Portal Digital:</strong> que acessam artigos científicos, cotações ao vivo de commodities e fichas de produtos.</li>
          </ul>
        </section>

        <!-- 3. Dados Coletados -->
        <section id="dados-coletados" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">3. Dados Pessoais Coletados</h2>
          <p>
            Coletamos apenas os dados estritamente necessários para viabilizar o atendimento técnico, comercial e agronômico:
          </p>
          
          <div class="space-y-3 pt-2">
            <div class="border border-neutral-200 rounded-xl p-4 bg-white">
              <h3 class="font-bold text-neutral-900 text-sm mb-1">A. Dados fornecidos ativamente pelo titular</h3>
              <p class="text-xs text-neutral-600">
                Coletados quando você preenche nossos formulários de contato, solicita cotação, baixa bulas técnicas ou entra em contato via WhatsApp/telefone: 
                <strong>nome completo, e-mail corporativo/pessoal, número de telefone celular/WhatsApp, estado (UF), município da propriedade rural, cultura de interesse (ex: soja, milho, cana) e área aproximada em hectares</strong>.
              </p>
            </div>

            <div class="border border-neutral-200 rounded-xl p-4 bg-white">
              <h3 class="font-bold text-neutral-900 text-sm mb-1">B. Dados de navegação e conexão técnica</h3>
              <p class="text-xs text-neutral-600">
                Coletados automaticamente para garantir estabilidade, segurança e conformidade com o Marco Civil da Internet (Lei nº 12.965/2014): 
                <strong>endereço IP de origem, data e horário de cada conexão, porta lógica, tipo de dispositivo, resolução de tela, navegador utilizado e páginas navegadas</strong>.
              </p>
            </div>

            <div class="border border-neutral-200 rounded-xl p-4 bg-white">
              <h3 class="font-bold text-neutral-900 text-sm mb-1">C. Dados de cotação e negociação comercial</h3>
              <p class="text-xs text-neutral-600">
                Informações de volume demandado, tipo de formulação microbiológica, histórico de compras e condições de entrega na fazenda para execução contratual e emissão de notas fiscais agropecuárias.
              </p>
            </div>
          </div>
        </section>

        <!-- 4. Finalidades & Bases Legais -->
        <section id="finalidades" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">4. Finalidades e Bases Legais do Tratamento</h2>
          <p>
            Todo tratamento de dados pessoais realizado pela Biopar possui amparo em uma das bases legais previstas expressamente no artigo 7º da LGPD:
          </p>

          <div class="overflow-x-auto pt-2">
            <table class="w-full text-left text-xs border border-neutral-200 rounded-lg overflow-hidden">
              <thead class="bg-neutral-100 text-neutral-800 font-bold">
                <tr>
                  <th class="p-3 border-b border-neutral-200">Finalidade do Tratamento</th>
                  <th class="p-3 border-b border-neutral-200">Dados Utilizados</th>
                  <th class="p-3 border-b border-neutral-200">Base Legal (Art. 7º LGPD)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-200">
                <tr>
                  <td class="p-3 font-medium">Recomendação agronômica e orçamentos de bioinsumos</td>
                  <td class="p-3 text-neutral-600">Nome, contato, fazenda, cultura e hectare</td>
                  <td class="p-3 text-neutral-800 font-semibold">Execução de Contrato ou Procedimentos Preliminares (Inciso V)</td>
                </tr>
                <tr>
                  <td class="p-3 font-medium">Rastreabilidade de lotes e registro regulatório MAPA</td>
                  <td class="p-3 text-neutral-600">Dados cadastrais, CNPJ/CPF, NF e lote do biológico</td>
                  <td class="p-3 text-neutral-800 font-semibold">Cumprimento de Obrigação Legal ou Regulatória (Inciso II)</td>
                </tr>
                <tr>
                  <td class="p-3 font-medium">Armazenamento de registros de conexão ao portal</td>
                  <td class="p-3 text-neutral-600">IP, data, hora, porta lógica e navegador</td>
                  <td class="p-3 text-neutral-800 font-semibold">Obrigação Legal - Marco Civil da Internet (Inciso II)</td>
                </tr>
                <tr>
                  <td class="p-3 font-medium">Envio de boletins técnicos de safra e novos lançamentos</td>
                  <td class="p-3 text-neutral-600">E-mail, telefone e interesse agronômico</td>
                  <td class="p-3 text-neutral-800 font-semibold">Legítimo Interesse (Inciso IX) ou Consentimento (Inciso I)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 5. Compartilhamento -->
        <section id="compartilhamento" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">5. Compartilhamento de Dados com Terceiros</h2>
          <p>
            A Biopar <strong>não comercializa nem transfere dados pessoais a terceiros para fins de monetização ou publicidade indiscriminada</strong>. O compartilhamento ocorre apenas nas seguintes hipóteses estritas:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li><strong>Transportadoras Especializadas e Operadores Logísticos:</strong> para transporte adequado e refrigerado dos bioinsumos até a propriedade rural ou centro de distribuição;</li>
            <li><strong>Órgãos Regulatórios e Fiscalizadores:</strong> como o Ministério da Agricultura e Pecuária (MAPA), ANVISA, IBAMA e secretarias estaduais de fazenda/agricultura, quando houver exigência legal formal de rastreabilidade sanitária;</li>
            <li><strong>Provedores de Infraestrutura e TI:</strong> empresas de hospedagem em nuvem de alto padrão, serviços de segurança cibernética e ferramentas de comunicação que mantêm rígidos padrões de conformidade com a LGPD;</li>
            <li><strong>Autoridades Judiciais:</strong> mediante ordem legal expedida por autoridade competente.</li>
          </ul>
        </section>

        <!-- 6. Segurança & Retenção -->
        <section id="seguranca" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">6. Segurança da Informação e Prazos de Retenção</h2>
          <p>
            Adotamos medidas técnicas, organizacionais e administrativas de segurança aptas a proteger os dados pessoais contra acessos não autorizados, situações acidentais ou ilícitas de destruição, perda, alteração ou comunicação, incluindo:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li>Comunicação criptografada via protocolo HTTPS/TLS em todo o portal;</li>
            <li>Controle de acesso restrito baseado no princípio do privilégio mínimo aos dados de clientes e orçamentos;</li>
            <li>Monitoramento contínuo de vulnerabilidades e prevenção de acessos suspeitos.</li>
          </ul>
          <p class="pt-2">
            Os dados pessoais são retidos pelo tempo necessário para cumprir as finalidades para as quais foram coletados, respeitando prazos legais e regulatórios (ex.: 6 meses para logs de conexão no Marco Civil da Internet; prazos fiscais e regulatórios previstos pelo MAPA para comercialização de insumos).
          </p>
        </section>

        <!-- 7. Direitos do Titular -->
        <section id="direitos" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">7. Seus Direitos como Titular de Dados (Art. 18 da LGPD)</h2>
          <p>
            Você, produtor rural ou usuário de nosso portal, possui controle total sobre suas informações pessoais e pode exercer gratuitamente, a qualquer momento, os direitos garantidos por lei:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div class="p-3.5 bg-[#F5F5F7] rounded-xl border border-neutral-200">
              <div class="font-bold text-neutral-900 text-xs mb-1">✓ Confirmação & Acesso</div>
              <div class="text-xs text-neutral-600">Saber se a Biopar realiza o tratamento de seus dados e obter cópia clara das informações.</div>
            </div>
            <div class="p-3.5 bg-[#F5F5F7] rounded-xl border border-neutral-200">
              <div class="font-bold text-neutral-900 text-xs mb-1">✓ Correção de Dados</div>
              <div class="text-xs text-neutral-600">Solicitar a retificação imediata de dados cadastrais incompletos, inexatos ou desatualizados.</div>
            </div>
            <div class="p-3.5 bg-[#F5F5F7] rounded-xl border border-neutral-200">
              <div class="font-bold text-neutral-900 text-xs mb-1">✓ Eliminação & Anonimização</div>
              <div class="text-xs text-neutral-600">Requerer a exclusão de dados desnecessários ou tratados com base exclusiva em seu consentimento.</div>
            </div>
            <div class="p-3.5 bg-[#F5F5F7] rounded-xl border border-neutral-200">
              <div class="font-bold text-neutral-900 text-xs mb-1">✓ Revogação do Consentimento</div>
              <div class="text-xs text-neutral-600">Cancelar autorizações previamente concedidas para envio de informativos ou newsletters agro.</div>
            </div>
          </div>
        </section>

        <!-- 8. Contato DPO -->
        <section id="contato-dpo" class="space-y-3 pt-4 border-t border-neutral-100 scroll-mt-28">
          <h2 class="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">8. Canal do Titular & Contato com o DPO</h2>
          <p>
            Para exercer qualquer um dos seus direitos ou esclarecer dúvidas operacionais a respeito desta Política de Privacidade, entre em contato diretamente com o nosso Encarregado pelo Tratamento de Dados Pessoais (Data Protection Officer - DPO):
          </p>
          
          <div class="bg-neutral-900 text-white p-6 rounded-2xl space-y-3">
            <div class="text-xs font-semibold uppercase tracking-wider text-[#60B73F]">Canal Oficial LGPD Biopar</div>
            <div class="text-lg font-bold">Encarregado de Proteção de Dados (DPO)</div>
            <div class="text-xs sm:text-sm text-neutral-300 space-y-1">
              <div><strong>E-mail direto:</strong> comercial@biopar.agr.br</div>
              <div><strong>Atendimento Telefônico:</strong> ${companyData.contactChannels.phone}</div>
              <div><strong>Horário de Atendimento:</strong> ${companyData.contactChannels.operatingHours}</div>
              <div><strong>Prazo regulatório de resposta:</strong> até 15 (quinze) dias corridos, conforme preconiza a ANPD e a LGPD.</div>
            </div>
          </div>
        </section>

      </main>
    </div>
  `;

  content.querySelector('#btn-privacy-contact')?.addEventListener('click', () => openContactModal());

  container.appendChild(header);
  container.appendChild(content);

  return container;
}
