declare namespace Model {
   type Auth = {
      user: Model.User
      token: {
         value: string
         expiresAt: string
      }
   }
}