export default defineNuxtRouteMiddleware((to, from) => {
   const authStore = useAuthStore()
   const token = authStore.getToken
   const isTokenExpired = authStore.isTokenExpired()

   const isAdminRoute = to.path.startsWith("/admin")
   const ignoredRoutes = ["/admin/login"]
   const userIsInIgnoredRoutes = ignoredRoutes.some(
      (route) => route === to.path
   )

   if (token && !isAdminRoute) {
      return navigateTo("/admin", { replace: true })
   }

   if (token && isTokenExpired) {
      authStore.$reset()
      useAppStore().notify("Warning", "Token kedaluwarsa")
      return navigateTo("/admin/login", { replace: true })
   }

   if (!token && !userIsInIgnoredRoutes) {
      return navigateTo("/admin/login", { replace: true })
   }

   if (token && userIsInIgnoredRoutes) {
      return navigateTo("/admin", { replace: true })
   }
})
