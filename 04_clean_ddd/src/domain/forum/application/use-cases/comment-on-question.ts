import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseRespose {
  comment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseRespose> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Resource not found.')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    const comment =
      await this.questionCommentsRepository.create(questionComment)

    return {
      comment,
    }
  }
}
