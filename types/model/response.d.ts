declare namespace Model {
   type Response = {
      id: number
      questionId: number
      identifier: string
      responseText: string
      flagged: boolean
      createdAt: string
      updatedAt: string
      hasReview?: 1 | 0
      Question?: Model.Question
   }
}