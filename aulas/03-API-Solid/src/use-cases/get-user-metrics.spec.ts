import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics User Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('Should be able to get check-ins count from metrics', async () => {
    for (let i = 1; i <= 25; i++) {
      await checkInsRepository.create({
        gym_id: `gym${i}`,
        user_id: 'user01',
      })
    }

    const { checkInsCount } = await sut.execute({
      userId: 'user01',
    })

    expect(checkInsCount).toEqual(25)
  })
})
