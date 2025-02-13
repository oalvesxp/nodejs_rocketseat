import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'

import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    )
  })

  it('Should be able to edit an answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author01') },
      new UniqueEntityID('answer01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.execute({
      authorId: 'author01',
      answerId: newAnswer.id.toValue(),
      content: 'Content already edited',
      attachmentsIds: ['1', '3'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Content already edited',
    })
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
      ],
    )
  })

  it('Should not be able to edit an answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author01') },
      new UniqueEntityID('Answer01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author02',
      answerId: newAnswer.id.toValue(),
      content: 'Content already edited',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
