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
   {
      field: "updatedAt",
      header: "Terakhir Diperbarui",
      style: "min-width: 250px",
   },
   { field: "actions", header: "" },
]

const appStore = useAppStore()
function onDetail(row: Model.Question) {
   appStore.showDialog(
      "Detail Pertanyaan",
      h(resolveComponent("DetailQuestion"), {
         data: row,
      })
   )
}

const formLoading = shallowRef(false)
function onOpenForm(row?: Model.Question) {
   appStore.showDialog(
      "Form Pertanyaan",
      h(resolveComponent("FormQuestion"), {
         data: row,
         loading: formLoading,
         onSubmit: async (
            values: InferSchema<typeof $questionSchema, "create">
         ) => {
            const handler = () =>
               row
                  ? $questionApi().update(row.id, values)
                  : $questionApi().create(values)
            formLoading.value = true
            await handler()
               .then((res) => {
                  appStore.notify("Sukses", res.meta.message)
                  appStore.closeDialog()
                  refresh()
               })
               .finally(() => {
                  formLoading.value = false
               })
         },
      }),
      {
         width: "50%",
      }
   )
}

function onDelete(row: Model.Question) {
   appStore.showConfirmDialog(
      "Hapus Pertanyaan",
      async () => {
         const response = await $questionApi().destroy(row.id)
         appStore.notify("Info", response.meta.message)
         appStore.closeDialog()
         refresh()
      }
   )
}
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
               <BaseButton
                  variant="primary"
                  @click="onOpenForm()"
               >
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
                     <BaseTooltip
                        content="Edit"
                        variant="dark"
                     >
                        <BaseButton
                           variant="ghost"
                           size="icon-sm"
                           @click="onOpenForm(row)"
                        >
                           <Icon name="lucide:edit" />
                        </BaseButton>
                     </BaseTooltip>
                     <BaseTooltip
                        content="Hapus"
                        variant="dark"
                     >
                        <BaseButton
                           variant="ghost"
                           size="icon-sm"
                           @click="onDelete(row)"
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
