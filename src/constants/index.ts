// src/constants/index.ts
export const API_CONFIG = {
  BASE_URL: 'https://api.clarisa.com/v1',
  VERSION: 'v1',
} as const;

export const UI_CONFIG = {
  SEARCH_MIN_LENGTH: 2,
  SEARCH_MAX_RESULTS: 8,
  SEARCH_DEBOUNCE_MS: 300,
} as const;

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

export const BADGE_STYLES = {
  get: 'bg-success-400/20 text-success-600 dark:bg-success-400/30 dark:text-success-400',
  post: 'bg-primary-400/20 text-primary-600 dark:bg-primary-400/30 dark:text-primary-400',
  put: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  delete: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  patch: 'bg-clarisa-500/20 text-clarisa-700 dark:bg-clarisa-500/30 dark:text-clarisa-500',
} as const;

export const CONTACT_INFO = {
  SUPPORT_EMAIL: 'soporte@clarisa.co',
  STATUS_URL: 'status.clarisa.com',
  DISCORD_URL: '#',
  HELP_CENTER_URL: '#',
} as const;