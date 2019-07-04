import mongoose from 'mongoose'

const fgc20TokenBalanceSchema = new mongoose.Schema({
  contract: {
    type: String,
    get: s => Buffer.from(s, 'hex'),
    set: x => x.toString('hex')
  },
  address: {
    type: String,
    index: true,
    get: s => Buffer.from(s, 'hex'),
    set: x => x.toString('hex')
  },
  balance: {
    type: String,
    get: s => BigInt(`0x${s}`),
    set: n => n.toString(16).padStart(64, '0')
  }
})

fgc20TokenBalanceSchema.index({contract: 1, balance: -1})

export default mongoose.model('FGC20TokenBalance', fgc20TokenBalanceSchema)
