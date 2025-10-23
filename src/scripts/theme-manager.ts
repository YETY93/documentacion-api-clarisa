// src/scripts/theme-manager.ts
export class ThemeManager {
  private themeToggle: HTMLElement | null = null;
  private sunIcon: HTMLElement | null = null;
  private moonIcon: HTMLElement | null = null;
  private themeText: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    this.themeToggle = document.getElementById('theme-toggle');
    this.sunIcon = document.getElementById('sun-icon');
    this.moonIcon = document.getElementById('moon-icon');
    this.themeText = document.getElementById('theme-text');
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      this.updateThemeUI(true);
    } else {
      this.updateThemeUI(false);
    }
    
    this.bindEvents();
  }

  private bindEvents(): void {
    this.themeToggle?.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      
      if (isDark) {
        localStorage.setItem('theme', 'dark');
        this.updateThemeUI(true);
      } else {
        localStorage.setItem('theme', 'light');
        this.updateThemeUI(false);
      }
    });
  }

  private updateThemeUI(isDark: boolean): void {
    if (!this.sunIcon || !this.moonIcon || !this.themeText) return;

    if (isDark) {
      this.sunIcon.style.opacity = '1';
      this.sunIcon.style.transform = 'rotate(0deg) scale(1)';
      this.moonIcon.style.opacity = '0';
      this.moonIcon.style.transform = 'rotate(180deg) scale(0.8)';
      this.themeText.textContent = 'Oscuro';
    } else {
      this.sunIcon.style.opacity = '0';
      this.sunIcon.style.transform = 'rotate(-180deg) scale(0.8)';
      this.moonIcon.style.opacity = '1';
      this.moonIcon.style.transform = 'rotate(0deg) scale(1)';
      this.themeText.textContent = 'Claro';
    }
  }
}

// Auto-inicializar
new ThemeManager();