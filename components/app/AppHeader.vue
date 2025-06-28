<template>
   <header class="relative z-10">
      <div
         class="container mx-auto h-(--header-height) flex items-center w-full"
      >
         <div class="flex-1 flex items-center justify-between">
            <span class="font-bold">EssayBank</span>
            <DevOnly>
               <BaseThemeSwitch />
            </DevOnly>
            <BaseButton rounded="full">
               <span>Mulai Sekarang</span>
               <Icon name="lucide:arrow-right" />
            </BaseButton>
         </div>
      </div>
   </header>
</template>
