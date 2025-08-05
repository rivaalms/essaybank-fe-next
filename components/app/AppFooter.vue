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
      class="bg-muted-950 text-muted-50 flex items-center"
   >
      <div class="container mx-auto px-4 xl:px-0 py-12 grid gap-4">
         <div class="lg:max-w-screen-lg mx-auto">
            <div class="flex flex-col gap-12">
               <div class="grid  lg:grid-cols-4 gap-8">
                  <div class="flex flex-col gap-4 col-span-2">
                     <span class="font-semibold text-lg font-display tracking-wide">
                        EssayBank
                     </span>
                     <p class="text-muted-400 text-pretty">
                        Jawaban esaimu akan membantu membuat sistem penilaian
                        otomatis yang lebih pintar!
                     </p>
                  </div>
                  <div class="flex flex-col gap-6">
                     <span class="font-medium tracking-wide"> Navigasi </span>
                     <ul class="space-y-4 text-muted-400">
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
                              to="/essays"
                              class="hover:underline"
                           >
                              Isi Esai
                           </NuxtLink>
                        </li>
                        <li>
                           <NuxtLink
                              to="/admin"
                              class="hover:underline"
                           >
                              Admin
                           </NuxtLink>
                        </li>
                     </ul>
                  </div>
                  <div class="flex flex-col gap-6">
                     <span class="font-medium tracking-wide">Kontak</span>
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
                  <span class="text-muted-400 text-pretty">
                     &copy; {{ year }} Riva Almero
                  </span>
               </div>
            </div>
         </div>
      </div>
   </footer>
</template>
