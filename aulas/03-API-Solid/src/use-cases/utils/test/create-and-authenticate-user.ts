import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin: boolean = false,
) {
  await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email: 'jhon.doe@example.com',
      passwd_hash: await bcrypt.hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  await request(app.server).post('/users').send({
    name: 'Jhon Doe',
    email: 'jhon.doe@example.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jhon.doe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
