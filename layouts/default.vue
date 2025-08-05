<template>
   <div>
      <AppHeader class="sticky top-0 bg-white/90 backdrop-blur" />
      <main class="min-h-[calc(100vh-var(--header-height))]">
         <slot />
      </main>
      <AppFooter />
   </div>
</template>
