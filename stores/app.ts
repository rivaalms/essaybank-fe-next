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

   return {
      notify
   }
})
