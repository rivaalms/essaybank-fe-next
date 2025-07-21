<script setup lang="ts">
import type { BaseButtonProps } from "@shuriken-ui/nuxt"

const props = withDefaults(
   defineProps<{
      prompt?: string
      icon?: string
      confirmButtonProps?: Pick<
         BaseButtonProps,
         "variant" | "loading" | "size" | "rounded"
      > & { label?: string; icon?: string }
      cancelButtonProps?: Pick<
         BaseButtonProps,
         "variant" | "loading" | "size" | "rounded"
      > & { label?: string; icon?: string }
   }>(),
   {
      prompt: "Apakah kamu yakin?",
      icon: "lucide:alert-circle",
      confirmButtonProps: () => ({
         variant: "primary",
         label: "Konfirmasi",
         icon: "lucide:check",
      }),
      cancelButtonProps: () => ({
         label: "Batal",
         icon: "lucide:x",
      }),
   }
)

const emit = defineEmits<{
   (e: "confirm"): void
   (e: "cancel"): void
}>()

const appStore = useAppStore()
function onCancel() {
   emit("cancel")
   appStore.closeDialog()
}
function onConfirm() {
   emit("confirm")
}
</script>

<template>
   <div class="flex flex-col gap-12">
      <div class="flex flex-col items-center justify-center gap-4 mt-12">
         <Icon
            :name="props.icon"
            class="size-12! text-muted-700"
         />
         <span class="text-muted-700 tracking-wide">
            {{ props.prompt }}
         </span>
      </div>
      <div class="flex items-center gap-2">
         <BaseButton
            class="flex-1"
            v-bind="props.cancelButtonProps"
            @click="onCancel"
         >
            <Icon :name="props.cancelButtonProps.icon || 'lucide:x'" />
            {{ props.cancelButtonProps.label || "Batal" }}
         </BaseButton>
         <BaseButton
            v-bind="props.confirmButtonProps"
            class="flex-1"
            @click="onConfirm"
         >
            <Icon :name="props.confirmButtonProps.icon || 'lucide:check'" />
            {{ props.confirmButtonProps.label || "Konfirmasi" }}
         </BaseButton>
      </div>
   </div>
</template>
