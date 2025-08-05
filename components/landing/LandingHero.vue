<script setup lang="ts">
function onAboutClick() {
   const el = document.querySelector("#about")
   if (!el) return

   const y = el.getBoundingClientRect().top + window.scrollY
   const offset = 100 // berenti 100px sebelum elemen
   window.scrollTo({
      top: y - offset,
      behavior: "smooth",
   })
}
</script>

<template>
   <div class="h-[calc(100vh-var(--header-height))]">
      <div class="container mx-auto px-4 xl:px-0 grid grid-cols-5 gap-4 h-full">
         <div class="h-full lg:pb-56 col-span-full lg:col-span-3">
            <div class="h-full flex items-center">
               <div class="flex flex-col text-center lg:text-start gap-4 flex-1">
                  <span class="text-3xl md:text-5xl lg:text-7xl leading-[1.15] font-black lg:font-bold font-display">
                     Masa Depan Pendidikan <br />
                     <span class="text-primary-500">Dimulai dari Sini!</span>
                  </span>
                  <p class="text-muted-500 text-base lg:text-xl">
                     Jawaban esaimu akan membantu membuat sistem penilaian
                     otomatis yang lebih pintar!
                  </p>
                  <div class="mt-8 flex justify-center lg:justify-start gap-4">
                     <BaseButton
                        size="xl"
                        variant="primary"
                        to="/essays"
                     >
                        <span class="font-medium">
                           Mulai Sekarang
                        </span>
                     </BaseButton>
                     <BaseButton
                        size="xl"
                        variant="default"
                        @click="onAboutClick"
                     >
                        <span class="font-medium">
                           Tentang
                        </span>
                     </BaseButton>
                  </div>
               </div>
            </div>
         </div>
         <div class="h-full col-span-full lg:col-span-2 hidden md:flex md:items-center md:justify-center">
            <NuxtImg
               src="/img/teaching.svg"
               class="w-1/2 lg:w-full h-auto"
            />
         </div>
      </div>
   </div>
</template>
