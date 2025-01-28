import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('Should be able to comment on question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: 'author01',
      questionId: question.id.toString(),
      content: 'Lorem inpsur...',
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)
  })
})
