import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('Should be able to delete a question comment', async () => {
    const comment = makeQuestionComment()
    await inMemoryQuestionCommentsRepository.create(comment)

    await sut.execute({
      authorId: comment.authorId.toString(),
      commentId: comment.id.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete a question comment from another user', async () => {
    const comment = makeQuestionComment({
      authorId: new UniqueEntityID('author01'),
    })

    await expect(() =>
      sut.execute({
        authorId: 'author02',
        commentId: comment.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
