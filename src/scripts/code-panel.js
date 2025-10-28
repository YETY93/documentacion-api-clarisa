function initCodePanel() {
  const codePanel = document.querySelector('.code-panel-container');
  if (!codePanel) return;

  const tabs = codePanel.querySelectorAll('.tab-button');
  const contents = codePanel.querySelectorAll('.tab-content');
  const copyButtons = codePanel.querySelectorAll('.copy-code-btn');

  // Función para cambiar de pestaña
  const switchTab = (tabId) => {
    contents.forEach(content => {
      if (content.id === tabId) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });
    tabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === tabId) {
        tab.classList.add('tab-active');
        tab.classList.remove('tab-inactive');
      } else {
        tab.classList.remove('tab-active');
        tab.classList.add('tab-inactive');
      }
    });
    localStorage.setItem('activeCodeTab', tabId);
  };

  // Event listeners para las pestañas
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = tab.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Event listeners para los botones de copiar
  copyButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-target');
      const codeElement = document.getElementById(targetId);
      const copyTextElement = button.querySelector('.copy-text');
      
      if (codeElement && copyTextElement) {
        await copyToClipboard(codeElement.textContent || '', copyTextElement, 'Copiar');
      }
    });
  });

  // Restaurar la pestaña activa desde localStorage
  const savedTab = localStorage.getItem('activeCodeTab');
  if (savedTab && codePanel.querySelector(`#${savedTab}`)) {
    switchTab(savedTab);
  } else if (tabs.length > 0) {
    // O mostrar la primera pestaña por defecto
    switchTab(tabs[0].getAttribute('data-tab'));
  }
}

async function copyToClipboard(text, buttonElement, originalText) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback para navegadores sin clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    buttonElement.textContent = '¡Copiado!';
    const button = buttonElement.closest('button');
    button?.classList.add('bg-green-500', 'text-white', 'border-green-500');

    setTimeout(() => {
      buttonElement.textContent = originalText;
      button?.classList.remove('bg-green-500', 'text-white', 'border-green-500');
    }, 2000);
  } catch (err) {
    console.error('Error al copiar:', err);
    buttonElement.textContent = 'Error';
    setTimeout(() => {
      buttonElement.textContent = originalText;
    }, 2000);
  }
}

// Inicializar en la carga de la página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCodePanel);
} else {
  initCodePanel();
}

// Re-inicializar cuando Astro cambia de página o cuando el panel de código se abre
document.addEventListener('astro:page-load', initCodePanel);
document.addEventListener('codePanelOpened', initCodePanel);
