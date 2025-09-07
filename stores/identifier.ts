import * as uuid from "uuid"

export const useIdentifierStore = defineStore(
   "identifier",
   () => {
      const value = shallowRef<string>()
      async function generateIdentifier() {
         value.value = uuid.v4()
      }

      return {
         value,
         generateIdentifier,
      }
   },
   { persist: true }
)
