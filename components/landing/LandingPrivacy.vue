<template>
   <div class="container mx-auto">
      <div class="lg:max-w-screen-lg mx-auto">
         <BaseCard
            class="bg-gradient-to-br from-primary-500 to-primary-600 from-15% text-white p-5 py-20 flex gap-4 items-center border-0"
         >
            <div class="flex items-center justify-center grow w-full">
               <NuxtImg src="/img/security_2.svg" />
            </div>
            <div class="flex flex-col gap-4">
               <div class="my-4 mx-8">
                  <div class="flex flex-col gap-4">
                     <span class="font-display font-bold text-xl">
                        Mengenai Privasi Kamu
                     </span>
                     <p>
                        Kami benar-benar menghargai privasi kamu! Semua jawaban
                        esai yang kamu berikan akan tetap anonim dan hanya
                        digunakan untuk keperluan penelitian.
                     </p>
                     <p>
                        Selain itu, sistem akan mencatat alamat IP kamu semata-mata
                        untuk keperluan penyimpanan dan pengindeksan data. Jangan
                        khawatir, data ini hanya digunakan untuk analisis teknis
                        dan tidak akan dipublikasikan atau dibagikan ke siapa pun.
                        Privasi dan anonimitas kamu tetap menjadi prioritas utama
                        dalam penelitian ini!
                     </p>
                  </div>
               </div>
            </div>
         </BaseCard>
      </div>
   </div>
</template>
