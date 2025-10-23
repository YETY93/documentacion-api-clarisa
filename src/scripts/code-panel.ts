// src/scripts/code-panel.ts
export class CodePanelManager {
  private tabButtons: NodeListOf<Element> | null = null;
  private tabContents: NodeListOf<Element> | null = null;
  private copyButtons: NodeListOf<Element> | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.tabButtons = document.querySelectorAll('.tab-button');
      this.tabContents = document.querySelectorAll('.tab-content');
      this.copyButtons = document.querySelectorAll('.copy-btn');
      
      this.bindTabEvents();
      this.bindCopyEvents();
    });
  }

  private bindTabEvents(): void {
    this.tabButtons?.forEach((button) => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        if (!targetTab) return;
        
        this.updateActiveTab(button);
        this.showTabContent(targetTab);
      });
    });
  }

  private updateActiveTab(activeButton: Element): void {
    this.tabButtons?.forEach((btn) => {
      btn.classList.remove('border-blue-500', 'text-blue-600', 'dark:text-blue-400');
      btn.classList.add('border-transparent', 'text-gray-500', 'dark:text-gray-400');
    });
    
    activeButton.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-400');
    activeButton.classList.add('border-blue-500', 'text-blue-600', 'dark:text-blue-400');
  }

  private showTabContent(targetTab: string): void {
    this.tabContents?.forEach((content) => {
      content.classList.add('hidden');
    });
    
    const targetContent = document.getElementById(targetTab);
    targetContent?.classList.remove('hidden');
  }

  private bindCopyEvents(): void {
    this.copyButtons?.forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        if (!targetId) return;
        
        const codeElement = document.getElementById(targetId);
        if (!codeElement) return;
        
        this.copyToClipboard(codeElement.textContent || '', button as HTMLElement);
      });
    });
  }

  private async copyToClipboard(text: string, button: HTMLElement): Promise<void> {
    const originalText = button.textContent || '';
    
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        this.showCopyFeedback(button, '¡Copiado!', originalText);
      } else {
        throw new Error('Clipboard API not supported');
      }
    } catch (error) {
      this.showCopyFeedback(button, 'Error', originalText);
    }
  }

  private showCopyFeedback(button: HTMLElement, message: string, originalText: string): void {
    button.textContent = message;
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  }
}

// Auto-inicializar
new CodePanelManager();