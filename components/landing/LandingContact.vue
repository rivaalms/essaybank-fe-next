<template>
   <div class="container mx-auto px-4 xl:px-0">
      <div class="lg:max-w-screen-lg mx-auto">
         <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-col gap-4 md:max-w-2/3">
               <div class="font-display text-xl font-bold">
                  Informasi Kontak
               </div>
               <div class="flex flex-col gap-8">
                  <p class="text-pretty">
                     Jika kamu memiliki kritik, saran, atau pertanyaan seputar
                     penelitian ini, jangan ragu untuk menghubungi saya!
                  </p>
                  <div class="flex flex-col gap-4">
                     <a
                        class="flex gap-2 items-center hover:underline hover:text-primary-500 underline decoration-dotted"
                        href="mailto:riva.almero@widyatama.ac.id"
                        target="_blank"
                     >
                        <Icon name="lucide:mail" />
                        <span>riva.almero@widyatama.ac.id</span>
                     </a>
                     <a
                        class="flex gap-2 items-center hover:underline hover:text-primary-500 underline decoration-dotted"
                        href="https://wa.me/62895401998822"
                        target="_blank"
                     >
                        <Icon name="ic:baseline-whatsapp" />
                        <span> +62 895 401 998 822 </span>
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
