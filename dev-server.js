const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // CORS & Desativação de cache em desenvolvimento
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const urlPath = req.url.split('?')[0];
  let safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[\/\\])+/, '');
  
  if (safePath === '/' || safePath === '\\' || safePath === '') {
    safePath = '/index.html';
  }

  // Se o browser pedir arquivos em subcaminhos como /produtor/src/... ou /produtos/static/...
  const normalizedPath = safePath.replace(/\\/g, '/');
  const assetMatch = normalizedPath.match(/(\/(src|static|public)\/.+)/);
  if (assetMatch) {
    safePath = assetMatch[1];
  }

  let filePath = path.join(ROOT, safePath);

  // Se for diretório, busca index.html dentro dele
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Se o arquivo não existir:
  if (!fs.existsSync(filePath)) {
    const ext = path.extname(safePath).toLowerCase();
    // Se for arquivo estático/código com extensão faltando, retorna 404 (evita erro fatal de MIME type no ES Modules)
    if (ext && ext !== '.html') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Arquivo não encontrado: ${safePath}`);
      return;
    }
    // Fallback SPA para rotas limpas do cliente (ex: /produtor, /privacidade, etc.)
    filePath = path.join(ROOT, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Erro interno do servidor');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Escuta em 0.0.0.0 para atender tanto localhost (IPv6/IPv4) quanto 127.0.0.1 e IPs locais
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Preview Local] Servidor ativo em:`);
  console.log(`- http://localhost:${PORT}`);
  console.log(`- http://127.0.0.1:${PORT}`);
});
