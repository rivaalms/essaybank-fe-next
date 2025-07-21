import type { BaseButtonProps } from "@shuriken-ui/nuxt"
import { AppConfirmDialogItem } from "#components"

type Dialog = {
   show: boolean
   component: ReturnType<typeof h>
   title: string
   width: `${number}${"px" | "rem" | "em" | "pt" | "%"}` | "auto"
}

type ConfirmDialogOpts = {
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
}

export const useAppStore = defineStore("app", () => {
   function notify(
      title: string,
      description?: string,
      duration: number = 5000
   ) {
      const { add } = useNuiToasts()
      add({
         title,
         description,
         duration,
      })
   }

   const dialog = ref<Dialog>({
      show: false,
      component: h("div"),
      title: "",
      width: "auto",
   })

   function showDialog(
      title: string,
      component: ReturnType<typeof h>,
      opts?: Omit<Dialog, "title" | "component" | "show">
   ) {
      dialog.value.component = component
      dialog.value.title = title
      dialog.value.show = true
      dialog.value.width = opts?.width || "auto"
   }

   function showConfirmDialog(
      title: string,
      onConfirm: () => void,
      onCancel?: () => void,
      opts?: ConfirmDialogOpts
   ) {
      dialog.value.component = h(AppConfirmDialogItem, {
         onConfirm,
         onCancel,
         ...opts
      })
      dialog.value.title = title
      dialog.value.width = "600px"
      dialog.value.show = true
   }

   function closeDialog() {
      dialog.value.show = false
      setTimeout(() => {
         dialog.value.component = h("div")
         dialog.value.title = ""
         dialog.value.width = "auto"
      }, 500)
   }

   return {
      notify,
      dialog,
      showDialog,
      showConfirmDialog,
      closeDialog,
   }
})
