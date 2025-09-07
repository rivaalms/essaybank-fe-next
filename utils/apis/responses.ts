export function $responseApi() {
   async function get(query?: API.Query.Response) {
      const token = useAuthStore().getToken
      const identifier = useEssayStore().identifier
      const headers: Record<string, string> = {}
      if (!token && identifier) {
         headers.identifier = identifier
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

   async function find(id: number) {
      return await $api<API.Response<Model.Response>>(`/responses/${id}`, {
         method: "get",
      })
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

   async function flag(id: number, value: boolean) {
      return await $api<API.Response<Model.Response>>(`/responses/${id}/flag`, {
         method: "patch",
         body: {
            flagged: value
         }
      })
   }

   return {
      get,
      find,
      create,
      update,
      flag
   }
}
