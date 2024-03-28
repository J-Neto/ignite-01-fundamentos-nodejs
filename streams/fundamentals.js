// Netflix & Spotify

// Ler pequenas partes de um todo e já conseguir trabalhar com elas antes de precisar carregar o arquivo por inteiro

// Importação de clientes via CSV (Excel)
// 1gb - 1.000.000
// POST /upload import .csv

// 10mb/s - 100s

// 100s -> Inserções no banco de dados

// 10mb/s -> 10.000

// Readable Streams -> Servidor está lendo informações aos poucos(upload csv)
// Writable Streams -> Servidor está enviando informações aos poucos (vídeos - netflix, música - spotify)

// Toda entrada e saída da aplicação é uma stream (req, res)

// Do próprio node: stdin, stdout

// stdin - Tudo o que o usuário digita no terminal
// stdout - Tudo o que sai do terminal

// process.stdin
//   .pipe(process.stdout) // Tudo o que estou recebendo como entrada (stdin), estou encaminhando (pipe) para uma saída (stdout)

import { Readable, Writable, Transform } from 'node:stream'

// Readable - Serve para LER do arquivo (ou de algum lugar)
// Transform - Serve para TRANSFORMAR os dados (ela lê os dados de um lugar e escreve para outro lugar)
// Writable - Serve para ESCREVER no arquivo (ou de algum lugar)

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
  
        this.push(buf)
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed))) // erro, retorno do callback
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString() * 10))
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())