import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  async findById(id: string) {
    const comment = this.items.find((item) => item.id.toString() === id)

    if (!comment) {
      return null
    }

    return comment
  }

  async findManyByAnswerId(id: string, { page }: PaginationParams) {
    const comments = this.items
      .filter((item) => item.answerId.toString() === id)
      .slice((page - 1) * 20, page * 20)

    return comments
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const commentIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.items.splice(commentIndex, 1)
  }
}
