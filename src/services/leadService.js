/**
 * Serviço de Gerenciamento e Encaminhamento de Leads da Biopar
 * Direciona todos os leads e contatos do site para comercial@biopar.agr.br
 * e integra com WhatsApp para alta conversão.
 */

import { companyData } from '../data/company.js';

export const leadService = {
  destinationEmail: companyData.contactChannels.emailCommercial || 'comercial@biopar.agr.br',

  /**
   * Registra e encaminha o lead para o e-mail comercial e backup local
   */
  dispatchLead({
    source = 'Site Biopar',
    name = '',
    phone = '',
    email = '',
    location = '',
    crop = '',
    hectares = '',
    challenge = '',
    message = '',
    sendToWhatsApp = false
  }) {
    const timestamp = new Date().toISOString();
    const leadData = {
      id: 'lead_' + Date.now(),
      timestamp,
      source,
      name,
      phone,
      email,
      location,
      crop,
      hectares,
      challenge,
      message,
      destination: this.destinationEmail
    };

    // 1. Salva no histórico local de segurança (backup)
    try {
      const history = JSON.parse(localStorage.getItem('biopar_leads_history') || '[]');
      history.unshift(leadData);
      localStorage.setItem('biopar_leads_history', JSON.stringify(history.slice(0, 50)));
    } catch (e) {
      console.warn('Não foi possível persistir o lead localmente:', e);
    }

    // 2. Prepara texto formatado do e-mail
    const emailSubject = `[Novo Lead Agro] ${name} - ${crop ? crop + ' (' + hectares + ')' : source}`;
    const emailBody = [
      `NOVO CONTATO RECEBIDO NO SITE BIOPAR`,
      `----------------------------------------`,
      `Origem: ${source}`,
      `Data/Hora: ${new Date().toLocaleString('pt-BR')}`,
      `Destinatário: ${this.destinationEmail}`,
      ``,
      `DADOS DO CONTATO / PRODUTOR:`,
      `Nome: ${name}`,
      `Telefone/WhatsApp: ${phone}`,
      `E-mail: ${email || 'Não informado'}`,
      `Localização / Fazenda: ${location || 'Não informada'}`,
      `Cultura Principal: ${crop || 'Não informada'}`,
      `Área Plantada: ${hectares || 'Não informada'}`,
      `Principal Desafio Fitossanitário: ${challenge || 'Não informado'}`,
      ``,
      `Mensagem / Observações:`,
      `${message || 'Solicitação de cotação e dosagem direta de fábrica.'}`,
      `----------------------------------------`,
      `Mensagem gerada automaticamente pelo portal Biopar (${window.location.origin}).`
    ].join('\n');

    // 3. Monta link de e-mail (mailto)
    const mailtoUrl = `mailto:${this.destinationEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // 4. Se solicitado envio ao WhatsApp simultâneo
    let whatsappUrl = null;
    if (sendToWhatsApp) {
      const waText = [
        `🌱 *NOVO CONTATO / LEAD - BIOPAR*`,
        `*Nome:* ${name}`,
        `*WhatsApp:* ${phone}`,
        email ? `*E-mail:* ${email}` : '',
        location ? `*Localização:* ${location}` : '',
        crop ? `*Cultura:* ${crop}` : '',
        hectares ? `*Área:* ${hectares}` : '',
        challenge ? `*Desafio:* ${challenge}` : '',
        message ? `*Mensagem:* ${message}` : '',
        `\n_Encaminhado também para ${this.destinationEmail}_`
      ].filter(Boolean).join('\n');

      const rawPhone = companyData.contactChannels.whatsapp.replace(/\D/g, '');
      whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(waText)}`;
    }

    return {
      success: true,
      leadData,
      mailtoUrl,
      whatsappUrl
    };
  }
};
