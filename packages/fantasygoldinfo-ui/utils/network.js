export default {
  mainnet: {
    pubkey: 0x23,
    pubkeyhash: 0x23,
    scripthash: 0x26,
    witness_v0_keyhash: 'fg',
    witness_v0_scripthash: 'fg'
  },
  testnet: {
    pubkey: 0x5f,
    pubkeyhash: 0x5f,
    scripthash: 0x58,
    witness_v0_keyhash: 'tf',
    witness_v0_scripthash: 'tf'
  }
}[process.env.network || 'mainnet']
