// src/scripts/mobile-menu.ts
export class MobileMenuManager {
  private mobileMenuButton: HTMLElement | null = null;
  private mobileMenu: HTMLElement | null = null;
  private mobileSidebar: HTMLElement | null = null;
  private mobileOverlay: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.mobileMenuButton = document.getElementById('mobile-menu-button');
      this.mobileMenu = document.getElementById('mobile-menu');
      this.mobileSidebar = document.getElementById('mobile-sidebar');
      this.mobileOverlay = document.getElementById('mobile-overlay');
      
      this.bindEvents();
    });
  }

  private bindEvents(): void {
    this.mobileMenuButton?.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    this.mobileOverlay?.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        this.closeMobileMenu();
      }
    });
  }

  private toggleMobileMenu(): void {
    this.mobileMenu?.classList.toggle('hidden');
    this.mobileSidebar?.classList.toggle('-translate-x-full');
  }

  private closeMobileMenu(): void {
    this.mobileMenu?.classList.add('hidden');
    this.mobileSidebar?.classList.add('-translate-x-full');
  }
}

// Auto-inicializar
new MobileMenuManager();