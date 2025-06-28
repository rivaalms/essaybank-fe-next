<template>
   <div class="h-[calc(100vh-8rem)] -mt-(--header-height)">
      <div class="relative h-full">
         <div class="container mx-auto pt-(--header-height) h-full pb-24">
            <div class="h-full flex items-center">
               <div class="flex flex-col gap-4 flex-1">
                  <span class="text-8xl leading-[1.15] font-bold font-display">
                     Masa Depan Pendidikan <br/> Dimulai dari Sini!
                  </span>
                  <p class="text-muted-500 text-xl">
                     Jawaban esaimu akan membantu membuat sistem penilaian otomatis yang lebih pintar!
                  </p>
                  <div class="mt-8 flex gap-4">
                     <BaseButton size="xl" variant="primary" to="/essays">
                        Mulai Sekarang
                     </BaseButton>
                     <BaseButton size="xl" variant="ghost">
                        Tentang
                     </BaseButton>
                  </div>
               </div>
            </div>
         </div>
         <NuxtImg src="/img/teaching_outline_black.svg" class="absolute right-20 bottom-16 w-1/2" />
      </div>
   </div>
</template>
