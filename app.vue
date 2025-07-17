<template>
   <div>
      <NuxtRouteAnnouncer />
      <NuxtLoadingIndicator />
      <BaseProviders :toast="{ max: 10 }">
         <NuxtLayout>
            <NuxtPage />
         </NuxtLayout>
      </BaseProviders>
   </div>
</template>
