const { gql } = require('apollo-server-express');

module.exports = gql`
  type Conta {
    conta: Int!
    saldo: Float!
  }

  type Query {
    saldo(conta: Int!): Float!
    contas: [Conta!]!
  }

  type Mutation {
    sacar(conta: Int!, valor: Float!): Conta
    depositar(conta: Int!, valor: Float!): Conta
    criarConta(conta: Int!, saldo: Float!): Conta
  }
`;
