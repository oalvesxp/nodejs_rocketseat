import http from 'node:http'

/**
 * Criar usuários
 * Listagem de usuários
 * Edição de usuários
 * Remoção de usuários
 *
 * HTTP
 *  - Method HTTP
 *  - URL
 *
 * METHODS
 *  - GET     -> Buscar um recurso no back-end
 *  - POST    -> Criar um recurso no back-end
 *  - PUT     -> Atualizar um recurso (uma entidade quase que por completo) no back-end
 *  - PATCH   -> Atualiar única e específica de um recurso no back-end
 *  - DELETE  -> Apagar um recurso no back-end
 */

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res.end('Listagem de usuarios')
  }

  if (method === 'POST' && url === '/users') {
    return res.end('Criacao de usuarios')
  }

  /** Early return */
  return res.end('Hello Ignite')
})

/** curl localhost:3333 */
server.listen(3333)
