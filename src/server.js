import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios, não-sensíveis
//    - http://localhost:3333/users?userId=1&name=Diego
//  
// Route Parameters: Identificação de recurso (Geralmente)
//    - GET http://localhost:3333/users/1

// Request Body: Envio para informações de formulário (HTTPs)
//    - POST http://localhost:3333/users

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req,res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {

    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }
  return res.writeHead(404).end()
})

server.listen(3333)


// GET, POST, PUT, PATCH, DELETE (Semanticos, não funcionais)

// GET => Buscar uma recurso do back-end
// POST => Criar uma recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação única específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// Stateful - Stateless

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisição/resposta) => Metadados

// HTTP Status Code