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

const reviewQuery = ref<API.Query.Review>({
   page: 1,
   perPage: 10,
   responseId: Number(route.params.id),
})
const {
   data: reviews,
   pending: reviewsPending,
   refresh: refreshReviews,
} = useLazyAsyncData(
   `response-${route.params.id}-reviews`,
   () => $reviewApi().get(reviewQuery.value),
   {
      server: false,
      transform: (res) => res.data,
      watch: [() => reviewQuery.value.page, () => reviewQuery.value.perPage],
   }
)

const reviewColumns: DataTableColumn[] = [
   {
      field: "User.name",
      header: "Pengulas",
      style: "color:var(--color-muted-700);",
   },
   {
      field: "relevanceScore",
      header: "Skor Relevansi",
      style: "color:var(--color-muted-700);",
   },
   {
      field: "languageScore",
      header: "Skor Bahasa",
      style: "color:var(--color-muted-700);",
   },
   {
      field: "spellingScore",
      header: "Skor Ejaan",
      style: "color:var(--color-muted-700);",
   },
   { field: "totalScore", header: "Total Skor", style: "font-weight:500;" },
   {
      field: "updatedAt",
      header: "Terakhir Diperbarui",
      style: "color:var(--color-muted-700);",
   },
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
         onSubmit: async (
            values: InferSchema<typeof $reviewSchema, "create">
         ) => {
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
         },
      }),
      {
         width: "800px",
      }
   )
}

async function onFlag() {
   if (!data.value) return
   try {
      const response = await $responseApi().flag(
         data.value.id,
         !data.value.flagged
      )
      appStore.notify("Success", response.meta.message)
      await refresh()
   } catch (e) {
      appStore.notify("Error", "Gagal menandai respons")
      console.error(e)
   }
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
               <BaseButton
                  v-if="data"
                  class="gap-1"
                  @click="onFlag"
               >
                  <Icon
                     :name="
                        data.flagged
                           ? 'grommet-icons:flag-fill'
                           : 'grommet-icons:flag'
                     "
                     class="-ms-1 h-4 w-4"
                     :class="{ 'text-amber-500': data.flagged }"
                  />
                  <span class="font-medium">
                     {{ data.flagged ? "Hapus Tanda" : "Tandai Tidak Valid" }}
                  </span>
               </BaseButton>
            </div>
            <div class="grid grid-cols-4 gap-4">
               <div class="col-span-3 flex flex-col gap-8">
                  <div class="flex flex-col gap-2">
                     <span
                        class="font-semibold text-sm tracking-wide uppercase text-muted-500"
                        >Pertanyaan</span
                     >
                     <p class="text-pretty">
                        {{ data?.Question?.questionText }}
                     </p>
                  </div>
                  <div class="flex flex-col gap-2">
                     <span
                        class="font-semibold text-sm tracking-wide uppercase text-muted-500"
                     >
                        Referensi Jawaban
                     </span>
                     <p class="text-pretty">
                        {{ data?.Question?.referenceAnswer }}
                     </p>
                  </div>
                  <div class="flex flex-col gap-2">
                     <span
                        class="font-semibold text-sm tracking-wide uppercase text-muted-500"
                        >Respons</span
                     >
                     <p class="text-pretty">{{ data?.responseText }}</p>
                  </div>
               </div>
               <div class="border-s border-muted-300 border-dashed ps-4">
                  <div class="flex flex-col gap-4 text-sm text-muted-500">
                     <div class="flex items-center gap-4">
                        <Icon
                           name="lucide:user"
                           class=""
                        />
                        <span>{{ data?.identifier }}</span>
                     </div>
                     <div class="flex items-center gap-4">
                        <Icon
                           name="lucide:calendar"
                           class=""
                        />
                        <span>
                           {{ dayjs(data?.createdAt).format("DD MMMM YYYY") }}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
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
               :loading="reviewsPending"
               v-model:page="reviewQuery.page as number"
               v-model:per-page="reviewQuery.perPage as number"
            >
               <template #row.updatedAt="{ row }">
                  {{ dayjs(row.updatedAt).format("DD MMM YYYY HH:mm") }}
               </template>
            </AppDataTable>
         </div>
      </BaseCard>
   </div>
</template>
