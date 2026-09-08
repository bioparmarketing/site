/**
 * Componente de Ticker e Dashboard de Mercado Agro (Mercado Agora)
 * Exibe cotações em tempo real com status live, auto-refresh e cards responsivos.
 */

import { marketService } from '../services/marketProvider.js';
import { openMarketModal } from './MarketModal.js';

export function createMarketSection() {
  const section = document.createElement('section');
  section.id = 'mercado';
  section.className = 'py-12 bg-[#F5F5F7] border-y border-[#E5E5EA]';

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Cabeçalho do Dashboard -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span class="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-2.5 py-0.5 rounded-full" id="market-status-badge">Mercado Agora</span>
            <span class="text-xs text-neutral-500 font-medium" id="market-last-update">Atualizando...</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">Indicadores do Agro</h2>
          <p class="text-neutral-500 text-sm sm:text-base mt-1">Cotações físicas, futuros e câmbio integrados às principais fontes de referência.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-refresh-market" class="px-4 py-2 bg-white rounded-full border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
            <svg class="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>Atualizar Cotações</span>
          </button>
        </div>
      </div>

      <!-- Grid de Cards de Commodities -->
      <div id="market-indicators-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Renderizado dinamicamente pelo marketService -->
      </div>

      <!-- Rodapé de Fontes & Compliance -->
      <div class="mt-6 pt-4 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span class="font-medium text-neutral-700">Fontes integradas:</span>
          <span class="hover:text-neutral-800">CEPEA/ESALQ</span>
          <span>•</span>
          <span class="hover:text-neutral-800">CME/CBOT</span>
          <span>•</span>
          <span class="hover:text-neutral-800">B3</span>
          <span>•</span>
          <span class="hover:text-neutral-800">Banco Central PTAX</span>
          <span>•</span>
          <span class="hover:text-neutral-800">CONAB</span>
        </div>
        <div class="text-[11px] text-neutral-400">
          Valores informativos para auxílio à tomada de decisão agronômica e comercial.
        </div>
      </div>
    </div>
  `;

  // Listener para atualização dos dados
  const unsubscribe = marketService.subscribe(({ state, indicators, lastFetched }) => {
    const grid = section.querySelector('#market-indicators-grid');
    const updateEl = section.querySelector('#market-last-update');
    const statusBadge = section.querySelector('#market-status-badge');

    if (updateEl && lastFetched) {
      updateEl.textContent = `Atualizado às ${lastFetched.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    }

    if (statusBadge) {
      if (state === 'live') {
        statusBadge.textContent = 'Mercado Ao Vivo';
        statusBadge.className = 'text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full';
      } else if (state === 'cached') {
        statusBadge.textContent = 'Modo Offline (Cache)';
        statusBadge.className = 'text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full';
      } else if (state === 'delayed') {
        statusBadge.textContent = 'Cotações com Delay';
        statusBadge.className = 'text-xs font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-200 px-2.5 py-0.5 rounded-full';
      }
    }

    if (grid && indicators) {
      grid.innerHTML = indicators.map(ind => {
        const isUp = ind.dailyChangePercent >= 0;
        const trendClass = isUp ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50';
        const trendSign = isUp ? '+' : '';
        const trendArrow = isUp ? '▲' : '▼';

        return `
          <div data-indicator-id="${ind.id}" class="indicator-card cursor-pointer bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                <span class="font-medium uppercase tracking-wide truncate max-w-[150px]">${ind.commodity}</span>
                <span class="text-[11px] text-neutral-400">${ind.sourceName.split('/')[0]}</span>
              </div>
              <div class="text-2xl font-extrabold text-neutral-900 tracking-tight">${ind.formattedValue}</div>
              <div class="text-xs text-neutral-400 mt-0.5">${ind.unit}</div>
            </div>

            <div class="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
              <span class="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${trendClass}">
                ${trendArrow} ${trendSign}${ind.dailyChangePercent.toFixed(2)}%
              </span>
              <span class="text-[11px] text-neutral-400 group-hover:text-emerald-700 flex items-center gap-0.5">
                Detalhes
                <svg class="w-3 h-3 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </span>
            </div>
          </div>
        `;
      }).join('');

      // Adiciona click listeners para abrir modal de detalhe
      grid.querySelectorAll('.indicator-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-indicator-id');
          const item = marketService.getIndicatorById(id);
          if (item) openMarketModal(item);
        });
      });
    }
  });

  const refreshBtn = section.querySelector('#btn-refresh-market');
  refreshBtn?.addEventListener('click', () => {
    marketService.refresh();
  });

  return section;
}
