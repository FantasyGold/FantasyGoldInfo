import * as FantasyGoldinfoAPI from '@/services/fantasygoldinfo-api'

class Misc {
  static info(options = {}) {
    return FantasyGoldinfoAPI.get('/info', options)
  }

  static dailyTransactions(options = {}) {
    return FantasyGoldinfoAPI.get('/stats/daily-transactions', options)
  }

  static blockInterval(options = {}) {
    return FantasyGoldinfoAPI.get('/stats/block-interval', options)
  }

  static coinstake(options = {}) {
    return FantasyGoldinfoAPI.get('/stats/coinstake', options)
  }

  static addressGrowth(options = {}) {
    return FantasyGoldinfoAPI.get('/stats/address-growth', options)
  }

  static richList({from, to}, options = {}) {
    return FantasyGoldinfoAPI.get(`/misc/rich-list`, {params: {page: from / (to - from), pageSize: to - from}, ...options})
  }

  static biggestMiners({from, to}, options = {}) {
    return FantasyGoldinfoAPI.get(`/misc/biggest-miners`, {params: {page: from / (to - from), pageSize: to - from}, ...options})
  }
}

export default Misc
