<script setup lang="ts">
const props = withDefaults(
   defineProps<{
      data?: Model.Review
      loading?: Ref<boolean>
      responseId: number
      reviewerId: number
   }>(),
   {
      loading: () => shallowRef(false),
   }
)

const emit = defineEmits<{
   (e: "submit", values: InferSchema<typeof $reviewSchema, "create">): void
}>()

const {
   form,
   error,
   loading: formLoading,
   submit,
} = useForm(
   {
      reviewerId: props.reviewerId,
      responseId: props.responseId,
      relevanceScore: 0,
      languageScore: 0,
      spellingScore: 0,
   },
   $reviewSchema().create
)

whenever(
   () => props.data,
   (value) => {
      form.value.relevanceScore = Number(value.relevanceScore)
      form.value.languageScore = Number(value.languageScore)
      form.value.spellingScore = Number(value.spellingScore)
   },
   { immediate: true }
)

const loading = computed(() => props.loading.value || formLoading.value)

async function onSubmit() {
   await submit(
      (values) => {
         emit("submit", values)
      },
      (err) => {
         console.log("🚀 ~ FormReview.vue:42 ~ onSubmit ~ err:", err)
      }
   )
}

const totalScore = computed(() => {
   return Number(
      (Number(form.value.relevanceScore ?? 0) +
         Number(form.value.languageScore ?? 0) +
         Number(form.value.spellingScore ?? 0)) /
         3
   ).toFixed(2)
})
</script>

<template>
   <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-3 gap-4"
   >
      <BaseField
         id="relevanceScore"
         label="Skor Relevansi"
         :error="error.relevanceScore"
         v-slot="{ inputAttrs, inputRef }"
      >
         <BaseInputNumber
            v-model="form.relevanceScore"
            :ref="inputRef"
            v-bind="inputAttrs"
            :aria-invalid="!!error.relevanceScore"
            :min="0"
            :max="10"
            :step="0.05"
            :step-snapping="false"
            :disabled="loading"
         />
      </BaseField>
      <BaseField
         id="languageScore"
         label="Skor Bahasa"
         :error="error.languageScore"
         v-slot="{ inputAttrs, inputRef }"
      >
         <BaseInputNumber
            v-model="form.languageScore"
            :ref="inputRef"
            v-bind="inputAttrs"
            :aria-invalid="!!error.languageScore"
            :min="0"
            :max="10"
            :step="0.05"
            :step-snapping="false"
            :disabled="loading"
         />
      </BaseField>
      <BaseField
         id="spellingScore"
         label="Skor Ejaan"
         :error="error.spellingScore"
         v-slot="{ inputAttrs, inputRef }"
      >
         <BaseInputNumber
            v-model="form.spellingScore"
            :ref="inputRef"
            v-bind="inputAttrs"
            :aria-invalid="!!error.spellingScore"
            :min="0"
            :max="10"
            :step="0.05"
            :step-snapping="false"
            :disabled="loading"
         />
      </BaseField>
      <div class="col-span-full">
         <BaseCard class="p-4 border-dashed">
            <div class="flex items-center justify-between gap-4">
               <span class="text-muted-600 text-sm font-medium">
                  Total Skor
               </span>
               <span class="text-xl font-medium">
                  {{ totalScore }}
               </span>
            </div>
         </BaseCard>
      </div>
      <div class="col-span-full flex items-center justify-end">
         <BaseButton
            variant="primary"
            type="submit"
            :loading="loading"
         >
            <Icon
               name="lucide:check"
               class="-ms-1 h-4 w-4"
            />
            <span class="font-medium">Simpan</span>
         </BaseButton>
      </div>
   </form>
</template>
