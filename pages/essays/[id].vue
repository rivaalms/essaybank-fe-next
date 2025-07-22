<script setup lang="ts">
const route = useRoute()
const essayStore = useEssayStore()

const currentQuestionPage = computed(() => {
   return Number(route.params.id as string)
})

const currentQuestion = computed(() => {
   return essayStore.questions?.find(
      (question) => question.id == currentQuestionPage.value
   )
})

const answer = shallowRef()

async function onPrev() {
   if (currentQuestionPage.value == 1) return
   await generateResponse().then(() => {
      navigateTo(`/essays/${currentQuestionPage.value - 1}`)
   })
}
async function onSubmit(finish?: boolean) {
   await generateResponse().then(() => {
      if (finish) {
         navigateTo("/essays/finish")
      } else {
         navigateTo(`/essays/${currentQuestionPage.value + 1}`)
      }
   })
}

async function onNavigate(question: number) {
   if (question == currentQuestionPage.value) return
   await generateResponse().then(() => {
      navigateTo(`/essays/${question}`)
   })
}

async function generateResponse() {
   try {
      if (!answer.value || !essayStore.ip) return
      await essayStore.createResponse(
         currentQuestionPage.value,
         answer.value,
         essayStore.ip
      )
   } catch (error) {
      console.log("🚀 ~ generateResponse ~ error:", error)
   }
}

function questionHasAnswer(questionId: number) {
   return essayStore.responses.some((item) => item.questionId == questionId)
}

onMounted(async () => {
   if (essayStore.totalQuestions === undefined) {
      await essayStore.fetchQuestions()
   }

   if (!essayStore.ip) await essayStore.fetchIp()
})

const unwatchIp = watch(
   () => essayStore.ip,
   async (value) => {
      if (value) {
         await $responseApi()
            .get()
            .then((res) => {
               essayStore.responses = res.data.data.map((item) => ({
                  id: item.id,
                  questionId: item.questionId,
                  responseText: item.responseText,
               }))
               unwatchIp()
            })
      }
   }
)

watch(
   () => essayStore.responses,
   (value) => {
      if (value) {
         answer.value =
            value.find((item) => item.questionId === currentQuestionPage.value)
               ?.responseText ?? ""
      }
   },
   { immediate: true, deep: true }
)
</script>

<template>
   <div class="container mx-auto py-12">
      <div class="grid grid-cols-3 gap-12">
         <!-- SECTION: Nav -->
         <BaseCard class="p-5 flex flex-col gap-4 border-0 shadow-md">
            <span class="font-medium"> Navigasi Kuis </span>
            <div class="grid grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto">
               <template v-for="question in essayStore.totalQuestions">
                  <BaseCard
                     class="group border-dashed p-4 hover:border-primary-500 hover:text-primary-500 cursor-pointer"
                     :class="[
                        {
                           'border-primary-500 text-primary-500 bg-primary-50':
                              currentQuestionPage == question,
                           'border-success-500 text-success-500 bg-success-50':
                              questionHasAnswer(question) &&
                              currentQuestionPage != question,
                        },
                     ]"
                     @click="onNavigate(question)"
                  >
                     <div class="flex items-center justify-between">
                        <span> Pertanyaan {{ question }} </span>
                        <Icon
                           v-if="questionHasAnswer(question)"
                           name="lucide:check-circle"
                           class="group-hover:text-primary-500"
                           :class="[
                              currentQuestionPage == question
                                 ? 'text-primary-500'
                                 : 'text-success-500',
                           ]"
                        />
                     </div>
                  </BaseCard>
               </template>
            </div>
         </BaseCard>
         <!-- !SECTION -->
         <!-- SECTION: Essay -->
         <div class="col-span-2 max-h-[50vh] overflow-y-auto px-2">
            <div class="flex flex-col gap-8 pt-5">
               <span class="font-medium text-lg"
                  >Pertanyaan {{ currentQuestionPage }}</span
               >
               <div class="flex flex-col gap-4">
                  <p>
                     {{ currentQuestion?.questionText }}
                  </p>
                  <BaseTextarea
                     v-model="answer"
                     :rows="5"
                     placeholder="Tulis jawabanmu disini..."
                  />
                  <div class="flex justify-between">
                     <BaseButton
                        v-if="currentQuestionPage > 1"
                        class="gap-2"
                        @click="onPrev"
                     >
                        <Icon name="lucide:arrow-left" />
                        Sebelumnya
                     </BaseButton>
                     <span v-else />
                     <BaseButton
                        v-if="essayStore.totalQuestions && currentQuestionPage < essayStore.totalQuestions"
                        variant="primary"
                        class="gap-2"
                        @click="onSubmit()"
                     >
                        Selanjutnya
                        <Icon name="lucide:arrow-right" />
                     </BaseButton>
                     <BaseButton
                        v-else
                        variant="primary"
                        class="gap-2"
                        @click="onSubmit(true)"
                     >
                        <Icon name="lucide:check" />
                        Selesai
                     </BaseButton>
                  </div>
               </div>
            </div>
         </div>
         <!-- !SECTION -->
      </div>
   </div>
</template>
