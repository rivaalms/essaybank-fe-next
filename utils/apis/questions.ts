export function $questionApi() {
   async function get(query?: API.Query.Question) {
      return await $api<API.Response<API.Paginate<Model.Question>>>(
         `/questions`,
         {
            method: "get",
            query,
         }
      )
   }

   return {
      get,
   }
}
