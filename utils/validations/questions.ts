const yup = useYup()

export function $questionSchema() {
   const create = yup.object({
      questionText: yup.string().required().label("Pertanyaan"),
      referenceAnswer: yup.string().required().label("Jawaban Referensi"),
   })

   const update = create

   return {
      create,
      update
   }
}
