import {Address} from 'fantasygoldinfo-lib'

export default class MiscController {
  constructor(node) {
    this.node = node
    this._client = this.node.getRpcClient()
  }

  async info(ctx) {
    let {height} = this.node.getBlockTip()
    if (this.node.chain.name === 'regtest') {
      ctx.body = height * 20000
      return
    }
    let supply //edit these muners for our chain
    if (height <= 8800) {
      supply = height * 20000
    } else {
      supply = 1.76e8
      let reward = 5
      let interval = 985500
      let stakeHeight = height - 8800
      let halvings = 0
      while (halvings < 7 && stakeHeight > interval) {
        supply += interval * (reward >> halvings++)
        stakeHeight -= interval
      }
      supply += stakeHeight * (reward >> halvings)
    }
    let netStakeWeight
    try {
      netStakeWeight = (await this._client.getstakinginfo()).netstakeweight
    } catch (err) {}
    let feeRate
    try {
      feeRate = (await this._client.estimatesmartfee(6)).feerate
    } catch (err) {
      try {
        feeRate = await this._client.estimatefee()
      } catch (err) {}
    }
    ctx.body = {
      height,
      supply,
      circulatingSupply: this.node.chain.name === 'mainnet' ? supply - 12e6 : supply,
      netStakeWeight,
      feeRate
    }
  }

  async supply(ctx) {
    let {height} = this.node.getBlockTip()
    if (this.node.chain.name === 'regtest' || height <= 8800) {
      ctx.body = height * 20000
    } else {
      let supply = 1.76e8
      let reward = 5
      let interval = 985500
      let stakeHeight = height - 8800
      let halvings = 0
      while (halvings < 7 && stakeHeight > interval) {
        supply += interval * (reward >> halvings++)
        stakeHeight -= interval
      }
      ctx.body = supply + stakeHeight * (reward >> halvings)
    }
  }

  async circulatingSupply(ctx) {
    let {height} = this.node.getBlockTip()
    if (this.node.chain.name === 'regtest' || height <= 8800) {
      ctx.body = this.node.chain.name === 'mainnet' ? height * 20000 - 12,000,000 : height * 20000
    } else {
      let supply = 1.76e8
      let reward = 5
      let interval = 985500
      let stakeHeight = height - 8800
      let halvings = 0
      while (halvings < 7 && stakeHeight > interval) {
        supply += interval * (reward >> halvings++)
        stakeHeight -= interval
      }
      supply += stakeHeight * (reward >>> halvings)
      ctx.body = this.node.chain.name === 'mainnet' ? supply - 12e6 : supply
    }
  }

  async classify(ctx) {
    let id = ctx.params.id
    if (/^(0|[1-9]\d{0,9})$/.test(id)) {
      let height = Number.parseInt(id)
      if (height <= this.node.getBlockTip().height) {
        ctx.body = {type: 'block'}
        return
      }
    } else if (/^[0-9a-f]{40}$/.test(id)) {
      if (await this.node.getContract(Buffer.from(id, 'hex'))) {
        ctx.body = {type: 'contract'}
        return
      }
    } else if (/^[0-9a-f]{64}$/.test(id)) {
      if (await this.node.getBlock(Buffer.from(id, 'hex'))) {
        ctx.body = {type: 'block'}
        return
      } else if (await this.node.getTransaction(Buffer.from(id, 'hex'))) {
        ctx.body = {type: 'transaction'}
        return
      }
    }
    let address = Address.fromString(id, this.node.chain)
    if (address) {
      ctx.body = {type: 'address'}
      return
    }
    let [token] = await this.node.searchFGC20Token(id)
    if (token) {
      ctx.body = {type: 'contract', id: token.address.toString('hex')}
      return
    }
    ctx.throw(404)
  }

  async richList(ctx) {
    let {totalCount, list} = await this.node.getRichList(ctx.state.pagination)
    ctx.body = {
      totalCount,
      list: list.map(({address, balance}) => ({
        address: address.toString(),
        balance: balance.toString()
      }))
    }
  }

  async biggestMiners(ctx) {
    let {totalCount, list} = await this.node.getBiggestMiners(ctx.state.pagination)
    ctx.body = {
      totalCount,
      list: list.map(({address, blocks, balance}) => ({
        address: address.toString(),
        blocks,
        balance: balance.toString()
      }))
    }
  }
}
