export const useAuthStore = defineStore("auth", () => {
   const user = ref<Model.User>()
   const token = shallowRef<string>()

   const getToken = computed(() => token.value)

   function $reset() {
      user.value = undefined
      token.value = undefined
   }

   return {
      user,
      token,
      getToken,
      $reset
   }
})