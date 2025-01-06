import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './aswer-question'

test('Create an answer', () => {
  const sut = new AnswerQuestionUseCase()

  const answer = sut.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})