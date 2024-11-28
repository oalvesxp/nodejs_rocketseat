import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('[e2e] Create Check-in Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const createGymResponse = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description.',
        phone: '11 9 9999-9999',
        latitude: -22.8585819,
        longitude: -47.2240046,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${createGymResponse.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.8585819,
        longitude: -47.2240046,
      })

    expect(response.statusCode).toEqual(201)
  })
})
