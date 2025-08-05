<script setup lang="ts">
definePageMeta({
   layout: "admin",
})

const dayjs = useDayjs()

const query = ref<API.Query.Response>({
   page: 1,
   perPage: 10,
})

const { data, status, refresh } = useLazyAsyncData(
   "responses",
   () => $responseApi().get(query.value),
   {
      server: false,
      transform: (res) => res.data,
      watch: [() => query.value.page, () => query.value.perPage],
   }
)

const columns: DataTableColumn[] = [
   { field: "identifier", header: "Responden" },
   { field: "question.questionText", header: "Pertanyaan" },
   { field: "responseText", header: "Jawaban" },
   { field: "updatedAt", header: "Terakhir Diubah" },
   { field: "actions", header: "" }
]

const appStore = useAppStore()
function onDetail(row: Model.Response) {
   navigateTo(`/admin/responses/${row.id}`)
}
</script>

<template>
   <div>
      <BaseCard class="p-5 rouned-2xl! border-0 shadow-xl">
         <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
               <BaseHeading
                  as="h1"
                  tracking="wide"
                  weight="semibold"
                  lead="loose"
                  size="2xl"
               >
                  Daftar Respons
               </BaseHeading>
            </div>
            <AppDataTable
               :rows="data?.data ?? []"
               :columns="columns"
               :total="data?.total ?? 0"
               :loading="status === 'pending'"
               v-model:page="(query.page as number)"
               v-model:per-page="(query.perPage as number)"
            >
               <template #row.question.questionText="{ row }">
                  <div class="truncate max-w-80">
                     {{ row.Question?.questionText }}
                  </div>
               </template>
               <template #row.responseText="{ row }">
                  <div class="truncate max-w-80">
                     {{ row.responseText }}
                  </div>
               </template>
               <template #row.updatedAt="{ row }">
                  <div class="min-w-36">
                     {{ dayjs(row.updatedAt).format("DD MMM YYYY HH:mm") }}
                  </div>
               </template>
               <template #row.actions="{ row }">
                  <div class="flex items-center">
                     <BaseTooltip
                        content="Detail"
                        variant="dark"
                     >
                        <BaseButton
                           variant="ghost"
                           size="icon-sm"
                           @click="onDetail(row)"
                        >
                           <Icon name="lucide:eye" />
                        </BaseButton>
                     </BaseTooltip>
                  </div>
               </template>
            </AppDataTable>
         </div>
      </BaseCard>
   </div>
</template>
