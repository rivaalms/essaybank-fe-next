const yup = useYup()

export function $reviewSchema() {
   const create = yup.object({
      reviewerId: yup.number().required(),
      responseId: yup.number().required(),
      relevanceScore: yup.number().min(0).max(10).required(),
      languageScore: yup.number().min(0).max(10).required(),
      spellingScore: yup.number().min(0).max(10).required(),
   })

   const update = create

   return {
      create,
      update
   }
}