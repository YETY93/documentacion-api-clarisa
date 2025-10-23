// src/types/index.ts
import type { CollectionEntry } from 'astro:content';

export type DocEntry = CollectionEntry<'docs'>;

export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  method?: string;
  endpoint?: string;
  url: string;
  score?: number;
}

export interface SearchServiceInterface {
  search(query: string): SearchResult[];
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';