export default defineNuxtRouteMiddleware((to, from) => {
   const authStore = useAuthStore()
   const token = authStore.getToken
   const isTokenExpired = authStore.isTokenExpired()

   const isAdminRoute = to.path.startsWith("/admin")
   const ignoredRoutes = ["/admin/login"]
   const userIsInIgnoredRoutes = ignoredRoutes.some(
      (route) => route === to.path
   )

   // NOTE: If user is logged in AND trying to access guest page
   if (token && !isAdminRoute) {
      return navigateTo("/admin", { replace: true })
   }

   if (isAdminRoute) {
      // NOTE: If user is not logged in AND trying to access admin page
      if (!token && !userIsInIgnoredRoutes) {
         return navigateTo("/admin/login", { replace: true })
      }

      // NOTE: If token expired
      if (isTokenExpired && !userIsInIgnoredRoutes) {
         authStore.$reset()
         useAppStore().notify("Warning", "Token kedaluwarsa")
         return navigateTo("/admin/login", { replace: true })
      }

      // NOTE: If user is logged in AND trying to access ignored page
      if (token && userIsInIgnoredRoutes) {
         return navigateTo("/admin", { replace: true })
      }
   }
})
