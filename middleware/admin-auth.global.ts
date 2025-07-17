export default defineNuxtRouteMiddleware((to, from) => {
   const token = useAuthStore().getToken

   const isAdminRoute = to.path.startsWith("/admin")
   const ignoredRoutes = ["/admin/login"]
   const userIsInIgnoredRoutes = ignoredRoutes.some((route) => route === to.path)

   if (!isAdminRoute) return

   if (!token && !userIsInIgnoredRoutes) {
      return navigateTo("/admin/login", { replace: true })
   }

   if (token && userIsInIgnoredRoutes) {
      return navigateTo("/admin", { replace: true })
   }
})
