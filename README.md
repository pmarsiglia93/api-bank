🚀 Bank API – Challenge Funcional Health
API de simulação de banco digital desenvolvida para o processo seletivo da Funcional Health.

📖 Descrição
Esta API GraphQL simula operações bancárias de conta corrente (criação de conta, consulta de saldo, depósito e saque), persistindo os dados em MongoDB.
Testes unitários com Jest garantem alta confiabilidade e cobertura acima de 90%.

🛠️ Tecnologias Utilizadas
Node.js

GraphQL (Apollo Server Express)

MongoDB (Mongoose)

Docker & Docker Compose

Jest (testes unitários)

Supertest (opcional)

Docker e Docker Compose

MongoDB (opcional, caso rode localmente sem Docker)

2. Rodando com Docker (RECOMENDADO)

docker-compose up --build

Acesse a interface GraphQL:
http://localhost:4000/graphql

Nota:
No Ubuntu 24.04, a instalação local do MongoDB não é suportada oficialmente.
Recomendo fortemente rodar via Docker, que funcionará em qualquer sistema.

3. Rodando localmente SEM Docker
   Instale o MongoDB localmente (verifique se está disponível para seu sistema).

No Ubuntu 22.04/20.04, Mac e Windows funciona normalmente.

No Ubuntu 24.04, utilize preferencialmente Docker.

Instale as dependências:

npm install

Execute a aplicação:

npm run dev

🧪 Rodando os Testes

npm test

Testes cobrem todos os fluxos principais:
Criação de conta, consulta de saldo, depósito, saque e tratamento de erros.

Cobertura de código: acima de 90%.

🔥 Exemplos de Uso (GraphQL)

1. Criar uma conta

mutation {
criarConta(conta: 54321, saldo: 200) {
conta
saldo
}
} 2. Depositar valor

mutation {
depositar(conta: 54321, valor: 100) {
conta
saldo
}
} 3. Sacar valor

mutation {
sacar(conta: 54321, valor: 50) {
conta
saldo
}
} 4. Consultar saldo

query {
saldo(conta: 54321)
}

📦 Variáveis e Endpoints

GraphQL Endpoint:

http://localhost:4000/graphql

MongoDB:

mongodb://localhost:27017/bank

📝 Observações Importantes
Caso utilize Ubuntu 24.04, só é possível rodar o MongoDB facilmente via Docker.

Se tiver dificuldades para rodar localmente, basta subir o projeto com Docker Compose.

👤 Autor

Paulo Marsiglia

LinkedIn

Contato: pmarsiglia93@gmail.com
