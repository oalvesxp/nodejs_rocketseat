import { it, beforeAll, afterAll, describe, expect } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 100,
        type: 'credit',
      })
      .expect(201)
  })

  it('Should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 100,
        type: 'credit',
      })

    const cookies: string[] | undefined =
      createTransactionResponse.get('Set-Cookie')

    const lisTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies ?? [])
      .expect(200)

    expect(lisTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 100,
      }),
    ])
  })
})
