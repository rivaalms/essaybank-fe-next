<script setup lang="ts">
const scroll = reactive({
   x: window.scrollX,
   y: window.scrollY,
})

function updateScroll() {
   scroll.x = window.scrollX
   scroll.y = window.scrollY
}

onMounted(() => {
   window.addEventListener("scroll", updateScroll, { passive: true })
})

onUnmounted(() => {
   window.removeEventListener("scroll", updateScroll)
})
</script>

<template>
   <header
      class="z-10 border-b"
      :class="[scroll.y > 0 ? 'border-muted-200' : 'border-transparent']"
   >
      <div
         class="container mx-auto px-4 xl:px-0 h-(--header-height) flex items-center w-full"
      >
         <div class="flex-1 flex items-center justify-between">
            <NuxtLink
               to="/"
               class="font-bold"
            >
               EssayBank
            </NuxtLink>
            <DevOnly>
               <BaseThemeSwitch />
               {{ scroll.y }}
            </DevOnly>
            <BaseButton
               v-if="$route.path == '/' && scroll.y > 800"
               rounded="full"
               to="/essays"
            >
               <span>Mulai Sekarang</span>
               <Icon name="lucide:arrow-right" />
            </BaseButton>
         </div>
      </div>
   </header>
</template>
