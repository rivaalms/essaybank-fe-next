declare namespace API {
   namespace Query {
      type Paginable = Partial<{
         page: number | string
         perPage: number | string
      }>
      type Searchable = Partial<{
         search: string
      }>

      type Question = Paginable & Searchable
      type Response = Paginable
      type Review = Paginable & {
         responseId?: number
      }
   }
}