import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  commentId: string
  authorId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    commentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const comment = await this.questionCommentsRepository.findById(commentId)

    if (!comment) {
      throw new Error('Comment not found.')
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionCommentsRepository.delete(comment)

    return {}
  }
}
