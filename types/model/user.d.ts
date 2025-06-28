declare namespace Model {
   type User = {
      id: number
      name: string
      email: string
      role: "admin" | "reviewer"
      createdAt: string
      updatedAt: string
   }
}