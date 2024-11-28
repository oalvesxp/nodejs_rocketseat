import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { Decimal } from '@prisma/client/runtime/library'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able to search gyms', async () => {
    await gymsRepository.create({
      id: 'gym01',
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: new Decimal(-22.8320169),
      longitude: new Decimal(-47.1707685),
    })

    await gymsRepository.create({
      id: 'gym02',
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: new Decimal(-22.8320169),
      longitude: new Decimal(-47.1707685),
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('Should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym${i}`,
        title: `Node.js Gym ${i}`,
        description: null,
        phone: null,
        latitude: new Decimal(-22.8320169),
        longitude: new Decimal(-47.1707685),
      })
    }

    const { gyms } = await sut.execute({
      query: 'node.js',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Node.js Gym 21' }),
      expect.objectContaining({ title: 'Node.js Gym 22' }),
    ])
  })
})
