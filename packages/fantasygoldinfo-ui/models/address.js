import * as FantasyGoldinfoAPI from '@/services/fantasygoldinfo-api'

class Address {
  static get(id, options = {}) {
    return FantasyGoldinfoAPI.get(`/address/${id}`, options)
  }

  static getBalance(id, options = {}) {
    return FantasyGoldinfoAPI.get(`/address/${id}/balance`, options)
  }

  static getUtxo(id, options = {}) {
    return FantasyGoldinfoAPI.get(`/address/${id}/utxo`, options)
  }

  static getTransactions(id, {page, pageSize}, options = {}) {
    return FantasyGoldinfoAPI.get(`/address/${id}/txs`, {params: {page, pageSize}, ...options})
  }

  static getBalanceTransactions(id, {page, pageSize}, options = {}) {
    return FantasyGoldinfoAPI.get(`/address/${id}/balance-history`, {params: {page, pageSize}, ...options})
  }

  static getTokenBalanceTransactions(id, {tokens, page, pageSize}, options = {}) {
    return FantasyGoldinfoAPI.get(`/address/${id}/fgc20-balance-history`, {params: {tokens, page, pageSize}, ...options})
  }
}

export default Address
