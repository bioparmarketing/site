/**
 * Cliente Supabase Oficial da Biopar
 * Conexão com PostgreSQL, Storage e Autenticação
 */

export const SUPABASE_URL = 'https://tlulyzlbxylngtlnecto.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_nT0HoIT0adJruPTm4Wwh1Q_8EGGb9lc';

let client = null;

export function getSupabase() {
  if (client) return client;
  if (typeof window !== 'undefined' && window.supabase?.createClient) {
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  }
  return client;
}

/**
 * Upload de imagem para o Supabase Storage (Bucket: biopar-media)
 * @param {File|Blob} file 
 * @param {string} customPath 
 * @returns {Promise<string>} URL pública direta da imagem no CDN
 */
export async function uploadMedia(file, customPath) {
  const sb = getSupabase();
  if (!sb) throw new Error('Cliente Supabase não disponível');

  const ext = file.name ? file.name.split('.').pop() : 'jpg';
  const fileName = customPath || `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

  const { data, error } = await sb.storage
    .from('biopar-media')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error('Erro ao enviar imagem ao Supabase Storage:', error);
    throw error;
  }

  const { data: urlData } = sb.storage
    .from('biopar-media')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

/**
 * Converte e faz upload de imagem Base64 para o Supabase Storage (Bucket: biopar-media)
 * @param {string} base64Data 
 * @param {string} [customPath] 
 * @returns {Promise<string>} URL pública no Supabase Storage CDN
 */
export async function uploadBase64Media(base64Data, customPath) {
  const sb = getSupabase();
  if (!sb) throw new Error('Cliente Supabase não disponível');

  if (!base64Data || !base64Data.startsWith('data:')) {
    return base64Data; // Já é uma URL externa ou storage
  }

  const parts = base64Data.split(';base64,');
  const contentType = parts[0].split(':')[1] || 'image/jpeg';
  const raw = atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  const blob = new Blob([uInt8Array], { type: contentType });

  const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
  const fileName = customPath || `instagram/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

  const { data, error } = await sb.storage
    .from('biopar-media')
    .upload(fileName, blob, {
      cacheControl: '31536000',
      upsert: true,
      contentType
    });

  if (error) {
    console.error('Erro ao subir base64 para Supabase Storage:', error);
    throw error;
  }

  const { data: urlData } = sb.storage
    .from('biopar-media')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}
