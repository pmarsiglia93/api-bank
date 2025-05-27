const Conta = require('./models/Conta');

module.exports = {
  Query: {
    // Consulta saldo da conta
    saldo: async (_, { conta }) => {
      const c = await Conta.findOne({ conta });
      if (!c) throw new Error('Conta não encontrada');
      return c.saldo;
    },
    contas: async () => {   // <-- Adicione este resolver!
      return await Conta.find();
    },
  },
  Mutation: {
    // Saca valor da conta, se houver saldo
    sacar: async (_, { conta, valor }) => {
      const c = await Conta.findOne({ conta });
      if (!c) throw new Error('Conta não encontrada');
      if (valor <= 0) throw new Error('Valor inválido.');
      if (c.saldo < valor) throw new Error('Saldo insuficiente.');
      c.saldo -= valor;
      await c.save();
      return c;
    },

    // Deposita valor na conta
    depositar: async (_, { conta, valor }) => {
      const c = await Conta.findOne({ conta });
      if (!c) throw new Error('Conta não encontrada');
      if (valor <= 0) throw new Error('Valor inválido.');
      c.saldo += valor;
      await c.save();
      return c;
    },

    criarConta: async (_, { conta, saldo }) => {
        let c = await Conta.findOne({ conta });
        if (c) throw new Error('Conta já existe');
        c = new Conta({ conta, saldo });
        await c.save();
        return c;
    },

  },
};
