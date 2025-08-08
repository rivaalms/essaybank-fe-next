export const useAuthStore = defineStore(
   "auth",
   () => {
      const user = ref<Model.User>()
      const token = shallowRef<string>()
      const tokenExpiresAt = shallowRef<string>()

      const getToken = computed(() => token.value)
      const getTokenExpiresAt = computed(() => tokenExpiresAt.value)

      async function login(values: InferSchema<typeof $authSchema, "login">) {
         try {
            const res = await $authApi().login(values)
            user.value = res.data.user
            token.value = res.data.token.value
            const dayjs = useDayjs()
            tokenExpiresAt.value = dayjs(res.data.token.expiresAt).toJSON()
            return res
         } catch (e) {
            throw e
         }
      }

      function logout() {
         $reset()
      }

      function isTokenExpired() {
         const dayjs = useDayjs()
         return !token.value || dayjs().diff(tokenExpiresAt.value) > 0
      }

      function $reset() {
         user.value = undefined
         token.value = undefined
         tokenExpiresAt.value = undefined
      }

      return {
         user,
         token,
         getToken,
         tokenExpiresAt,
         getTokenExpiresAt,
         login,
         logout,
         isTokenExpired,
         $reset,
      }
   },
   { persist: true }
)
