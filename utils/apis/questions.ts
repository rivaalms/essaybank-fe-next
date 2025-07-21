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

   async function create(body: InferSchema<typeof $questionSchema, "create">) {
      return await $api<API.Response<Model.Question>>(`/questions`, {
         method: "post",
         body,
      })
   }

   async function update(
      id: number,
      body: InferSchema<typeof $questionSchema, "update">
   ) {
      return await $api<API.Response<Model.Question>>(`/questions/${id}`, {
         method: "put",
         body,
      })
   }

   async function destroy(id: number) {
      return await $api<API.Response<null>>(`/questions/${id}`, {
         method: "delete",
      })
   }

   return {
      get,
      create,
      update,
      destroy,
   }
}
