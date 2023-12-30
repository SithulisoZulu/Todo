import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';
import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(), react(), sentry(), spotlightjs()],
  integrations: [sentry(), spotlightjs()]
});