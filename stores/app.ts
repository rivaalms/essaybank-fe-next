type Dialog = {
   show: boolean
   component: ReturnType<typeof h>
   title: string
   width: `${number}${'px' | 'rem' | 'em' | 'pt' | '%'}` | "auto"
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
      width: "auto"
   })

   function showDialog(title: string, component: ReturnType<typeof h>, opts?: Omit<Dialog, "title" | "component" | "show">) {
      dialog.value.component = component
      dialog.value.title = title
      dialog.value.show = true
      dialog.value.width = opts?.width || "auto"
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
      closeDialog
   }
})
