// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url"
import { join, dirname } from "node:path"

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
   compatibilityDate: "2025-05-15",
   devtools: { enabled: true },
   ssr: false,
   components: [
      {
         path: join(currentDir, "./components"),
         pathPrefix: false,
      },
   ],
   imports: {
      dirs: [
         join(currentDir, "./stores/**"),
         join(currentDir, "./composables/**"),
         join(currentDir, "./utils/**"),
      ],
   },
   runtimeConfig: {
      public: {
         apiUrl: import.meta.env.API_URL,
      },
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
   css: [join(currentDir, "./assets/css/main.css")],
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
