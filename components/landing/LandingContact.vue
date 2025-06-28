<template>
   <div class="container mx-auto">
      <div class="lg:max-w-screen-lg mx-auto">
         <div class="flex gap-4">
            <div class="flex flex-col gap-4 max-w-2/3">
               <div class="font-display text-xl font-bold">
                  Informasi Kontak
               </div>
               <div class="flex flex-col gap-4">
                  <p class="text-pretty">
                     Jika kamu memiliki kritik, saran, atau pertanyaan seputar
                     penelitian ini, jangan ragu untuk menghubungi saya!
                  </p>
                  <div class="flex flex-col gap-2">
                     <a
                        class="flex gap-2 items-center hover:underline hover:text-primary-500"
                        href="mailto:riva.almero@widyatama.ac.id"
                     >
                        <Icon name="lucide:mail" />
                        <span>riva.almero@widyatama.ac.id</span>
                     </a>
                     <a
                        class="flex gap-2 items-center hover:underline hover:text-primary-500"
                        href="https://wa.me/6289540199882"
                     >
                        <Icon name="ic:baseline-whatsapp" />
                        <span> +62 895 401 998 82 </span>
                     </a>
                  </div>
                  <p class="text-pretty">
                     Saya akan sangat senang menerima masukan dari kamu supaya
                     penelitian ini bisa semakin bagus. Jadi, kalau ada ide atau
                     pertanyaan,
                     <span class="italic">feel free to reach out!</span>
                  </p>
               </div>
            </div>
            <div class="flex grow items-center justify-center">
               <NuxtImg src="/img/mailbox.svg" />
            </div>
         </div>
      </div>
   </div>
</template>
