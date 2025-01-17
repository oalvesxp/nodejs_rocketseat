import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to edit a question', asynct () => {
    const newQuestion = makeQuestion(
        { authorId: new UniqueEntityID('author01') },
        new UniqueEntityID('question01'),
    )
    
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author01',
      questionId: newQuestion.id.toValue(),
      title: 'Title already edited',
      content: 'Content already edited'
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Title already edited',
      content: 'Content already edited'
    })
  })

  todo('Should not be able to edit a question from another user', asynct () => {
    const newQuestion = makeQuestion(
        { authorId: new UniqueEntityID('author01') },
        new UniqueEntityID('question01'),
    )
    
    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() => {
      return sut.execute({
        authorId: 'author02',
        questionId: newQuestion.id.toValue(),
        title: 'Title already edited',
        content: 'Content already edited'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})