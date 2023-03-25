import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import { HardhatUserConfig } from 'hardhat/config'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-etherscan'

import 'solidity-coverage'

import * as fs from 'fs'
import { HttpNetworkUserConfig } from 'hardhat/types'

const mnemonicFileName = process.env.MNEMONIC_FILE ?? `${process.env.HOME}/.secret/testnet-mnemonic.txt`
const sharedNetworkConfig: HttpNetworkUserConfig = {}
let mnemonic = 'test '.repeat(11) + 'junk'
let initialBaseFeePerGas: number | undefined
if (fs.existsSync(mnemonicFileName)) {
  mnemonic = fs.readFileSync(mnemonicFileName, 'ascii')
}

const {
  INFURA_KEY,
  MNEMONIC,
  PK,
  REPORT_GAS,
  MOCHA_CONF,
  NODE_URL
} =
  process.env

const privateKey = PK

if (PK != null) {
  sharedNetworkConfig.accounts = [PK ?? privateKey]
}

function getNetwork1 (url: string): { url: string, accounts: { mnemonic: string } } {
  return {
    url,
    accounts: { mnemonic }
  }
}

function getNetwork (name: string): { url: string, accounts: { mnemonic: string } } {
  return getNetwork1(`https://${name}.infura.io/v3/${process.env.INFURA_ID}`)
  // return getNetwork1(`wss://${name}.infura.io/ws/v3/${process.env.INFURA_ID}`)
}

const optimizedComilerSettings = {
  version: '0.8.17',
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000000
    },
    viaIR: true
  }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: '0.8.15',
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000000
        }
      }
    }],
    overrides: {}
  },
  networks: {
    hardhat: {
      blockGasLimit: 12.5e6,
      initialBaseFeePerGas,
      accounts: {
        count: 130
      }

    },
    polygon: {
      url: 'https://polygon-rpc.com',
      ...sharedNetworkConfig,
      chainId: 137
    },
    bsc: {
      url: 'https://bsc-dataseed1.binance.org',
      ...sharedNetworkConfig,
      chainId: 56
    },
    metis: {
      url: 'https://andromeda.metis.io/?owner=1088',
      ...sharedNetworkConfig,
      chainId: 1088
    },
    klaytn: {
      url: 'https://public-node-api.klaytnapi.com/v1/cypress',
      ...sharedNetworkConfig,
      chainId: 8217
    },
    okc: {
      url: 'https://exchainrpc.okex.org',
      ...sharedNetworkConfig,
      chainId: 66
    },
    evmos: {
      url: 'https://eth.bd.evmos.org:8545',
      ...sharedNetworkConfig,
      chainId: 9001
    },
    cronos: {
      url: 'https://evm.cronos.org',
      ...sharedNetworkConfig,
      chainId: 25
    },
    aurora: {
      url: 'https://mainnet.aurora.dev',
      ...sharedNetworkConfig,
      chainId: 1313161554
    },
  },
  mocha: {
    timeout: 10000
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }

}

// coverage chokes on the "compilers" settings
if (process.env.COVERAGE != null) {
  // @ts-ignore
  config.solidity = config.solidity.compilers[0]
}

export default config
