<script setup lang="ts">
const accordion = computed(() => [
   {
      value: "1",
      title: "Apa yang sedang saya lakukan?",
      content:
         "Saya sedang meneliti tentang bagaimana AI bisa memahami dan menilai jawaban esai.",
   },
   {
      value: "2",
      title: "Mengapa Web App ini dibuat?",
      content:
         "Saya butuh banyak contoh esai untuk melatih model AI supaya bisa memahami dan memberikan penilaian yang akurat. Oleh karena itu, EssayBank dibuat untuk mengumpulkan data esai tersebut. Data yang dikumpulkan akan membantu meningkatkan kualitas model yang nantinya bisa digunakan untuk berbagai keperluan akademik dan penelitian.",
   },
   {
      value: "3",
      title: "Mengapa saya meneliti bidang ini?",
      content:
         "Menilai esai itu butuh waktu lama, dan kadang-kadang penilaiannya bisa berbeda-beda tergantung siapa yang mengevaluasi jawaban esai. Saya ingin melihat apakah teknologi AI bisa membantu membuat proses ini lebih cepat dan lebih adil.",
   },
   {
      value: "4",
      title: "Apa manfaat penelitian ini?",
      content:
         "Penelitian ini diharapkan dapat membantu dunia pendidikan dengan penilaian otomatis yang lebih baik. Penelitian ini juga harapannya dapat mengurangi kesalahan atau bias dalam penilaian esai, serta mengembangkan teknologi yang lebih canggih dalam bidang pendidikan.",
   },
])

const accordionValue = ref("1")
</script>

<template>
   <div class="container mx-auto px-4 xl:px-0">
      <div class="lg:max-w-screen-lg mx-auto">
         <div class="flex flex-col gap-8">
            <BaseAvatar
               src="/img/profile.jpg"
               size="4xl"
               class="self-center"
            />
            <div class="flex flex-col gap-2 items-center">
               <p class="text-3xl font-display">
                  Hai, Saya
                  <a
                     href="https://pddikti.kemdiktisaintek.go.id/detail-mahasiswa/mjLSIEUl4e8DW4nHLbCwc_17U0TfHGBraQyRgsUzm1pjIxwNLj2pLVj0neunt99rYqiefg=="
                     target="_blank"
                     class="nui-mark hover:underline"
                  >
                     Riva Almero
                  </a>
               </p>
               <p class="text-center">
                  Mahasiswa S1 Teknik Informatika di Universitas Widyatama
               </p>
            </div>
            <BaseAccordion
               type="single"
               collapsible
               class="divide-y divide-muted-200"
            >
               <template v-for="item in accordion">
                  <BaseAccordionItem
                     :value="item.value"
                     action="chevron"
                  >
                     <template #title>
                        <span class="text-base font-medium tracking-wide">
                           {{ item.title }}
                        </span>
                     </template>
                     <p class="text-pretty text-base text-black">
                        {{ item.content }}
                     </p>
                  </BaseAccordionItem>
               </template>
            </BaseAccordion>
         </div>
      </div>
   </div>
</template>
