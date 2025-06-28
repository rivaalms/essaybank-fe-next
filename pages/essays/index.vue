<script setup lang="ts">
const essayStore = useEssayStore()

onMounted(() => {
   if (essayStore.totalQuestions === undefined) {
      essayStore.fetchQuestions()
   }
})
</script>

<template>
   <div class="container mx-auto py-12">
      <div class="xl:max-w-screen-lg mx-auto">
         <div class="flex flex-col gap-8">
            <h1 class="font-display font-bold text-2xl">
               Sebelum mulai, baca ini dulu!
            </h1>
            <div class="flex flex-col gap-4">
               <p class="text-pretty">
                  Sebelum kamu mulai mengisi esai, ada beberapa hal penting yang
                  perlu kamu tahu:
               </p>
               <ul class="list-disc space-y-2 ms-4">
                  <li class="text-pretty">
                     <span class="font-medium text-primary-500">
                        Ada {{ essayStore.totalQuestions }} pertanyaan esai yang bisa kamu
                        isi.
                     </span>
                     Kamu nggak harus menjawab semuanya, tapi semakin banyak
                     yang kamu isi, semakin bermanfaat untuk penelitian ini!
                  </li>
                  <li class="text-pretty">
                     <span class="font-medium text-primary-500">
                        Nggak ada jawaban yang salah!
                     </span>
                     Jawablah dengan gaya dan pemikiranmu sendiri. Santai aja,
                     ga perlu khawatir soal benar dan salah 😉
                  </li>
                  <li class="text-pretty">
                     <span class="font-medium text-primary-500">
                        Progres kamu aman!
                     </span>
                     Jawaban yang sudah kamu isi akan langsung tersimpan secara
                     otomatis. Jadi, jika tab tertutup atau kamu pindah halaman,
                     kamu bisa lanjut kapan saja tanpa kehilangan progres!
                  </li>
                  <li class="text-pretty">
                     <span class="font-medium text-primary-500">
                        Kalau ada pertanyaan atau kendala, jangan ragu untuk
                        menghubungi kami!
                     </span>
                  </li>
               </ul>
               <p class="text-pretty">Siap? Yuk mulai esainya! 🚀✍️</p>
            </div>
            <div class="flex justify-end">
               <BaseButton
                  variant="primary"
                  class="gap-2"
               >
                  Mulai Sekarang
                  <Icon name="lucide:arrow-right" />
               </BaseButton>
            </div>
         </div>
      </div>
   </div>
</template>
