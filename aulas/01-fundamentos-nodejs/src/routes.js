import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRotePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRotePath('/users'),
    handler: (req, res) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    },
  },
  {
    method: 'POST',
    path: buildRotePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email,
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRotePath('/users/:id/groups/:groupId'),
    handler: (req, res) => {
      return res.end()
    },
  },
]
