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
   <main class="h-screen px-4 xl:px-0 flex items-center justify-center">
      <BaseCard class="p-5 w-full md:max-w-[600px]">
         <div class="flex flex-col gap-4">
            <h1 class="text-lg font-bold tracking-wide font-display">EssayBank Admin</h1>
            <span class="text-muted-500 font-medium">Login</span>
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
