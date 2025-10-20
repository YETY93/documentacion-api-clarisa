// src/scripts/theme-init.js
// Este script debe cargarse lo antes posible para prevenir el parpadeo
(function() {
  // Aplicar el tema guardado inmediatamente
  const theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  
  // Asegurarse de que el documento sea visible después de cargar
  function makeVisible() {
    document.documentElement.classList.add('visible');
  }
  
  // Si el DOM ya está cargado, hacer visible inmediatamente
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    makeVisible();
  } else {
    // Si no, esperar a que se cargue
    document.addEventListener('DOMContentLoaded', makeVisible);
  }
})();