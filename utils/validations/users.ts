const yup = useYup()

export function $userSchema() {
   const create = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      role: yup.string().oneOf(["admin", "reviewer"]).required(),
      password: yup.string().min(8).required(),
      password_confirmation: yup.string().oneOf([yup.ref("password")]).required(),
   })

   return {
      create
   }
}