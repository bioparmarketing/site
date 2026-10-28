/**
 * Roteador SPA Ultrarrápido e Fluido para o Biopar Website
 * Suporta rotas diretas, parâmetros dinâmicos (:slug), âncoras na home e histórico.
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
   * Inicializa os listeners de navegação
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
   * Navega para uma rota ou âncora específica
   */
  navigate(url) {
    if (!url) return;

    // Caso 1: Âncora interna da home (ex: /#biopar ou #biopar ou #/#biopar ou #science)
    const isAnchor = url.startsWith('/#') || url.startsWith('##') || (url.startsWith('#') && !url.startsWith('#/'));
    if (isAnchor) {
      const anchor = url.replace(/^(\/?#+|#+)/, '');
      const currentHash = (window.location.hash || '').split('?')[0];
      const isHome = currentHash === '' || currentHash === '#' || currentHash === '#/' || currentHash.startsWith('#/#');

      if (!isHome) {
        window.location.hash = `#/#${anchor}`;
      } else {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    // Caso 2: Rota SPA (ex: #/produtos, #/produtos/trixma, #/produtos/categoria/biofungicidas)
    let cleanPath = url;
    if (cleanPath.startsWith('#/')) {
      cleanPath = cleanPath.slice(1); // remove o primeiro '#' mantendo a barra: '/produtos/trixma'
    } else if (cleanPath.startsWith('#')) {
      cleanPath = cleanPath.slice(1);
    }
    if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }

    const targetHash = `#${cleanPath}`;

    if (window.location.hash === targetHash) {
      this.handleRoute();
    } else {
      window.location.hash = targetHash;
      // Garante resolução imediata da rota
      this.handleRoute();
    }
  }

  /**
   * Resolve a rota atual baseada no hash da URL
   */
  handleRoute() {
    let hash = window.location.hash.slice(1);
    if (!hash || hash === '') hash = '/';
    
    // Se o hash for uma âncora local de seção (não começa com '/'), rola até o elemento e NÃO reseta a página!
    if (!hash.startsWith('/')) {
      const el = document.getElementById(hash);
      if (el) {
        const headerOffset = 145;
        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        return;
      }
      return;
    }

    // Separa query params se existirem
    const [pathOnly, queryString] = hash.split('?');
    const queryParams = new URLSearchParams(queryString || '');

    // Verifica âncoras na home tipo /#biopar ou /#science
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
          if (pageElement && (typeof HTMLElement === 'undefined' || pageElement instanceof HTMLElement)) {
            container.appendChild(pageElement);
          }
        }

        // Rola ao topo ou à âncora
        if (anchor) {
          setTimeout(() => {
            const target = document.getElementById(anchor);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }

        this.notifyRouteChanged(path);
        break;
      }
    }

    if (!matched) {
      // Se path corresponder a um ID existente na página, apenas rola até ele
      const cleanId = path.replace(/^\//, '');
      const el = document.getElementById(cleanId);
      if (el) {
        const headerOffset = 145;
        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        return;
      }
      // 404 Fallback - redireciona para a Home apenas se for realmente rota inexistente
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
