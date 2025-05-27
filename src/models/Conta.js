const mongoose = require('mongoose');
const ContaSchema = new mongoose.Schema({
  conta: { type: Number, required: true, unique: true },
  saldo: { type: Number, required: true, default: 0 }
});
module.exports = mongoose.model('Conta', ContaSchema);
