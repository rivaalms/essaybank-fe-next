export const useEssayStore = defineStore("essay", () => {
   const questions = ref<Model.Question[]>()
   const totalQuestions = ref<number>()

   async function fetchQuestions() {
      const response = await $questionApi().get({ perPage: -1 })
      questions.value = response.data.data
      totalQuestions.value = response.data.total
   }

   const responses = ref<Pick<Model.Response, "questionId" | "responseText" | "id">[]>([])


   async function createResponse(questionId: number, responseText: string, identifier?: string) {
      const existingResponse = responses.value.find((res) => res.questionId === questionId)

      if (existingResponse) {
         const values = await $responseSchema().update.validate({ questionId, responseText })
         await $responseApi().update(existingResponse.id, values)
         existingResponse.responseText = values.responseText
      } else {
         const values = await $responseSchema().create.validate({ questionId, responseText, identifier })
         const res = await $responseApi().create(values)
         responses.value.push({
            id: res.data.id,
            questionId: res.data.questionId,
            responseText: res.data.responseText
         })
      }
   }

   return {
      questions,
      totalQuestions,
      responses,
      fetchQuestions,
      createResponse
   }
})