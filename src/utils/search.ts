// src/utils/search.ts
import type { DocEntry, SearchResult } from '../types';
import { UI_CONFIG } from '../constants';

export class SearchService {
  private index: SearchResult[];

  constructor(docs: DocEntry[]) {
    this.index = this.buildIndex(docs);
  }

  private buildIndex(docs: DocEntry[]): SearchResult[] {
    return docs.map(doc => ({
      id: doc.id,
      slug: doc.slug,
      title: doc.data.title,
      category: doc.data.category,
      description: doc.data.description || '',
      tags: doc.data.tags || [],
      method: doc.data.method || '',
      endpoint: doc.data.endpoint || '',
      url: `/${doc.data.category}/${doc.slug.split('/').pop()}`
    }));
  }

  search(query: string): SearchResult[] {
    if (!query || query.length < UI_CONFIG.SEARCH_MIN_LENGTH) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const terms = searchTerm.split(/\s+/);

    return this.index
      .map(doc => ({
        ...doc,
        score: this.calculateRelevance(doc, terms)
      }))
      .filter(doc => doc.score! > 0)
      .sort((a, b) => b.score! - a.score!)
      .slice(0, UI_CONFIG.SEARCH_MAX_RESULTS);
  }

  private calculateRelevance(doc: SearchResult, terms: string[]): number {
    let score = 0;
    const weights = {
      title: 10,
      method: 8,
      endpoint: 8,
      tags: 5,
      category: 3,
      description: 2,
    };

    terms.forEach(term => {
      if (doc.title.toLowerCase().includes(term)) {
        score += weights.title;
      }
      if (doc.method?.toLowerCase().includes(term)) {
        score += weights.method;
      }
      if (doc.endpoint?.toLowerCase().includes(term)) {
        score += weights.endpoint;
      }
      if (doc.tags.some(tag => tag.toLowerCase().includes(term))) {
        score += weights.tags;
      }
      if (doc.category.toLowerCase().includes(term)) {
        score += weights.category;
      }
      if (doc.description.toLowerCase().includes(term)) {
        score += weights.description;
      }
    });

    return score;
  }
}