1. Iniciar projeto nodejs: 
    - npm init -y
2. Para o Nodejs entender o padrão dos ESModules:
    * no package.json, inclua:
        - "type":"module"
3. Criar script dev:
    * no package.json, inclua:
        - "dev": "node --watch src/server.js"
    * Agora execute a aplicação com:
        - npm run dev

Para rodar o server em uma interface de linha de comando:
    * http localhost:3333