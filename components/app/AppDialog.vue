<script setup lang="ts">
import {
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogOverlay,
   DialogPortal,
   DialogRoot,
   DialogTitle,
   DialogTrigger,
} from "reka-ui"

const appStore = useAppStore()
</script>

<template>
   <div>
      <DialogRoot
         v-model:open="appStore.dialog.show"
         modal
      >
         <DialogPortal>
            <DialogOverlay
               class="bg-muted-800/50 backdrop-blur-sm fixed inset-0 z-30"
            />
            <DialogContent
               class="fixed top-1/2 left-1/2 max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-xl focus:outline-none z-[100] flex flex-col gap-4"
               :style="{ width: appStore.dialog.width }"
            >
               <DialogTitle
                  as="span"
                  class="text-lg font-medium tracking-wide"
               >
                  {{ appStore.dialog.title }}
               </DialogTitle>
               <DialogClose class="absolute top-2.5 right-2.5 appearance-none">
                  <BaseButton
                     variant="ghost"
                     rounded="full"
                     aria-label="Close"
                     size="icon-md"
                  >
                     <Icon name="lucide:x" />
                  </BaseButton>
               </DialogClose>
               <component :is="appStore.dialog.component" />
            </DialogContent>
         </DialogPortal>
      </DialogRoot>
   </div>
</template>
