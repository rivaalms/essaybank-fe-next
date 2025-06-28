declare namespace Model {
   type Response = {
      id: number
      questionId: number
      identifier: string
      responseText: string
      createdAt: string
      updatedAt: string
      Question?: Model.Question
   }
}