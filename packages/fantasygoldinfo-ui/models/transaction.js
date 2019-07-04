import * as FantasyGoldinfoAPI from '@/services/fantasygoldinfo-api'

class Transaction {
  static get(id, options = {}) {
    if (Array.isArray(id)) {
      if (id.length === 0) {
        return []
      } else {
        return FantasyGoldinfoAPI.get('/txs/' + id.join(','), options)
      }
    } else {
      return FantasyGoldinfoAPI.get(`/tx/${id}`, options)
    }
  }

  static getBrief(id, options = {}) {
    if (Array.isArray(id)) {
      if (id.length === 0) {
        return []
      } else {
        return FantasyGoldinfoAPI.get('/txs/' + id.join(','), {params: {brief: ''}, ...options})
      }
    } else {
      return FantasyGoldinfoAPI.get(`/tx/${id}`, {params: {brief: ''}, ...options})
    }
  }

  static getRecentTransactions(options = {}) {
    return FantasyGoldinfoAPI.get('/recent-txs', options)
  }
}

export default Transaction
