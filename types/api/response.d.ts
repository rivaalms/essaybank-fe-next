declare namespace API {
   type Response<T> = {
      meta: {
         success: boolean
         error: string
         message: string
      }
      data: T
   }

   type Paginate<T> = {
      page: number
      perPage: number
      total: number
      data: T[]
   }
}