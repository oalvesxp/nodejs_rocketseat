import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, rep: FastifyReply) {
  const historyCheckInsQuerySchema = z.object({
    page: z.number().min(1).default(1),
  })

  const { page } = historyCheckInsQuerySchema.parse(req.query)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  const checkIns = await fetchUserCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  })

  return rep.status(200).send({ checkIns })
}
