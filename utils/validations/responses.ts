const yup = useYup()

export function $responseSchema() {
   const create = yup.object({
      questionId: yup.number().required(),
      responseText: yup.string().required(),
      identifier: yup.string().uuid().notRequired(),
   })

   const update = create.omit(["identifier"])

   return {
      create,
      update
   }
}