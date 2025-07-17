<template>
   <div class="bg-muted-100">
      <AppAdminSidebar />
      <AppAdminHeader />
      <main
         class="min-h-screen pt-(--admin-header-height) ps-[calc(var(--admin-sidebar-width)+1rem)] pe-2"
      >
         <div class="py-4 container mx-auto">
            <slot />
         </div>
      </main>
   </div>
</template>
