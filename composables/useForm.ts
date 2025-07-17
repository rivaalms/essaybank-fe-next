import type { AnyObject, ObjectSchema, InferType } from "yup"

export default function <
   V extends ObjectSchema<AnyObject>,
   T extends Record<keyof InferType<V>, any>,
>(initialValues: T, validationSchema: V) {
   const form = ref<InferType<V> | Record<keyof T, undefined>>({
      ...initialValues,
   })

   const error = ref<Partial<Record<keyof T, string>>>({})

   const loading = shallowRef(false)

   async function submit<S, E>(
      onValidationSuccess: (values: InferType<V>) => S,
      onValidationError?: (
         errors: Partial<Record<keyof InferType<V>, string>>
      ) => E
   ) {
      error.value = {}
      loading.value = true
      await validationSchema
         .validate(form.value)
         .then((values) => onValidationSuccess(values))
         .catch((err) => onValidationError?.(err))
         .finally(() => (loading.value = false))
   }

   return {
      form,
      error,
      loading,
      submit
   }
}
