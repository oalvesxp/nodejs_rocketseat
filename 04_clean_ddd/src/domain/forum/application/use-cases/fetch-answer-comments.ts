import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  { comments: AnswerComment[] }
>

export class FetchAnswerCommentsUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRespository: AnswerCommentsRepository,
  ) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const comments = await this.answerCommentsRespository.findManyByAnswerId(
      answerId,
      { page },
    )

    return right({
      comments,
    })
  }
}
