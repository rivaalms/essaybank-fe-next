export function $reviewApi() {
   async function get(query?: API.Query.Review) {
      return await $api<API.Response<API.Paginate<Model.Review>>>(`/reviews`, {
         method: "get",
         query,
      })
   }

   async function create(body: InferSchema<typeof $reviewSchema, "create">) {
      return await $api<API.Response<Model.Review>>(`/reviews`, {
         method: "post",
         body,
      })
   }

   async function update(id: number, body: InferSchema<typeof $reviewSchema, "update">) {
      return await $api<API.Response<Model.Review>>(`/reviews/${id}`, {
         method: "put",
         body,
      })
   }

   return {
      get,
      create,
      update
   }
}