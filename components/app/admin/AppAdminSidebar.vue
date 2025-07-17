<script setup lang="ts">
const menu = useAppConfig().menu
const route = useRoute()

function isRouteActive(path: string) {
   return path === route.path
}

function navigateRoute(menuItem: Menu) {
   navigateTo(menuItem.to)
}
</script>

<template>
   <aside class="fixed left-0 inset-y-0 w-(--admin-sidebar-width) m-2">
      <div class="bg-white border border-muted-200 rounded-2xl shadow-lg">
         <div class="h-(--admin-header-height) flex items-center px-4">
            <NuxtLink
               to="/admin"
               class="font-bold text-lg"
            >
               EssayBank
            </NuxtLink>
         </div>
         <div
            class="p-4 pt-0 flex flex-col h-[calc(100vh-var(--admin-header-height)-1rem)]"
         >
            <div class="flex-1 flex-flex col">
               <template v-for="item in menu">
                  <div
                     class="px-2 py-3 rounded-lg hover:bg-muted-100 text-sm font-medium cursor-pointer"
                     :class="{
                        'bg-primary-500 text-white hover:bg-primary-600':
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
            <div class="">
               <div
                  class="px-2 py-3 rounded-lg hover:bg-muted-100 text-sm font-medium cursor-pointer"
               >
                  <div class="flex items-center gap-2">
                     <Icon name="lucide:user" />
                     <span class="flex-1"> User Name </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </aside>
</template>
