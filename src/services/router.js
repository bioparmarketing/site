/**
 * Roteador SPA Ultrarrápido e Fluido para o Biopar Website
 * Suporta rotas diretas, parâmetros dinâmicos (:slug) e navegação com histórico.
 */

export class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    this.params = {};
    this.listeners = [];
  }

  /**
   * Adiciona uma rota e sua função renderizadora
   */
  add(path, handler) {
    // Converte /produtos/:slug em regex
    const paramNames = [];
    const regexPath = path.replace(/:([a-zA-Z0-9_-]+)/g, (_, name) => {
      paramNames.push(name);
      return '([^\\/]+)';
    });

    const regex = new RegExp(`^${regexPath}$`);
    this.routes.push({ path, regex, paramNames, handler });
    return this;
  }

  /**
   * Inicializa o listener de navegação
   */
  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Intercepta cliques em links com atributo data-link
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.navigate(href);
      }
    });

    this.handleRoute();
  }

  /**
   * Navega para uma rota específica
   */
  navigate(url) {
    if (url.startsWith('/#') || url.startsWith('#')) {
      const anchor = url.replace(/^\/?#/, '');
      if (window.location.hash.startsWith('#/produtos') || window.location.hash.startsWith('#/blog')) {
        window.location.hash = `#/${anchor ? '#' + anchor : ''}`;
      } else {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      return;
    }

    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    window.location.hash = `#${cleanUrl}`;
  }

  /**
   * Resolve a rota atual
   */
  handleRoute() {
    let hash = window.location.hash.slice(1);
    if (!hash || hash === '') hash = '/';
    
    // Separa query params se existirem
    const [pathOnly, queryString] = hash.split('?');
    const queryParams = new URLSearchParams(queryString || '');

    // Verifica âncoras na home tipo /#biopar
    if (pathOnly.includes('#')) {
      const parts = pathOnly.split('#');
      const base = parts[0] || '/';
      const anchor = parts[1];
      this.resolvePath(base, queryParams, anchor);
      return;
    }

    this.resolvePath(pathOnly, queryParams);
  }

  resolvePath(path, queryParams, anchor = null) {
    let matched = false;

    for (const route of this.routes) {
      const match = path.match(route.regex);
      if (match) {
        matched = true;
        const params = {};
        route.paramNames.forEach((name, index) => {
          params[name] = decodeURIComponent(match[index + 1]);
        });

        this.currentRoute = path;
        this.params = params;

        // Renderiza o componente da página
        const container = document.getElementById('app-content');
        if (container) {
          container.innerHTML = '';
          const pageElement = route.handler({ params, queryParams, router: this });
          if (pageElement instanceof HTMLElement) {
            container.appendChild(pageElement);
          }
        }

        // Rola ao topo ou à âncora
        if (anchor) {
          setTimeout(() => {
            const target = document.getElementById(anchor);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }

        this.notifyRouteChanged(path);
        break;
      }
    }

    if (!matched) {
      // 404 Fallback - redireciona para a Home
      this.navigate('/');
    }
  }

  onRouteChange(callback) {
    this.listeners.push(callback);
  }

  notifyRouteChanged(path) {
    this.listeners.forEach(fn => fn(path));
  }
}

export const router = new Router();
