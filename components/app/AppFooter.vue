<script setup lang="ts">
const year = new Date().getFullYear()

function onContactClick(type: "mail" | "whatsapp") {
   const a = document.createElement("a")
   a.target = "_blank"
   a.href =
      type === "mail"
         ? "mailto:riva.almero@widyatama.ac.id"
         : "https://wa.me/6289540199882"
   a.click()
   a.remove()
}
</script>

<template>
   <footer
      class="bg-muted-950 text-muted-50 h-(--footer-height) flex items-center"
   >
      <div class="container mx-auto grid gap-4">
         <div class="lg:max-w-screen-lg mx-auto">
            <div class="flex flex-col gap-12">
               <div class="grid grid-cols-4 gap-8">
                  <div class="flex flex-col gap-4 col-span-2">
                     <span class="font-bold text-lg font-display">
                        EssayBank
                     </span>
                     <p class="text-muted-400">
                        Jawaban esaimu akan membantu membuat sistem penilaian
                        otomatis yang lebih pintar!
                     </p>
                  </div>
                  <div class="flex flex-col gap-4">
                     <span class="font-semibold"> Navigasi </span>
                     <ul class="space-y-2 text-muted-400">
                        <li>
                           <NuxtLink
                              to="/"
                              class="hover:underline"
                           >
                              Beranda
                           </NuxtLink>
                        </li>
                        <li>
                           <NuxtLink
                              to="/essay"
                              class="hover:underline"
                           >
                              Isi Esai
                           </NuxtLink>
                        </li>
                     </ul>
                  </div>
                  <div class="flex flex-col gap-4">
                     <span class="font-semibold">Kontak</span>
                     <div class="flex flex-wrap gap-4">
                        <BaseButton
                           variant="dark"
                           @click="onContactClick('mail')"
                        >
                           <Icon name="lucide:mail" />
                        </BaseButton>
                        <BaseButton
                           variant="dark"
                           @click="onContactClick('whatsapp')"
                        >
                           <Icon name="ic:baseline-whatsapp" />
                        </BaseButton>
                     </div>
                  </div>
               </div>
               <hr class="border-muted-700" />
               <div class="flex justify-between">
                  <span class="text-sm text-muted-400">
                     &copy; {{ year }} Riva Almero
                  </span>
               </div>
            </div>
         </div>
      </div>
   </footer>
</template>
