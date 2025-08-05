export function $userApi() {
   async function get(query?: API.Query.User) {
      return await $api<API.Response<API.Paginate<Model.User>>>(`/users`, {
         method: "get",
         query,
      })
   }

   return {
      get,
   }
}
