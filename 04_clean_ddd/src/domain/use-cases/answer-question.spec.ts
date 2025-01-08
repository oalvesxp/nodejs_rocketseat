import { AnswerQuestionUseCase } from './aswer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  }
}

test('Create an answer', async () => {
  const sut = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await sut.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
