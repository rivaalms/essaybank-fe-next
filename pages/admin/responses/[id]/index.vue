<script setup lang="ts">
definePageMeta({
   layout: "admin",
})

const appStore = useAppStore()
const route = useRoute()

const { data, status, refresh } = useLazyAsyncData(
   `response-${route.params.id}`,
   () => $responseApi().find(Number(route.params.id)),
   {
      server: false,
      transform: (res) => res.data,
   }
)

const dayjs = useDayjs()
const responseDetails = computed(() => {
   if (!data.value) return []
   return [
      {
         label: "Tanggal Dibuat",
         value: dayjs(data.value.createdAt).format("DD MMMM YYYY"),
      },
      {
         label: "Terakhir Diperbarui",
         value: dayjs(data.value.updatedAt).format("DD MMMM YYYY"),
      },
      { label: "Responden", value: data.value.identifier },
      { label: "Pertanyaan", value: data.value.Question?.questionText },
      { label: "Jawaban", value: data.value.responseText },
   ]
})

const reviewQuery = ref<API.Query.Review>({
   page: 1,
   perPage: 10,
   responseId: Number(route.params.id)
})
const { data: reviews, refresh: refreshReviews } = useLazyAsyncData(
   `response-${route.params.id}-reviews`,
   () => $reviewApi().get(reviewQuery.value),
   {
      server: false,
      transform: (res) => res.data,
      watch: [() => reviewQuery.value.page, () => reviewQuery.value.perPage]
   }
)

const reviewColumns: DataTableColumn[] = [
   { field: "User.name", header: "Pengulas", style: "color:var(--color-muted-700);" },
   { field: "relevanceScore", header: "Skor Relevansi", style: "color:var(--color-muted-700);" },
   { field: "languageScore", header: "Skor Bahasa", style: "color:var(--color-muted-700);" },
   { field: "spellingScore", header: "Skor Ejaan", style: "color:var(--color-muted-700);" },
   { field: "totalScore", header: "Total Skor", style: "font-weight:500;" },
   { field: "updatedAt", header: "Terakhir Diperbarui", style: "color:var(--color-muted-700);" },
   { field: "actions", header: "" },
]

const formLoading = shallowRef(false)
function onOpenReviewForm(row?: Model.Review) {
   appStore.showDialog(
      "Form Ulasan",
      h(resolveComponent("FormReview"), {
         data: row,
         reviewerId: useAuthStore().user?.id ?? 0,
         responseId: Number(route.params.id),
         loading: formLoading,
         onSubmit: async (values: InferSchema<typeof $reviewSchema, "create">) => {
            const handler = () =>
               row
                  ? $reviewApi().update(row.id, values)
                  : $reviewApi().create(values)
            formLoading.value = true
            await handler()
               .then((res) => {
                  appStore.notify("Sukses", res.meta.message)
                  appStore.closeDialog()
                  refreshReviews()
               })
               .finally(() => {
                  formLoading.value = false
               })
         }
      }),
      {
         width: "800px"
      }
   )
}
</script>

<template>
   <div class="flex flex-col gap-4">
      <BaseCard class="p-5 rounded-2xl! border-0 shadow-xl">
         <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
               <BaseHeading
                  as="h1"
                  tracking="wide"
                  weight="semibold"
                  lead="loose"
                  size="2xl"
               >
                  Detail Respons
               </BaseHeading>
            </div>
            <AppDescriptionList :data="responseDetails" />
         </div>
      </BaseCard>
      <BaseCard class="p-5 rounded-2xl! border-0 shadow-xl">
         <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
               <BaseHeading
                  as="h2"
                  tracking="wide"
                  weight="medium"
                  lead="loose"
                  size="xl"
               >
                  Ulasan
               </BaseHeading>
               <BaseButton
                  variant="primary"
                  @click="onOpenReviewForm()"
               >
                  <Icon
                     name="lucide:plus"
                     class="-ms-1 h-4 w-4"
                  />
                  <span class="font-medium">Ulasan Baru</span>
               </BaseButton>
            </div>
            <AppDataTable
               :rows="reviews?.data ?? []"
               :columns="reviewColumns"
               :total="reviews?.total ?? 0"
               v-model:page="(reviewQuery.page as number)"
               v-model:per-page="(reviewQuery.perPage as number)"
            >
               <template #row.updatedAt="{ row }">
                  {{ dayjs(row.updatedAt).format("DD MMM YYYY HH:mm") }}
               </template>
            </AppDataTable>
         </div>
      </BaseCard>
   </div>
</template>
