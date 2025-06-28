// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: "2025-05-15",
   devtools: { enabled: true },
   ssr: false,
   modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@shuriken-ui/nuxt"],
   css: ["~/assets/css/main.css"],
   fonts: {
      defaults: {
         weights: [300, 400, 500, 600, 700, 800],
      },
   },
   colorMode: {
      preference: "light",
      fallback: "light",
      storageKey: "color-mode"
   },
})
