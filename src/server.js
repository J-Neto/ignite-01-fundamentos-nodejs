import http from 'node:http';
import { json } from './middlewares/json.js';

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req,res)

  if (method === 'GET' && url === '/users') {
    return res
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email
    })

    return res.writeHead(201).end()
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