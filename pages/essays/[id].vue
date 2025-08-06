<script setup lang="ts">
const route = useRoute()
const essayStore = useEssayStore()

const currentQuestionId = computed(() => {
   return Number(route.params.id as string)
})

const currentQuestion = computed(() => {
   return essayStore.questions?.find(
      (question) => question.id == currentQuestionId.value
   )
})

const answer = shallowRef<string>()

async function onPrev() {
   await generateResponse().then(() => {
      navigateTo(`/essays/${currentQuestionId.value - 1}`)
   })
}
async function onSubmit(currentQuestionId?: number) {
   await generateResponse().then(() => {
      if (!currentQuestionId) {
         console.log("masuk if")
         navigateTo("/essays/finish")
      } else {
         console.log("masuk else")
         const currentQuestionIndex = essayStore.questions?.findIndex(
            (q) => q.id == currentQuestionId
         )
         if (
            currentQuestionIndex === null ||
            currentQuestionIndex === undefined
         )
            return
         const nextQuestion = essayStore.questions?.[currentQuestionIndex + 1]
         if (!nextQuestion) return
         navigateTo(`/essays/${nextQuestion.id}`)
      }
   })
}

async function onNavigate(question: number) {
   if (question == currentQuestionId.value) return
   await generateResponse().then(() => {
      navigateTo(`/essays/${question}`)
   })
}

async function generateResponse() {
   try {
      if (!answer.value || !essayStore.ip) return
      if (
         questionHasAnswer(currentQuestionId.value) &&
         getQuestionAnswer(currentQuestionId.value)?.responseText.trim() ==
            answer.value.trim()
      )
         return

      await essayStore.createResponse(
         currentQuestionId.value,
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

function getQuestionAnswer(questionId: number) {
   return essayStore.responses.find((item) => item.questionId == questionId)
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
            value.find((item) => item.questionId === currentQuestionId.value)
               ?.responseText ?? ""
      }
   },
   { immediate: true, deep: true }
)
</script>

<template>
   <div class="container mx-auto px-4 py-12">
      <div
         class="grid grid-cols-1 lg:grid-cols-3 gap-12 gap-x-0 lg:gap-x-12 place-items-start"
      >
         <!-- SECTION: Nav -->
         <BaseCard class="w-full p-5 flex flex-col gap-4 border-0 shadow-md">
            <span class="font-medium tracking-wide"> Navigasi Kuis </span>
            <div
               class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 max-h-[20vh] lg:max-h-[50vh] overflow-y-auto"
            >
               <template v-for="(question, index) in essayStore.questions">
                  <BaseCard
                     class="group border-dashed p-4 hover:border-primary-500 hover:text-primary-500 cursor-pointer"
                     :class="[
                        {
                           'border-primary-500 text-primary-500 bg-primary-50':
                              currentQuestionId == question.id,
                           'border-success-500 text-success-500 bg-success-50':
                              questionHasAnswer(question.id) &&
                              currentQuestionId != question.id,
                        },
                     ]"
                     @click="onNavigate(question.id)"
                  >
                     <div class="flex items-center justify-between">
                        <span
                           class="text-sm font-medium text-muted-600"
                           :class="{
                              'text-primary-500':
                                 currentQuestionId == question.id,
                           }"
                        >
                           Pertanyaan #{{ index + 1 }}
                        </span>
                        <Icon
                           v-if="questionHasAnswer(question.id)"
                           name="lucide:check-circle"
                           class="group-hover:text-primary-500"
                           :class="[
                              currentQuestionId == question.id
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
         <div class="col-span-2 w-full overflow-y-auto px-2">
            <div class="flex flex-col gap-8 pt-5">
               <span class="font-medium text-lg tracking-wide">
                  Pertanyaan {{ currentQuestionId }}
               </span>
               <div class="flex flex-col gap-8">
                  <p>
                     {{ currentQuestion?.questionText }}
                  </p>
                  <BaseTextarea
                     v-model="answer"
                     :rows="5"
                     resize
                     placeholder="Tulis jawabanmu disini..."
                  />
                  <div class="flex justify-between">
                     <BaseButton
                        v-if="currentQuestionId > 1"
                        class="gap-2"
                        @click="onPrev"
                     >
                        <Icon name="lucide:arrow-left" />
                        <span class="font-medium"> Sebelumnya </span>
                     </BaseButton>
                     <span v-else />
                     <BaseButton
                        v-if="
                           essayStore.totalQuestions &&
                           currentQuestionId < essayStore.totalQuestions
                        "
                        variant="primary"
                        class="gap-2"
                        @click="onSubmit(currentQuestionId)"
                     >
                        <span class="font-medium"> Selanjutnya </span>
                        <Icon name="lucide:arrow-right" />
                     </BaseButton>
                     <BaseButton
                        v-else
                        variant="primary"
                        class="gap-2"
                        @click="onSubmit()"
                     >
                        <Icon name="lucide:check" />
                        <span class="font-medium"> Selesai </span>
                     </BaseButton>
                  </div>
               </div>
            </div>
         </div>
         <!-- !SECTION -->
      </div>
   </div>
</template>
