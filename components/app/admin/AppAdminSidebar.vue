<script setup lang="ts">
const menu = useAppConfig().menu
const route = useRoute()

function isRouteActive(path: string) {
   return path === route.path
}

function navigateRoute(menuItem: Menu) {
   navigateTo(menuItem.to)
}

const authStore = useAuthStore()
const user = computed(() => authStore.user)

function onLogout() {
   authStore.logout()
   useAppStore().notify("Info", "Berhasil keluar")
   navigateTo("/")
}
</script>

<template>
   <aside class="fixed left-0 inset-y-0 w-(--admin-sidebar-width) m-4">
      <div class="bg-white rounded-2xl shadow-lg">
         <div class="h-(--admin-header-height) flex items-center px-4">
            <NuxtLink
               to="/admin"
               class="font-bold text-lg"
            >
               EssayBank
            </NuxtLink>
         </div>
         <div
            class="flex flex-col h-[calc(100vh-var(--admin-header-height)-2rem)]"
         >
            <div
               class="flex-1 p-4 pt-0 flex flex-col overflow-y-auto nui-slimscroll"
            >
               <template v-for="item in menu">
                  <div
                     class="px-2 py-4 rounded-lg hover:bg-muted-100 text-sm font-medium cursor-pointer"
                     :class="{
                        'bg-primary-100 text-primary-500 hover:bg-primary-200 font-semibold':
                           isRouteActive(item.to),
                     }"
                     @click="navigateRoute(item)"
                  >
                     <div class="flex items-center gap-2">
                        <Icon :name="item.icon" />
                        <span class="flex-1">
                           {{ item.label }}
                        </span>
                     </div>
                  </div>
               </template>
            </div>
            <div class="p-4">
               <BaseDropdown :bindings="{ content: { align: 'start', side: 'top' } }">
                  <template #button>
                     <div class="px-2 py-4 rounded-lg hover:bg-muted-100 text-sm font-medium cursor-pointer">
                        <div class="flex items-center gap-2">
                           <BaseAvatar
                              src="https://api.dicebear.com/9.x/adventurer-neutral/svg"
                           />
                           <div class="flex-1 flex flex-col">
                              <span class="flex-1"> {{ user?.name }} </span>
                              <span
                                 class="text-xs text-muted-500 uppercase tracking-wide"
                              >
                                 {{ user?.role }}
                              </span>
                           </div>
                           <Icon name="lucide:chevron-down" />
                        </div>
                     </div>
                  </template>
                  <BaseDropdownItem class="hover:focus-within:ring-0">
                     <template #start>
                        <Icon name="lucide:user" />
                     </template>
                     Profil
                  </BaseDropdownItem>
                  <BaseDropdownItem class="hover:focus-within:ring-0" @select="onLogout">
                     <template #start>
                        <Icon name="lucide:log-out" class="text-red-500" />
                     </template>
                     <span class="text-red-500">
                        Keluar
                     </span>
                  </BaseDropdownItem>
                  <BaseDropdownArrow />
               </BaseDropdown>
            </div>
         </div>
      </div>
   </aside>
</template>
