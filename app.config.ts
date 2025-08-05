export default defineAppConfig({
   menu: [
      {
         label: "Dashboard",
         to: "/admin",
         icon: "lucide:home",
         role: ["admin", "reviewer"]
      },
      {
         label: "Pertanyaan",
         to: "/admin/questions",
         icon: "lucide:clipboard",
         role: ["admin", "reviewer"]
      },
      {
         label: "Respons",
         to: "/admin/responses",
         icon: "lucide:clipboard",
         role: ["admin", "reviewer"]
      },
      {
         label: "Pengguna",
         to: "/admin/users",
         icon: "lucide:clipboard",
         role: ["admin"]
      },
   ],
})
