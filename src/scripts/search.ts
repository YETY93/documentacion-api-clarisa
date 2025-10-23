// src/scripts/search.ts
import { UI_CONFIG } from '../constants';
import type { SearchResult } from '../types';

export class ClientSearchManager {
  private searchData: SearchResult[] = [];
  private searchInput: HTMLInputElement | null = null;
  private searchClear: HTMLElement | null = null;
  private searchResults: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.searchInput = document.getElementById('search-input') as HTMLInputElement;
      this.searchClear = document.getElementById('search-clear');
      this.searchResults = document.getElementById('search-results');
      
      if (!this.searchInput) return;
      
      // Obtener datos de búsqueda del objeto global
      this.searchData = (window as any).searchData || [];
      
      this.bindEvents();
    });
  }

  private bindEvents(): void {
    if (!this.searchInput) return;

    this.searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.trim();
      this.performSearch(query);
      this.toggleClearButton(query.length > 0);
    });

    this.searchClear?.addEventListener('click', () => {
      this.clearSearch();
    });

    document.addEventListener('click', (e) => {
      if (!this.searchInput?.contains(e.target as Node) && 
          !this.searchResults?.contains(e.target as Node)) {
        this.hideResults();
      }
    });

    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideResults();
        this.searchInput?.blur();
      }
    });
  }

  private performSearch(query: string): void {
    if (query.length < UI_CONFIG.SEARCH_MIN_LENGTH) {
      this.hideResults();
      return;
    }

    const results = this.searchData.filter(doc => {
      const searchText = `${doc.title} ${doc.category} ${doc.description} ${doc.tags.join(' ')} ${doc.method} ${doc.endpoint}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    }).slice(0, UI_CONFIG.SEARCH_MAX_RESULTS);

    this.updateSearchResults(results, query);
  }

  private updateSearchResults(results: SearchResult[], query: string): void {
    if (!this.searchResults) return;

    if (results.length === 0 && query.length >= UI_CONFIG.SEARCH_MIN_LENGTH) {
      this.searchResults.innerHTML = this.getNoResultsHTML(query);
    } else if (results.length > 0) {
      this.searchResults.innerHTML = results.map(result => this.getResultHTML(result)).join('');
    }

    this.searchResults.classList.toggle('hidden', results.length === 0 && query.length < UI_CONFIG.SEARCH_MIN_LENGTH);
  }

  private getNoResultsHTML(query: string): string {
    return `
      <div class="p-4 text-center text-gray-500 dark:text-gray-400">
        <p class="text-sm">No se encontraron resultados para "${query}"</p>
        <p class="text-xs mt-1">Intenta con otros términos de búsqueda</p>
      </div>
    `;
  }

  private getResultHTML(result: SearchResult): string {
    const methodBadge = result.method ? 
      `<span class="inline-flex items-center rounded font-medium uppercase tracking-wide text-xs px-2 py-1 ${this.getBadgeClasses(result.method)}">${result.method}</span>` : '';
    
    const endpoint = result.endpoint ? 
      `<p class="text-xs font-mono text-gray-600 dark:text-gray-300 mb-1">${result.endpoint}</p>` : '';
    
    const description = result.description ? 
      `<p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">${result.description}</p>` : '';

    return `
      <a href="${result.url}" class="block p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group border-b border-gray-100 dark:border-gray-700 last:border-b-0">
        <div class="flex items-start justify-between mb-1">
          <div class="flex items-center space-x-2">
            ${methodBadge}
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">${result.title}</h3>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded capitalize">${result.category}</span>
        </div>
        ${endpoint}
        ${description}
      </a>
    `;
  }

  private getBadgeClasses(method: string): string {
    const classes = {
      get: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      post: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      put: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      delete: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      patch: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    };
    return classes[method.toLowerCase() as keyof typeof classes] || classes.get;
  }

  private toggleClearButton(show: boolean): void {
    this.searchClear?.classList.toggle('hidden', !show);
  }

  private clearSearch(): void {
    if (this.searchInput) {
      this.searchInput.value = '';
      this.searchInput.focus();
    }
    this.toggleClearButton(false);
    this.hideResults();
  }

  private hideResults(): void {
    this.searchResults?.classList.add('hidden');
  }
}

// Inicializar el manager de búsqueda
new ClientSearchManager();