// src/context/theme.ts
import { createContext, useContext } from 'astro';

export type Theme = 'light' | 'dark';

export const ThemeContext = createContext<Theme>('light');

export function useTheme() {
  return useContext(ThemeContext);
}