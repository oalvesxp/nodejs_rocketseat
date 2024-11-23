import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-ins Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
    })

    console.log(checkIn)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice on same gym in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) // Mocking

    await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym01',
        userId: 'user01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should be able to check in twice on the same gym in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
