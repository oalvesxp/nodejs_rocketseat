import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'

export function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transaction = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Transação de retorno',
        amount: 900,
      })
      .returning('*')

    return transaction
  })
}
