<template>
   <div class="bg-muted-100">
      <AppAdminSidebar />
      <main
         class="min-h-screen ps-[calc(var(--admin-sidebar-width)+2rem)] pe-4"
      >
         <div class="py-4">
            <slot />
         </div>
         <AppDialog />
      </main>
   </div>
</template>
