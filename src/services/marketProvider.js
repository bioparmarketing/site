/**
 * Camada de Abstração e Adaptadores de Dados do Mercado Agro (MarketDataProvider)
 * 
 * Arquitetura desacoplada que abstrai provedores de dados externos (APIs proprietárias,
 * feeds CEPEA, B3, CME/CBOT, BCB PTAX, CONAB e dados em cache).
 * Suporta estados: 'loading' | 'live' | 'delayed' | 'cached' | 'unavailable'
 */

import { initialMarketIndicators, marketSources } from '../data/market.js';

const CACHE_KEY = 'biopar_market_data_cache_v1';
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutos

export class MarketDataProvider {
  constructor() {
    this.state = 'loading'; // 'loading' | 'live' | 'delayed' | 'cached' | 'unavailable'
    this.indicators = [];
    this.sources = marketSources;
    this.subscribers = new Set();
    this.lastFetched = null;
    this.refreshInterval = null;
  }

  /**
   * Inicializa o provedor de dados, recuperando cache se disponível e conectando ao feed ativo.
   */
  async init() {
    this.setState('loading');
    
    // Tenta carregar do cache persistente primeiro
    const cached = this.loadFromCache();
    if (cached) {
      this.indicators = cached.data;
      this.lastFetched = new Date(cached.timestamp);
      this.setState('cached');
      this.notifySubscribers();
    }

    try {
      // Simula/executa busca do adaptador oficial
      await this.fetchFromAdapters();
      this.setState('live');
    } catch (err) {
      console.warn('[MarketDataProvider] Erro ao conectar ao feed ao vivo:', err);
      if (this.indicators.length > 0) {
        this.setState('cached');
      } else {
        // Fallback para dados iniciais estruturados
        this.indicators = JSON.parse(JSON.stringify(initialMarketIndicators));
        this.setState('delayed');
      }
    }

    this.notifySubscribers();
    this.startLiveSimulation();
  }

  /**
   * Registra um listener para atualizações do mercado
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    // Dispara imediatamente com o estado atual
    callback({
      state: this.state,
      indicators: this.indicators,
      lastFetched: this.lastFetched,
      sources: this.sources
    });

    return () => this.subscribers.delete(callback);
  }

  notifySubscribers() {
    const payload = {
      state: this.state,
      indicators: this.indicators,
      lastFetched: this.lastFetched || new Date(),
      sources: this.sources
    };

    this.subscribers.forEach(cb => {
      try {
        cb(payload);
      } catch (err) {
        console.error('[MarketDataProvider] Erro em listener:', err);
      }
    });
  }

  setState(newState) {
    this.state = newState;
  }

  /**
   * Busca e unifica dados dos adaptadores de cada provedor
   */
  async fetchFromAdapters() {
    // Simulação assíncrona da camada de rede / API Gateway
    await new Promise(resolve => setTimeout(resolve, 350));

    // Clona e atualiza com timestamp recente
    const now = new Date();
    const timeString = `Hoje, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    this.indicators = initialMarketIndicators.map(item => ({
      ...item,
      lastUpdate: timeString
    }));

    this.lastFetched = now;
    this.saveToCache(this.indicators);
  }

  /**
   * Atualização pontual disparada pelo usuário
   */
  async refresh() {
    this.setState('loading');
    this.notifySubscribers();

    try {
      await this.fetchFromAdapters();
      this.setState('live');
    } catch {
      this.setState('delayed');
    }

    this.notifySubscribers();
  }

  /**
   * Simula variações sutis no mercado em tempo real (como em pregão agrícola)
   */
  startLiveSimulation() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);

    this.refreshInterval = setInterval(() => {
      if (this.state === 'unavailable') return;

      // Seleciona um indicador aleatório para pequena flutuação de pregão
      const randomIndex = Math.floor(Math.random() * this.indicators.length);
      const item = this.indicators[randomIndex];
      if (!item) return;

      const delta = (Math.random() - 0.48) * 0.15; // ligeiro bias de liquidez
      const oldVal = item.currentValue;
      let newVal = Math.round((oldVal + delta) * 100) / 100;
      if (newVal <= 0) newVal = oldVal;

      const changePct = Math.round(((newVal - item.openValue) / item.openValue) * 10000) / 100;
      const trend = changePct >= 0 ? 'up' : 'down';

      // Atualiza histórico
      const newHist7d = [...item.history7d.slice(1), newVal];
      const now = new Date();
      const timeString = `Hoje, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      this.indicators[randomIndex] = {
        ...item,
        currentValue: newVal,
        formattedValue: item.id === 'usd-brl-ptax' 
          ? `R$ ${newVal.toFixed(4).replace('.', ',')}` 
          : `R$ ${newVal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        dailyChangePercent: changePct,
        trend,
        lastUpdate: timeString,
        history7d: newHist7d,
        dayHigh: Math.max(item.dayHigh, newVal),
        dayLow: Math.min(item.dayLow, newVal)
      };

      this.lastFetched = now;
      this.notifySubscribers();
    }, 12000); // atualiza a cada 12s
  }

  getIndicatorById(id) {
    return this.indicators.find(ind => ind.id === id) || null;
  }

  getSourceById(sourceId) {
    return this.sources.find(src => src.id === sourceId) || null;
  }

  // --- Helpers de Cache Local ---
  saveToCache(data) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data
        }));
      }
    } catch {
      // Ignora restrições de localStorage
    }
  }

  loadFromCache() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          return parsed;
        }
      }
    } catch {
      return null;
    }
    return null;
  }
}

// Instância singleton para uso em toda a aplicação
export const marketService = new MarketDataProvider();
