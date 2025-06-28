export const useEssayStore = defineStore("essay", () => {
   const questions = ref<Model.Question[]>()
   const totalQuestions = ref<number>()

   async function fetchQuestions() {
      const response = await $questionApi().get({ perPage: -1 })
      questions.value = response.data.data
      totalQuestions.value = response.data.total
   }

   const responses = ref<Pick<Model.Response, "questionId" | "responseText">[]>([])

   const ip = shallowRef<string>()
   async function fetchIp() {
      const response = await $fetch<{ ip: string }>(`https://api.ipify.org?format=json`, {
         method: "get"
      })
      ip.value = response.ip
   }

   return {
      questions,
      totalQuestions,
      responses,
      fetchQuestions,
      ip,
      fetchIp
   }
})