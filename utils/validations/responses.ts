const yup = useYup()

export function $responseSchema() {
   const create = yup.object({
      questionId: yup.number().required(),
      responseText: yup.string().required(),
      ip: yup.string().notRequired(),
   })

   const update = create.omit(["ip"])

   return {
      create,
      update
   }
}