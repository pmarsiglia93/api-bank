const mongoose = require('mongoose');
const Conta = require('../src/models/Conta');
const resolvers = require('../src/resolvers');

// Antes de tudo, conecta no Mongo
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/bank');
});

// Limpa as contas antes de cada teste
beforeEach(async () => {
  await Conta.deleteMany({});
});

// Fecha conexão ao fim dos testes
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Banco digital - GraphQL', () => {
  it('Deve criar uma conta', async () => {
    const conta = await resolvers.Mutation.criarConta(null, { conta: 54321, saldo: 160 });
    expect(conta.conta).toBe(54321);
    expect(conta.saldo).toBe(160);
  });

  it('Deve consultar o saldo de uma conta', async () => {
    // Cria conta primeiro!
    await resolvers.Mutation.criarConta(null, { conta: 54321, saldo: 160 });
    const saldo = await resolvers.Query.saldo(null, { conta: 54321 });
    expect(saldo).toBe(160);
  });

  it('Deve depositar valor na conta', async () => {
    await resolvers.Mutation.criarConta(null, { conta: 54321, saldo: 160 });
    const conta = await resolvers.Mutation.depositar(null, { conta: 54321, valor: 40 });
    expect(conta.saldo).toBe(200);
  });

  it('Deve sacar valor da conta', async () => {
    await resolvers.Mutation.criarConta(null, { conta: 54321, saldo: 200 });
    const conta = await resolvers.Mutation.sacar(null, { conta: 54321, valor: 50 });
    expect(conta.saldo).toBe(150);
  });

  it('Deve retornar erro ao sacar sem saldo', async () => {
    await resolvers.Mutation.criarConta(null, { conta: 54321, saldo: 50 });
    // Captura o erro
    await expect(
      resolvers.Mutation.sacar(null, { conta: 54321, valor: 10000 })
    ).rejects.toThrow('Saldo insuficiente.');
  });

  it('Deve retornar erro ao consultar saldo de conta inexistente', async () => {
    await expect(
      resolvers.Query.saldo(null, { conta: 99999 })
    ).rejects.toThrow('Conta não encontrada');
  });

  it('Deve retornar erro ao depositar em conta inexistente', async () => {
    await expect(
      resolvers.Mutation.depositar(null, { conta: 99999, valor: 50 })
    ).rejects.toThrow('Conta não encontrada');
  });

  it('Deve retornar erro ao criar conta duplicada', async () => {
    await resolvers.Mutation.criarConta(null, { conta: 77777, saldo: 10 });
    await expect(
      resolvers.Mutation.criarConta(null, { conta: 77777, saldo: 100 })
    ).rejects.toThrow('Conta já existe');
  });
});
