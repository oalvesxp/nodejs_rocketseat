import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-ins Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -22.8585819,
      longitude: -47.2240046,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
      userLatitude: -22.8585819,
      userLongitude: -47.2240046,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice on same gym in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) // Mocking

    await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
      userLatitude: -22.8585819,
      userLongitude: -47.2240046,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym01',
        userId: 'user01',
        userLatitude: -22.8585819,
        userLongitude: -47.2240046,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('Should be able to check in twice on the same gym in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
      userLatitude: -22.8585819,
      userLongitude: -47.2240046,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
      userLatitude: -22.8585819,
      userLongitude: -47.2240046,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.8320169),
      longitude: new Decimal(-47.1707685),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym02',
        userId: 'user01',
        userLatitude: -22.8585819,
        userLongitude: -47.2240046,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
