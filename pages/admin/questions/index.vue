<script setup lang="ts">
definePageMeta({
   layout: "admin",
})

const dayjs = useDayjs()

const query = ref<API.Query.Question>({
   page: 1,
   perPage: 10,
   search: undefined,
})

const { data, status, refresh } = useLazyAsyncData(
   "questions",
   () => $questionApi().get(query.value),
   {
      server: false,
      transform: (res) => res.data,
      watch: [() => query.value.page, () => query.value.perPage],
   }
)

watchDebounced(
   () => query.value.search,
   (value) => {
      query.value.page = 1
      refresh()
   },
   { debounce: 800, maxWait: 2000 }
)

const columns: DataTableColumn[] = [
   { field: "questionText", header: "Pertanyaan" },
   { field: "updatedAt", header: "Terakhir Diperbarui", style: "min-width: 250px" },
   { field: "actions", header: "" },
]
</script>

<template>
   <div>
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
                  Daftar Pertanyaan
               </BaseHeading>
               <BaseButton variant="primary">
                  <Icon
                     name="lucide:plus"
                     class="-ms-1 h-4 w-4"
                  />
                  <span class="font-medium">Tambah</span>
               </BaseButton>
            </div>
            <AppDataTable
               :rows="data?.data ?? []"
               :columns="columns"
               :total="data?.total ?? 0"
               :loading="status === 'pending'"
               v-model:page="(query.page as number)"
               v-model:per-page="(query.perPage as number)"
            >
               <template #header>
                  <div class="flex items-center">
                     <div class="w-1/3">
                        <BaseInput
                           v-model="query.search"
                           placeholder="Cari..."
                        />
                     </div>
                  </div>
               </template>
               <template #row.updatedAt="{ row }">
                  {{ dayjs(row.updatedAt).format("DD MMM YYYY \| HH:mm") }}
               </template>
               <template #row.actions="{ row }">
                  <div class="flex items-center">
                     <BaseTooltip content="Detail" variant="dark">
                        <BaseButton
                           variant="ghost"
                           size="icon-sm"
                        >
                           <Icon name="lucide:eye" />
                        </BaseButton>
                     </BaseTooltip>
                     <BaseTooltip content="Edit" variant="dark">
                        <BaseButton
                           variant="ghost"
                           size="icon-sm"
                        >
                           <Icon name="lucide:edit" />
                        </BaseButton>
                     </BaseTooltip>
                     <BaseTooltip content="Hapus" variant="dark">
                        <BaseButton
                           variant="ghost"
                           size="icon-sm"
                        >
                           <Icon name="lucide:trash" />
                        </BaseButton>
                     </BaseTooltip>
                  </div>
               </template>
            </AppDataTable>
         </div>
      </BaseCard>
   </div>
</template>
