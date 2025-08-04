declare namespace Model {
   type Review = {
      id: number
      reviewerId: number
      responseId: number
      relevanceScore: string
      languageScore: string
      spellingScore: string
      totalScore: string
      createdAt: string
      updatedAt: string
      Reviewer?: Model.User
      Response?: Model.Response
   }
}