import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { it } from 'vitest'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to fetch answers by a specific question', async () => {
    for (let i = 0; i < 3; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question01'),
        }),
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question01',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('Should be able to fetch pagined answers by a specific question', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question01'),
        }),
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question01',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
