import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  comments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRespository: AnswerCommentsRepository,
  ) { }

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Resource not found')
    }

    const comments = await this.answerCommentsRespository.findManyByAnswerId(
      answerId,
      { page },
    )

    return {
      comments,
    }
  }
}
