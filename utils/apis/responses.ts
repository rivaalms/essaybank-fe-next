export function $responseApi() {
   async function get(query?: API.Query.Response) {
      const token = useAuthStore().token
      const ip = useEssayStore().ip
      const headers: Record<string, string> = {}
      if (!token && ip) {
         headers.identifier = ip
      }
      return await $api<API.Response<API.Paginate<Model.Response>>>(
         `/responses`,
         {
            method: "get",
            query,
            headers,
         }
      )
   }

   async function create(body: InferSchema<typeof $responseSchema, "create">) {
      return await $api<API.Response<Model.Response>>(`/responses`, {
         method: "post",
         body,
      })
   }

   async function update(
      id: number,
      body: InferSchema<typeof $responseSchema, "update">
   ) {
      return await $api<API.Response<Model.Response>>(`/responses/${id}`, {
         method: "put",
         body,
      })
   }

   return {
      get,
      create,
      update,
   }
}
