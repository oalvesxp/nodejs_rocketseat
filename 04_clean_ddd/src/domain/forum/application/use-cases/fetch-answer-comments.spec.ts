import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswersRespository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch answer comments', () => {
  inMemoryAnswersRespository = new InMemoryAnswersRepository()
  inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
  sut = new FetchAnswerCommentsUseCase(
    inMemoryAnswersRespository,
    inMemoryAnswerCommentsRepository,
  )

  it('Should be able to fetch answer comments', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRespository.create(answer)

    for (let i = 0; i < 3; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: answer.id }),
      )
    }

    const result = await sut.execute({
      answerId: answer.id.toString(),
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
  })

  it('Should be able to fetch paginated answer comments', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRespository.create(answer)

    for (let i = 0; i < 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: answer.id }),
      )
    }

    const result = await sut.execute({
      answerId: answer.id.toString(),
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
