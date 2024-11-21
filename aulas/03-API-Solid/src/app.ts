import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const app = fastify()

app.post('/users', async (req, rep) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  await prisma.user.create({
    data: {
      name,
      email,
      passwd_hash: password,
    },
  })

  return rep.status(201).send()
})
