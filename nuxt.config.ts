// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: "2025-05-15",
   devtools: { enabled: true },
   ssr: false,
   components: [
      {
         path: "~/components",
         pathPrefix: false,
      },
   ],
   imports: {
      dirs: ["~/stores/**", "~/composables/**", "~/utils/**"],
   },
   modules: [
      "@nuxt/fonts",
      "@nuxt/icon",
      "@nuxt/image",
      "@shuriken-ui/nuxt",
      "@pinia/nuxt",
      "pinia-plugin-persistedstate/nuxt",
      "dayjs-nuxt",
   ],
   css: ["~/assets/css/main.css"],
   fonts: {
      defaults: {
         weights: [300, 400, 500, 600, 700, 800],
      },
   },
   colorMode: {
      preference: "light",
      fallback: "light",
      storageKey: "color-mode",
   },
   dayjs: {
      locales: ["id"],
      defaultLocale: "id",
      defaultTimezone: "Asia/Jakarta",
      plugins: ["utc", "relativeTime", "timezone"],
   },
})
