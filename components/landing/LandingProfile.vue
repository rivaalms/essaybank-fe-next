<template>
   <div class="container mx-auto">
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
                     >Riva Almero</a
                  >
               </p>
               <p>Mahasiswa S1 Teknik Informatika di Universitas Widyatama</p>
            </div>
            <div class="grid grid-cols-2 gap-4 place-items-start">
               <div class="flex flex-col gap-4">
                  <BaseCard class="p-5 flex flex-col gap-4">
                     <span class="font-semibold font-display">
                        Apa yang sedang saya lakukan?
                     </span>
                     <p>
                        Saya sedang meneliti tentang bagaimana AI bisa memahami
                        dan menilai jawaban esai.
                     </p>
                  </BaseCard>
                  <BaseCard class="p-5 flex flex-col gap-4">
                     <span class="font-semibold font-display">
                        Mengapa <span class="italic">Web App</span> ini dibuat?
                     </span>
                     <p>
                        Saya butuh banyak contoh esai untuk melatih model AI
                        supaya bisa memahami dan memberikan penilaian yang
                        akurat. Oleh karena itu, EssayBank dibuat untuk
                        mengumpulkan data esai tersebut. Data yang dikumpulkan
                        akan membantu meningkatkan kualitas model yang nantinya
                        bisa digunakan untuk berbagai keperluan akademik dan
                        penelitian.
                     </p>
                  </BaseCard>
               </div>
               <div class="flex flex-col gap-4">
                  <BaseCard class="p-5 flex flex-col gap-4">
                     <span class="font-semibold font-display">
                        Mengapa saya meneliti bidang ini?
                     </span>
                     <p>
                        Menilai esai itu butuh waktu lama, dan kadang-kadang
                        penilaiannya bisa berbeda-beda tergantung siapa yang
                        mengevaluasi jawaban esai. Saya ingin melihat apakah
                        teknologi AI bisa membantu membuat proses ini lebih
                        cepat dan lebih adil.
                     </p>
                  </BaseCard>
                  <BaseCard class="p-5 flex flex-col gap-4">
                     <span class="font-semibold font-display">
                        Apa manfaat penelitian ini?
                     </span>
                     <ul class="list-disc ms-4">
                        <li>
                           Bantu dunia pendidikan dengan penilaian otomatis yang
                           lebih baik.
                        </li>
                        <li>
                           Mengurangi kesalahan atau bias dalam penilaian esai.
                        </li>
                        <li>
                           Mengembangkan teknologi yang lebih canggih dalam
                           bidang pendidikan.
                        </li>
                     </ul>
                  </BaseCard>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
