<script setup lang="ts">
useHead({
   title: "EssayBank"
})
</script>

<template>
   <div class="antialiased">
      <NuxtRouteAnnouncer />
      <NuxtLoadingIndicator />
      <BaseProviders :toast="{ max: 10 }">
         <NuxtLayout>
            <NuxtPage />
         </NuxtLayout>
      </BaseProviders>
   </div>
</template>
