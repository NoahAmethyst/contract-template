# Simple Solidity contract develop template project

## integrate with Hardhat

---
To try the project first

````
yarn install
````

use hardhat to compile the contract

```
hardhat compile
```

use hardhat to test the contract

```angular2html
hardhat test
```

also can test specific contract

```angular2html
hardhat test test/
<filename>
```

use hardhat to deploy the contract in hardhat

```angular2html
hardhat deploy
```

if you want to deploy in specific network and account then use

```angular2html
export PK=
<your_privatekey>
    hardhat deploy --network
    <networkname>
```

please noted that if [hardhat.config.ts](hardhat.config.ts) don't have the network configured you should add it

here the supported net

```
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
```

# contract-template
