/**
 * Calculadora Interativa de Dosagem e Volume de Aplicação Agronômica
 * Ferramenta prática para produtores, consultores e agrônomos na página do produto.
 */

import { openContactModal } from './ContactModal.js';

export function createDoseCalculator(product) {
  const container = document.createElement('div');
  container.className = 'bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm';

  const defaultDose = product.application?.recommendedDosageHa || 0.5;
  const unit = product.application?.recommendedUnit || 'L/ha';
  const unitShort = unit.replace('/ha', '');

  container.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-100">
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">Ferramenta de Campo</span>
        <h4 class="text-xl font-bold text-neutral-900 mt-2">Calculadora de Dosagem — ${product.name}</h4>
        <p class="text-xs sm:text-sm text-neutral-500 mt-0.5">Estime o volume total de produto e calda necessários para a sua área de plantio.</p>
      </div>
      <div class="text-right">
        <span class="text-xs text-neutral-400 font-medium">Dose Técnica Recomendada:</span>
        <div class="text-lg font-bold text-emerald-700">${defaultDose} ${unit}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Input de Área -->
      <div class="space-y-2">
        <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">Área a Tratar (Hectares)</label>
        <div class="relative">
          <input id="calc-area-input" type="number" min="1" max="100000" value="100" class="w-full px-4 py-3 rounded-2xl border border-neutral-200 text-base font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
          <span class="absolute right-4 top-3.5 text-xs text-neutral-400 font-semibold uppercase">ha</span>
        </div>
        <div class="flex gap-2 pt-1">
          <button type="button" class="preset-ha px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors cursor-pointer" data-val="50">50 ha</button>
          <button type="button" class="preset-ha px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors cursor-pointer" data-val="250">250 ha</button>
          <button type="button" class="preset-ha px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors cursor-pointer" data-val="1000">1.000 ha</button>
        </div>
      </div>

      <!-- Input de Vazão de Calda -->
      <div class="space-y-2">
        <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">Volume de Calda Médio</label>
        <div class="relative">
          <input id="calc-flow-input" type="number" min="10" max="500" value="80" class="w-full px-4 py-3 rounded-2xl border border-neutral-200 text-base font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
          <span class="absolute right-4 top-3.5 text-xs text-neutral-400 font-semibold uppercase">L/ha</span>
        </div>
        <p class="text-[11px] text-neutral-400">Recomendação: ${product.application?.sprayVolume || '40 a 100 L/ha'}</p>
      </div>

      <!-- Resultado em Destaque -->
      <div class="bg-[#F5F5F7] rounded-2xl p-5 border border-neutral-200/60 flex flex-col justify-between">
        <div>
          <span class="text-xs text-neutral-500 font-medium">Demanda Total Estimada</span>
          <div class="flex items-baseline gap-1 mt-1">
            <span id="calc-total-product" class="text-3xl font-extrabold text-neutral-900">50</span>
            <span class="text-sm font-bold text-neutral-600">${unitShort}</span>
          </div>
          <div class="text-xs text-neutral-500 mt-2">
            Volume total de calda: <strong id="calc-total-spray" class="text-neutral-800 font-semibold">8.000 L</strong>
          </div>
        </div>

        <button id="calc-request-quote" class="mt-4 w-full btn-pill-primary py-2.5 text-xs font-bold shadow-sm">
          Solicitar Cotação para esta Área
        </button>
      </div>
    </div>
  `;

  const areaInput = container.querySelector('#calc-area-input');
  const flowInput = container.querySelector('#calc-flow-input');
  const totalProductEl = container.querySelector('#calc-total-product');
  const totalSprayEl = container.querySelector('#calc-total-spray');
  const quoteBtn = container.querySelector('#calc-request-quote');
  const presetBtns = container.querySelectorAll('.preset-ha');

  const recalculate = () => {
    const area = parseFloat(areaInput.value) || 0;
    const flow = parseFloat(flowInput.value) || 0;

    const totalProd = (area * defaultDose).toLocaleString('pt-BR', { maximumFractionDigits: 1 });
    const totalSpray = (area * flow).toLocaleString('pt-BR', { maximumFractionDigits: 0 });

    totalProductEl.textContent = totalProd;
    totalSprayEl.textContent = `${totalSpray} L`;
  };

  areaInput?.addEventListener('input', recalculate);
  flowInput?.addEventListener('input', recalculate);

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      areaInput.value = btn.getAttribute('data-val');
      recalculate();
    });
  });

  quoteBtn?.addEventListener('click', () => {
    const area = areaInput.value;
    const initialText = `${product.name} para uma área de ${area} hectares (estimado em ${totalProductEl.textContent} ${unitShort})`;
    openContactModal(initialText);
  });

  recalculate();
  return container;
}
