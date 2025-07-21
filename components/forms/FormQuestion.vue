<script setup lang="ts">
const props = withDefaults(
   defineProps<{
      data?: Model.Question
      loading?: Ref<boolean>
   }>(),
   {
      loading: () => shallowRef(false),
   }
)

const emit = defineEmits<{
   (e: "submit", values: InferSchema<typeof $questionSchema, "create">): void
}>()

const {
   form,
   error,
   loading: formLoading,
   submit,
} = useForm(
   {
      questionText: undefined,
      referenceAnswer: undefined,
   },
   $questionSchema().create
)

whenever(
   () => props.data,
   (value) => {
      form.value.questionText = value.questionText
      form.value.referenceAnswer = value.referenceAnswer
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
         console.log("🚀 ~ FormQuestion.vue:37 ~ onSubmit ~ err:", err)
      }
   )
}
</script>

<template>
   <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-2 gap-4"
   >
      <BaseField
         id="questionText"
         label="Pertanyaan"
         :error="error.questionText"
         v-slot="{ inputAttrs, inputRef }"
      >
         <BaseTextarea
            v-model="form.questionText"
            :ref="inputRef"
            v-bind="inputAttrs"
            resize
            rows="5"
            :aria-invalid="!!error.questionText"
            :disabled="loading"
         />
      </BaseField>
      <BaseField
         id="referenceAnswer"
         label="Jawaban Referensi"
         :error="error.referenceAnswer"
         v-slot="{ inputAttrs, inputRef }"
      >
         <BaseTextarea
            v-model="form.referenceAnswer"
            :ref="inputRef"
            v-bind="inputAttrs"
            resize
            rows="5"
            :aria-invalid="!!error.referenceAnswer"
            :disabled="loading"
         />
      </BaseField>
      <div class="col-span-full flex items-center justify-end">
         <BaseButton
            variant="primary"
            type="submit"
            :loading="loading"
         >
            <Icon name="lucide:check" />
            Simpan
         </BaseButton>
      </div>
   </form>
</template>
