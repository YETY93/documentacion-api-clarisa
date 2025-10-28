function enhancedHighlightJson(jsonString) {
  return jsonString
    .replace(/("[\w\s\-_]*")(\s*:\s*)/g, '<span class="json-key">$1</span>$2')
    .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
    .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
    .replace(/(\[|\]|\{|\})/g, '<span class="json-bracket">$1</span>');
}

function initEnhancedJsonViewers() {
  document.querySelectorAll('.enhanced-json-code').forEach(codeBlock => {
    const content = codeBlock.textContent || '';
    if (content.trim()) {
      try {
        JSON.parse(content);
        codeBlock.innerHTML = enhancedHighlightJson(content);
      } catch (e) {
        codeBlock.innerHTML = content;
      }
    }
  });

  document.querySelectorAll('.copy-json-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-target');
      const codeElement = document.getElementById(targetId);
      const copyText = button.querySelector('.copy-text');

      if (codeElement && copyText) {
        await copyToClipboard(codeElement.textContent || '', copyText, 'Copiar');
      }
    });
  });
}

async function copyToClipboard(text, buttonElement, originalText) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
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
    button.classList.add('bg-green-500', 'text-white');

    setTimeout(() => {
      buttonElement.textContent = originalText;
      button.classList.remove('bg-green-500', 'text-white');
    }, 2000);
  } catch (error) {
    console.error('Error al copiar:', error);
    buttonElement.textContent = 'Error';
    setTimeout(() => {
      buttonElement.textContent = originalText;
    }, 2000);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancedJsonViewers);
} else {
  initEnhancedJsonViewers();
}

document.addEventListener('astro:page-load', initEnhancedJsonViewers);
