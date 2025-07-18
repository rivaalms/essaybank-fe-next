type Dialog = {
   show: boolean
   component: ReturnType<typeof h>
   title: string
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
   })

   function showDialog(title: string, component: ReturnType<typeof h>) {
      dialog.value.component = component
      dialog.value.title = title
      dialog.value.show = true
   }

   function closeDialog() {
      Promise.resolve(() => {
         dialog.value.show = false
      }).finally(() => {
         dialog.value.component = h("div")
         dialog.value.title = ""
      })
   }

   return {
      notify,
      dialog,
      showDialog,
      closeDialog
   }
})
