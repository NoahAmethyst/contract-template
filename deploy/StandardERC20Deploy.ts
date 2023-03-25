import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deployStandardERC20: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()

  console.log('==start deploy at %s', hre.deployments.getNetworkName())

  const _name = 'FUNNY'
  const _symbol = 'FUN'

  const ret = await hre.deployments.deploy(
    'StandardERC20', {
      from,
      args: [_name, _symbol],
      gasLimit: 6e6,
      deterministicDeployment: true
    })
  console.log('==StandardERC20 addr=', ret.address)

  const standardERC20Contract = await hre.ethers.getContractAt('StandardERC20', ret.address)
  const name = await standardERC20Contract.name()
  const symbol = await standardERC20Contract.symbol()
  const totalSupply = await standardERC20Contract.totalSupply()

  console.log('name:%s symbol:%s totalSupply:%s', name, symbol, totalSupply.toString())
}

export default deployStandardERC20
