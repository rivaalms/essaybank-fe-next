<script setup lang="ts" generic="T">
const props = withDefaults(
   defineProps<{
      data: {
         label?: string
         value?: T
         key?: string
         colSpan?: number
         colStart?: number
         [additional: string]: any
      }[]
      listLabel?: string
      listValue?: string
      listKey?: string
      width?:
         | `${number}rem`
         | `${number}em`
         | `${number}pt`
         | `${number}px`
         | `${number}%`
      labelWidth?:
         | `${number}rem`
         | `${number}em`
         | `${number}pt`
         | `${number}px`
         | `${number}%`
         | "auto"
      lines?: "one" | "two"
      columns?: number
   }>(),
   {
      listLabel: "label",
      listValue: "value",
      listKey: "key",
      labelWidth: "10rem",
      lines: "one",
      columns: 1,
   }
)
</script>

<template>
   <div>
      <slot
         name="prepend"
         :data="props.data"
      />
      <div
         v-if="props.lines === 'one'"
         class="grid gap-2"
         :style="{
            gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
         }"
      >
         <template v-for="item in props.data">
            <div class="flex items-center">
               <span
                  class="font-medium text-muted-500"
                  :style="{ width: props.labelWidth }"
               >
                  {{ item[props.listLabel] }}
               </span>
               <span class="flex-1 before:content-[':_']">
                  {{ item[props.listValue] }}
               </span>
            </div>
         </template>
      </div>
      <div
         v-else
         class="grid gap-4"
         :style="{
            gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
         }"
      >
         <template v-for="item in props.data">
            <slot
               :name="`item.${item[props.listKey]}`"
               :item="item"
            >
               <div
                  class="flex flex-col gap-y-1"
                  :style="{
                     gridColumn: `span ${item.colSpan ?? 1} / span ${item.colSpan ?? 1}`,
                     gridColumnStart: item.colStart,
                  }"
               >
                  <div>
                     <slot
                        :name="`label.${item[props.listKey]}`"
                        :item="item"
                     >
                        <span class="text-sm font-medium text-muted-500 tracking-wide">
                           {{ item[props.listLabel] }}
                        </span>
                     </slot>
                  </div>
                  <div class="text-pretty">
                     <slot
                        :name="`value.${item[props.listKey]}`"
                        :item="item"
                     >
                        <span>
                           {{ item[props.listValue] }}
                        </span>
                     </slot>
                  </div>
               </div>
            </slot>
         </template>
      </div>
      <slot
         name="append"
         :data="props.data"
      />
   </div>
</template>
