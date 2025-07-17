const yup = useYup()

export function $authSchema() {
   const login = yup.object({
      email: yup.string().email().required().label("Email"),
      password: yup.string().required().label("Kata Sandi")
   })

   return {
      login
   }
}