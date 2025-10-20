// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // Importa el plugin de Tailwind CSS


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()]
});