import crypto from 'node:crypto'
import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

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

app.get('/transactions', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return transactions
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Runing!')
  })
