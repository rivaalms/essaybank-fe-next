<script setup lang="ts" generic="T">
const props = withDefaults(
   defineProps<{
      rows: T[]
      columns: DataTableColumn[]
      total: number
      perPageOptions?: number[]
      loading?: boolean
   }>(),
   {
      total: 0,
      perPageOptions: () => [5, 10, 25, 50, 100]
   }
)

const page = defineModel<number>("page", { required: false, default: 1 })
const perPage = defineModel<number>("perPage", { required: false, default: 10 })

function showData(item: NonNullable<T>, column: DataTableColumn) {
   if (column.field.includes(".")) {
      const keys = column.field.split(".")
      return keys.reduce(
         (acc, key) => (acc as Record<PropertyKey, unknown>)[key] as never,
         item
      )
   }
   return (item as Record<PropertyKey, unknown>)[column.field]
}
</script>

<template>
   <div class="flex flex-col gap-4 relative">
      <div v-if="props.loading" class="absolute -inset-2 bg-black/50 z-20 rounded-xl flex items-center justify-center">
         <BaseProgressCircle variant="primary" />
      </div>
      <div>
         <slot name="header" />
      </div>
      <table>
         <thead class="">
            <tr class="border-b border-muted-200">
               <th
                  v-for="(column, key) in columns"
                  :key="`header-item-${key}`"
                  class="py-3 px-6 text-sm font-semibold text-muted-500 uppercase text-start tracking-wide leading-relaxed select-none"
               >
                  {{ column.header }}
               </th>
            </tr>
         </thead>
         <tbody>
            <tr
               v-for="(row, rowIndex) in rows"
               :key="`body-row-${rowIndex}`"
               class="border-b border-muted-200 hover:bg-muted-50"
            >
               <td
                  v-for="(column, key) in columns"
                  :key="`body-item-${key}`"
                  class="py-4 px-6"
                  :style="column.style"
               >
                  <slot
                     :name="`row.${column.field}`"
                     :row="row"
                  >
                     <span>
                        {{ showData(row as NonNullable<T>, column) }}
                     </span>
                  </slot>
               </td>
            </tr>
         </tbody>
      </table>
      <div class="flex items-center justify-between">
         <div class="flex items-center-safe gap-2">
            <BaseSelect
               v-model="perPage"
            >
               <BaseSelectItem
                  v-for="option in props.perPageOptions"
                  :value="option"
               >
                  {{ option }} baris
               </BaseSelectItem>
            </BaseSelect>
         </div>
         <BasePagination
            v-model:page="page"
            :items-per-page="perPage"
            :total="props.total"
            class="flex-1 w-full"
            v-slot="{ items }"
         >
            <div class="flex gap-2 items-center">
               <BasePaginationButtonFirst />
               <BasePaginationButtonPrev />
            </div>
            <BasePaginationItems :items="items" />
            <div class="flex gap-2 items-center">
               <BasePaginationButtonNext />
               <BasePaginationButtonLast />
            </div>
         </BasePagination>
      </div>
   </div>
</template>
