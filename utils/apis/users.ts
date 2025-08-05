export function $userApi() {
   async function get(query?: API.Query.User) {
      return await $api<API.Response<API.Paginate<Model.User>>>(`/users`, {
         method: "get",
         query,
      })
   }

   async function create(
      body: Omit<
         InferSchema<typeof $userSchema, "create">,
         "password_confirmation"
      >
   ) {
      return await $api<API.Response<Model.User>>(`/users`, {
         method: "post",
         body,
      })
   }

   return {
      get,
      create,
   }
}
