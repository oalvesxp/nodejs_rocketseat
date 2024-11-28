import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      id: 'gym01',
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: new Decimal(-22.867948),
      longitude: new Decimal(-47.213465),
    })

    await gymsRepository.create({
      id: 'gym02',
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: new Decimal(-22.8712641),
      longitude: new Decimal(-46.7907834),
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.865661,
      userLongitude: -47.223557,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
