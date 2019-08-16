const Sequelize = require('sequelize')

function generate(sequelize) {
  let FGC20 = sequelize.define('fgc20', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    name: Sequelize.BLOB,
    symbol: Sequelize.BLOB,
    decimals: Sequelize.INTEGER(3).UNSIGNED,
    totalSupply: {
      type: Sequelize.CHAR(32).BINARY,
      get() {
        let totalSupply = this.getDataValue('totalSupply')
        return totalSupply == null ? null : BigInt(`0x${totalSupply.toString('hex')}`)
      },
      set(totalSupply) {
        if (totalSupply != null) {
          this.setDataValue(
            'totalSupply',
            Buffer.from(totalSupply.toString(16).padStart(64, '0'), 'hex')
          )
        }
      }
    },
    version: {
      type: Sequelize.BLOB,
      allowNull: true
    }
  }, {freezeTableName: true, underscored: true, timestamps: false})

  let FGC20Balance = sequelize.define('fgc20_balance', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    address: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    balance: {
      type: Sequelize.CHAR(32).BINARY,
      get() {
        let balance = this.getDataValue('balance')
        return balance == null ? null : BigInt(`0x${balance.toString('hex')}`)
      },
      set(balance) {
        if (balance != null) {
          this.setDataValue(
            'balance',
            Buffer.from(balance.toString(16).padStart(64, '0'), 'hex')
          )
        }
      }
    }
  }, {freezeTableName: true, underscored: true, timestamps: false})

  let Fgc721 = sequelize.define('fgc721', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    name: Sequelize.BLOB,
    symbol: Sequelize.BLOB,
    totalSupply: {
      type: Sequelize.CHAR(32).BINARY,
      get() {
        let totalSupply = this.getDataValue('totalSupply')
        return totalSupply == null ? null : BigInt(`0x${totalSupply.toString('hex')}`)
      },
      set(totalSupply) {
        if (totalSupply != null) {
          this.setDataValue(
            'totalSupply',
            Buffer.from(totalSupply.toString(16).padStart(64, '0'), 'hex')
          )
        }
      }
    }
  }, {freezeTableName: true, underscored: true, timestamps: false})

  let FGC721Token = sequelize.define('fgc721_token', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    tokenId: {
      type: Sequelize.CHAR(32).BINARY,
      primaryKey: true
    },
    holder: Sequelize.CHAR(20).BINARY
  }, {freezeTableName: true, underscored: true, timestamps: false})

  sequelize.models.contract.hasOne(FGC20, {as: 'fgc20', foreignKey: 'contractAddress'})
  FGC20.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
  sequelize.models.contract.hasMany(FGC20Balance, {as: 'fgc20Balances', foreignKey: 'contractAddress'})
  FGC20Balance.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
  sequelize.models.contract.hasOne(Fgc721, {as: 'fgc721', foreignKey: 'contractAddress'})
  Fgc721.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
  sequelize.models.contract.hasMany(FGC721Token, {as: 'fgc721Tokens', foreignKey: 'contractAddress'})
  FGC721Token.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
}

module.exports = generate
