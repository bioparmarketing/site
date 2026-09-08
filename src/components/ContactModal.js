/**
 * Modal de Contato & Conversão Biopar
 * "Fale com a Biopar" / "Falar com um Especialista"
 */

import { showToast } from './Toast.js';

export function openContactModal(initialProduct = '') {
  let modalEl = document.getElementById('contact-modal-overlay');
  if (modalEl) modalEl.remove();

  modalEl = document.createElement('div');
  modalEl.id = 'contact-modal-overlay';
  modalEl.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-200 opacity-0';

  modalEl.innerHTML = `
    <div class="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-100 transform scale-95 transition-transform duration-200" id="contact-modal-card">
      <button id="close-contact-modal" class="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors" aria-label="Fechar">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <img src="./public/assets/logo-biopar.avif" alt="Biopar Biotecnologia" class="h-8 w-auto object-contain" />
          <span class="inline-block text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Atendimento Especializado</span>
        </div>
        <h3 class="text-2xl font-bold text-neutral-900 tracking-tight">Fale com a Biopar</h3>
        <p class="text-neutral-500 text-sm mt-1">Conecte-se com nossa equipe técnica de agrônomos e microbiologistas.</p>
      </div>

      <form id="contact-form" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">Nome Completo</label>
          <input type="text" required placeholder="Seu nome ou da fazenda" class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">E-mail</label>
            <input type="email" required placeholder="seuemail@agro.com" class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">Telefone / WhatsApp</label>
            <input type="tel" required placeholder="(00) 00000-0000" class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">Seu Perfil</label>
            <select class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all">
              <option>Produtor Rural</option>
              <option>Engenheiro Agrônomo / Consultor</option>
              <option>Revenda / Distribuidor</option>
              <option>Pesquisador / Estudante</option>
              <option>Outro</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">Cultura Principal</label>
            <select class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all">
              <option>Soja</option>
              <option>Milho</option>
              <option>Algodão</option>
              <option>Café</option>
              <option>Cana-de-açúcar</option>
              <option>Trigo / Cereais de Inverno</option>
              <option>Hortifrúti (HF)</option>
              <option>Pastagens</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">Como podemos ajudar?</label>
          <textarea rows="3" placeholder="${initialProduct ? `Gostaria de informações sobre o ${initialProduct}...` : 'Descreva seu desafio no campo ou interesse técnico...'}" class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"></textarea>
        </div>

        <div class="pt-2">
          <button type="submit" class="w-full btn-pill-primary py-3 text-base shadow-md font-semibold">
            Enviar Mensagem
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalEl);

  // Animates in
  requestAnimationFrame(() => {
    modalEl.classList.remove('opacity-0');
    modalEl.classList.add('opacity-100');
    const card = document.getElementById('contact-modal-card');
    card?.classList.remove('scale-95');
    card?.classList.add('scale-100');
  });

  const closeBtn = document.getElementById('close-contact-modal');
  const close = () => {
    modalEl.classList.remove('opacity-100');
    modalEl.classList.add('opacity-0');
    const card = document.getElementById('contact-modal-card');
    card?.classList.remove('scale-100');
    card?.classList.add('scale-95');
    setTimeout(() => modalEl.remove(), 200);
  };

  closeBtn?.addEventListener('click', close);
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) close();
  });

  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    close();
    showToast('Sua solicitação foi enviada com sucesso! Um consultor técnico Biopar entrará em contato em breve.', 'success');
  });
}
