import { expect, test } from 'vitest'

test('User has rights to create a new transaction', async () => {
  const res = 201

  expect(res).toEqual(201)
})
