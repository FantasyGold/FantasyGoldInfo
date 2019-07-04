import * as FantasyGoldinfoAPI from '@/services/fantasygoldinfo-api'

class Contract {
  static get(id, options = {}) {
    return FantasyGoldinfoAPI.get(`/contract/${id}`, options)
  }

  static getUtxo(id, options = {}) {
    return FantasyGoldinfoAPI.get(`/contract/${id}/utxo`, options)
  }

  static getTransactions(id, {page, pageSize}, options = {}) {
    return FantasyGoldinfoAPI.get(`/contract/${id}/txs`, {params: {page, pageSize}, ...options})
  }

  static listTokens({page, pageSize}, options = {}) {
    return FantasyGoldinfoAPI.get(`/contract/fgc20-tokens`, {params: {page, pageSize}, ...options})
  }

  static richList(id, {page, pageSize}, options = {}) {
    return FantasyGoldinfoAPI.get(`/contract/${id}/rich-list`, {params: {page, pageSize}, ...options})
  }
}

export default Contract
