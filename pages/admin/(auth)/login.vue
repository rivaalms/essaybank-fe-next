<script setup lang="ts">
import type { ValidationError } from "yup"

definePageMeta({
   layout: false,
})

const { form, error, loading, submit } = useForm(
   {
      email: undefined,
      password: undefined,
   },
   $authSchema().login
)

const appStore = useAppStore()
const authStore = useAuthStore()
async function onSubmit() {
   await submit(async (values) => {
      const response = await authStore.login(values)
      appStore.notify("Sukses", response.meta.message)
      await navigateTo("/admin")
   })
}
</script>

<template>
   <main class="h-screen flex items-center justify-center">
      <BaseCard class="p-5 min-w-1/5">
         <div class="flex flex-col gap-4">
            <h1 class="text-lg font-semibold">Login</h1>
            <form
               @submit.prevent="onSubmit"
               class="grid gap-4"
            >
               <BaseInput
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
                  :aria-invalid="!!error.email"
               />
               <BaseInput
                  v-model="form.password"
                  type="password"
                  placeholder="Kata Sandi"
                  :aria-invalid="!!error.password ? 'true' : 'false'"
               />
               <div class="flex flex-col">
                  <BaseButton
                     variant="primary"
                     type="submit"
                     :loading="loading"
                  >
                     Login
                  </BaseButton>
               </div>
            </form>
         </div>
      </BaseCard>
   </main>
</template>
