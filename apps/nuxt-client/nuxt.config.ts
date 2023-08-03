// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      bodyAttrs: { style: 'height: 100%; margin:0; padding: 0;' },
    },
  },
});
