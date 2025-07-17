export const useAuthStore = defineStore(
   "auth",
   () => {
      const user = ref<Model.User>()
      const token = shallowRef<string>()

      const getToken = computed(() => token.value)

      async function login(values: InferSchema<typeof $authSchema, "login">) {
         const res = await $authApi().login(values)
         user.value = res.data.user
         token.value = res.data.token
         return res
      }

      function logout() {
         $reset()
      }

      function $reset() {
         user.value = undefined
         token.value = undefined
      }

      return {
         user,
         token,
         getToken,
         login,
         logout,
         $reset,
      }
   },
   { persist: true }
)
