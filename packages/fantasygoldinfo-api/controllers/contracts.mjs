import {Address} from 'fantasygoldinfo-lib'

export default class ContractsController {
  constructor(node) {
    this.node = node
  }

  async contract(ctx, next) {
    let address = ctx.params.contract
    if (!/^[0-9a-f]{40}$/.test(address)) {
      ctx.throw(400)
    }
    let contract = await this.node.getContract(Buffer.from(address, 'hex'))
    if (contract) {
      ctx.state.contract = contract
      await next()
    } else {
      ctx.throw(404)
    }
  }

  async show(ctx) {
    let contract = ctx.state.contract
    if (contract.fgc20) {
      contract.fgc20.holders = await this.node.getFGC20TokenHolders(contract.address)
    }
    let summary = await this.node.getContractSummary(contract.address)
    let fgc20TokenBalances = await this.node.getAllFGC20TokenBalances(
      new Address({type: Address.CONTRACT, data: contract.address, chain: this.node.chain, vm: 'evm'})
    )
    ctx.body = {
      address: contract.address.toString('hex'),
      owner: contract.owner && contract.owner.toString(),
      createTransactionId: contract.createTransactionId && contract.createTransactionId.toString('hex'),
      createHeight: contract.createHeight,
      type: contract.type,
      ...contract.fgc20
        ? {
          fgc20: {
            name: contract.fgc20.name,
            symbol: contract.fgc20.symbol,
            decimals: contract.fgc20.decimals,
            totalSupply: contract.fgc20.totalSupply == null ? null : contract.fgc20.totalSupply.toString(),
            version: contract.fgc20.version,
            holders: contract.fgc20.holders
          }
        }
        : {},
      ...contract.fgc721
        ? {
          fgc721: {
            name: contract.fgc721.name,
            symbol: contract.fgc721.symbol,
            totalSupply: contract.fgc721.totalSupply == null ? null : contract.fgc721.totalSupply.toString()
          }
        }
        : {},
      balance: summary.balance.toString(),
      totalReceived: summary.totalReceived.toString(),
      totalSent: summary.totalSent.toString(),
      fgc20TokenBalances: fgc20TokenBalances.map(token => ({
        address: token.address.toString('hex'),
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        totalSupply: token.totalSupply == null ? null : token.totalSupply.toString(),
        balance: token.balance.toString()
      })),
      totalCount: summary.totalCount
    }
  }

  async transactions(ctx) {
    let result = await this.node.getContractHistory(ctx.state.contract.address, ctx.state.pagination)
    ctx.body = {
      totalCount: result.totalCount,
      transactions: result.transactions.map(id => id.toString('hex'))
    }
  }

  async fgc20Tokens(ctx) {
    let result = await this.node.listFGC20Tokens(ctx.state.pagination)
    ctx.body = {
      totalCount: result.totalCount,
      tokens: result.tokens.map(token => ({
        address: token.address.toString('hex'),
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        totalSupply: token.totalSupply == null ? null : token.totalSupply.toString(),
        holders: token.holders
      }))
    }
  }

  async richList(ctx) {
    let result = await this.node.getFGC20TokenRichList(ctx.state.contract.address, ctx.state.pagination)
    ctx.body = {
      totalCount: result.totalCount,
      list: result.list.map(({address, balance}) => ({
        address: address.toString(),
        balance: balance.toString()
      }))
    }
  }
}
