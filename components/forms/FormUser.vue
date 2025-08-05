<script setup lang="ts">
const props = withDefaults(
   defineProps<{
      data?: Model.User
      loading?: Ref<boolean>
   }>(),
   {
      loading: () => shallowRef(false),
   }
)

const emit = defineEmits<{
   (e: "submit", values: InferSchema<typeof $userSchema, "create">): void
}>()

const {
   form,
   error,
   loading: formLoading,
   submit,
} = useForm(
   {
      name: undefined,
      email: undefined,
      role: undefined,
      password: undefined,
      password_confirmation: undefined,
   },
   $userSchema().create
)

whenever(
   () => props.data,
   (value) => {
      form.value.name = value.name
      form.value.email = value.email
      form.value.role = value.role
   },
   { immediate: true }
)

const loading = computed(() => props.loading.value || formLoading.value)

async function onSubmit() {
   await submit(
      (values) => {
         emit("submit", values)
      },
      (err) => {
         console.log("🚀 ~ FormUser.vue:48 ~ onSubmit ~ err:", err)
      }
   )
}

const roleOptions = ["admin", "reviewer"]
const showPassword = ref({
   password: false,
   password_confirmation: false,
})
</script>

<template>
   <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-3 gap-4"
   >
      <BaseField
         id="name"
         label="Nama"
         :error="error.name"
         v-slot="{ inputAttrs, inputRef }"
      >
         <BaseInput
            v-model="form.name"
            :ref="inputRef"
            v-bind="inputAttrs"
            :aria-invalid="!!error.name"
            :disabled="loading"
         />
      </BaseField>
      <BaseField
         id="email"
         label="Email"
         :error="error.email"
         v-slot="{ inputAttrs, inputRef }"
      >
         <BaseInput
            v-model="form.email"
            :ref="inputRef"
            v-bind="inputAttrs"
            :aria-invalid="!!error.email"
            :disabled="loading"
         />
      </BaseField>
      <BaseField
         id="role"
         label="Role"
         :error="error.role"
         v-slot="{ inputAttrs, inputRef }"
      >
         <BaseSelect
            v-model="form.role"
            v-bind="inputAttrs"
            :ref="inputRef"
         >
            <BaseSelectItem
               v-for="option in roleOptions"
               :value="option"
               class="capitalize"
            >
               {{ option }}
            </BaseSelectItem>
         </BaseSelect>
      </BaseField>
      <BaseField
         id="password"
         label="Kata Sandi"
         :error="error.password"
         v-slot="{ inputAttrs, inputRef }"
      >
         <div class="relative">
            <BaseInput
               v-model="form.password"
               :ref="inputRef"
               v-bind="inputAttrs"
               :type="showPassword.password ? 'text' : 'password'"
               :aria-invalid="!!error.password"
               :disabled="loading"
               class="pr-8"
            />
            <Icon
               :name="showPassword.password ? 'lucide:eye-off' : 'lucide:eye'"
               class="text-muted-500 absolute right-2 top-1/2 -translate-y-1/2"
               @click="showPassword.password = !showPassword.password"
            />
         </div>
      </BaseField>
      <BaseField
         id="password_confirmation"
         label="Konfirmasi Kata Sandi"
         :error="error.password_confirmation"
         v-slot="{ inputAttrs, inputRef }"
      >
         <div class="relative">
            <BaseInput
               v-model="form.password_confirmation"
               :ref="inputRef"
               v-bind="inputAttrs"
               :type="showPassword.password_confirmation ? 'text' : 'password'"
               :aria-invalid="!!error.password_confirmation"
               :disabled="loading"
               class="pr-8"
            />
            <Icon
               :name="
                  showPassword.password_confirmation
                     ? 'lucide:eye-off'
                     : 'lucide:eye'
               "
               class="text-muted-500 absolute right-2 top-1/2 -translate-y-1/2"
               @click="
                  showPassword.password_confirmation =
                     !showPassword.password_confirmation
               "
            />
         </div>
      </BaseField>
      <div class="col-span-full flex items-center justify-end">
         <BaseButton
            variant="primary"
            type="submit"
            :loading="loading"
         >
            <Icon
               name="lucide:check"
               class="-ms-1 h-4 w-4"
            />
            <span class="text-medium">Simpan</span>
         </BaseButton>
      </div>
   </form>
</template>
