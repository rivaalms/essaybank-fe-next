export const useAuthStore = defineStore(
   "auth",
   () => {
      const user = ref<Model.User>()
      const token = shallowRef<string>()
      const tokenExpiresAt = shallowRef<string>()

      const getToken = computed(() => token.value)
      const getTokenExpiresAt = computed(() => tokenExpiresAt.value)

      async function login(values: InferSchema<typeof $authSchema, "login">) {
         const res = await $authApi().login(values)
         user.value = res.data.user
         token.value = res.data.token.value
         const dayjs = useDayjs()
         tokenExpiresAt.value = dayjs(res.data.token.expiresAt).toJSON()
         return res
      }

      function logout() {
         $reset()
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
         $reset,
      }
   },
   { persist: true }
)
