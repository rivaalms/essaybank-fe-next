import type {
   NitroFetchRequest,
   NitroFetchOptions,
   TypedInternalResponse,
} from "nitropack"
import type { FetchOptions, FetchResponse } from "ofetch"

export type FetchHooksConfig = {
   onResponseError?: {
      notifyHandler?: (response: FetchResponse<API.Response<null>>) => any
   }
}

export default async function <
   T = unknown,
   R extends NitroFetchRequest = NitroFetchRequest,
>(
   endpoint: R,
   opts?: FetchOptions,
   fetchHooksConfig?: FetchHooksConfig
): Promise<TypedInternalResponse<R, T>> {
   const config = useRuntimeConfig().public
   const token = useAuthStore().getToken
   const isTokenExpired = useAuthStore().isTokenExpired()

   const handler = $fetch.create({
      baseURL: config.apiUrl,

      async onRequest({ request, options }) {
         options.headers.set("Accept", "application/json")
         if (token && !isTokenExpired) {
            options.headers.set("Authorization", `Bearer ${token}`)
         }
      },

      async onRequestError({ error }) {
         useAppStore().notify("Error", error.message ?? "Terjadi kesalahan")
         throw error
      },

      async onResponse({ response }) {
         return response._data
      },

      async onResponseError({ response, error }) {
         const res = response as FetchResponse<API.Response<null>>
         if (fetchHooksConfig?.onResponseError?.notifyHandler) {
            fetchHooksConfig.onResponseError.notifyHandler(res)
         } else {
            // useAppStore().notify(
            //    "error",
            //    "Error",
            //    res._data?.meta?.error ||
            //       res._data?.meta.message ||
            //       "Something went wrong"
            // )
         }

         const status = res.status
         if (status == 401) {
            useAuthStore().$reset()
            navigateTo("/admin/login")
         } else {
            throw error ?? res._data
         }
      },
   })

   return handler<T, R>(endpoint, opts as NitroFetchOptions<R>)
}
