import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, rep: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQuerySchema.parse(req.body)

  const searchGymUseCase = makeSearchGymsUseCase()

  const gyms = await searchGymUseCase.execute({
    query,
    page,
  })

  return rep.status(200).send({ gyms })
}
