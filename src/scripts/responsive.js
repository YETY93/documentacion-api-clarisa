class ResponsiveManager {
  constructor() {
    // Elementos del menú lateral
    this.mobileMenuToggle = null;
    this.mobileSidebarOverlay = null;
    this.mobileSidebar = null;
    this.mobileOverlay = null;

    // Elementos del panel de código
    this.codePanelToggle = null;
    this.codePanelContent = null;
    this.closePanel = null;
    this.panelOverlay = null;
    this.isCodePanelOpen = false;

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      // Menú lateral
      this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      this.mobileSidebarOverlay = document.getElementById('mobile-sidebar-overlay');
      this.mobileSidebar = document.getElementById('mobile-sidebar');
      this.mobileOverlay = document.getElementById('mobile-overlay');

      // Panel de código
      this.codePanelToggle = document.getElementById('code-panel-toggle');
      this.codePanelContent = document.getElementById('code-panel-content');
      this.closePanel = document.getElementById('close-panel');
      this.panelOverlay = document.getElementById('panel-overlay');

      this.bindEvents();
    });
  }

  bindEvents() {
    // Eventos del menú lateral
    this.mobileMenuToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleSidebar();
    });

    this.mobileOverlay?.addEventListener('click', () => {
      this.closeSidebar();
    });

    // Eventos del panel de código
    this.codePanelToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleCodePanel();
    });

    this.closePanel?.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeCodePanel();
    });

    this.panelOverlay?.addEventListener('click', () => {
      this.closeCodePanel();
    });

    // Cerrar elementos al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        this.closeSidebar();
      }
      if (window.innerWidth >= 1280) {
        this.closeCodePanel();
      }
    });

    // Cerrar panel con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.isCodePanelOpen) {
          this.closeCodePanel();
        }
        if (!this.mobileSidebarOverlay?.classList.contains('hidden')) {
          this.closeSidebar();
        }
      }
    });
  }

  // Métodos del menú lateral
  toggleSidebar() {
    const isHidden = this.mobileSidebarOverlay?.classList.contains('hidden');

    if (isHidden) {
      this.mobileSidebarOverlay?.classList.remove('hidden');
      // Pequeño delay para la animación
      setTimeout(() => {
        this.mobileSidebar?.classList.remove('-translate-x-full');
      }, 10);
    } else {
      this.closeSidebar();
    }
  }

  closeSidebar() {
    this.mobileSidebar?.classList.add('-translate-x-full');
    // Esperar a que termine la animación antes de ocultar el overlay
    setTimeout(() => {
      this.mobileSidebarOverlay?.classList.add('hidden');
    }, 300);
  }

  // Métodos del panel de código
  toggleCodePanel() {
    if (this.isCodePanelOpen) {
      this.closeCodePanel();
    } else {
      this.openCodePanel();
    }
  }

  openCodePanel() {
    this.isCodePanelOpen = true;

    // Mostrar overlay primero
    this.panelOverlay?.classList.remove('hidden');

    // Pequeño delay para la animación suave
    setTimeout(() => {
      this.codePanelContent?.classList.remove('translate-x-full');

      // Disparar evento para reinicializar el CodePanel
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('codePanelOpened'));
      }, 300);
    }, 10);

    // Prevenir scroll del body en móvil
    if (window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeCodePanel() {
    this.isCodePanelOpen = false;

    // Animar salida del panel
    this.codePanelContent?.classList.add('translate-x-full');

    // Esperar a que termine la animación antes de ocultar el overlay
    setTimeout(() => {
      this.panelOverlay?.classList.add('hidden');
    }, 300);

    // Restaurar scroll del body
    document.body.style.overflow = '';
  }
}

// Auto-inicializar
new ResponsiveManager();
