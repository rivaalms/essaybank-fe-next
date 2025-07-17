export function $authApi() {
   async function login(body: InferSchema<typeof $authSchema, "login">) {
      return await $api<API.Response<Model.Auth>>(`/auth/login`, {
         method: "post",
         body,
      })
   }

   return {
      login
   }
}
