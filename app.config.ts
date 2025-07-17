export default defineAppConfig({
   menu: [
      {
         label: "Dashboard",
         to: "/admin",
         icon: "lucide:home",
      },
      {
         label: "Pertanyaan",
         to: "/admin/questions",
         icon: "lucide:clipboard",
      },
      {
         label: "Respons",
         to: "/admin/responses",
         icon: "lucide:clipboard",
      },
      {
         label: "Pengguna",
         to: "/admin/users",
         icon: "lucide:clipboard",
      },
   ],
})
