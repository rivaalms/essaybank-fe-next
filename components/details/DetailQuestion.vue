<script setup lang="ts">
const props = defineProps<{
   data: Model.Question
}>()

const dayjs = useDayjs()
const details = computed(() => {
   return [
      {
         label: "Terakhir Diperbarui",
         value: dayjs(props.data.updatedAt).format("DD MMM YYYY HH:mm"),
         colSpan: 2,
      },
      { label: "Pertanyaan", value: props.data.questionText },
      { label: "Jawaban Referensi", value: props.data.referenceAnswer },
   ]
})
</script>

<template>
   <div>
      <AppDescriptionList
         :data="details"
         lines="two"
         :columns="2"
      />
   </div>
</template>
