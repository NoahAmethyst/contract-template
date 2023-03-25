import { expect } from 'chai'
import { ethers, waffle } from 'hardhat'
import { AirDropper, StandardERC20 } from '../typechain'

describe('util test', () => {
  const [deployer, owner, ...solvers] = waffle.provider.getWallets()
  console.log('current deployer is ', deployer.address)
  console.log('current owner is ', owner.address)

  let tokenContract: StandardERC20
  let airdropContract: AirDropper
  const zeroAddr = '0x0000000000000000000000000000000000000000'

  beforeEach(async () => {
    const tokenSolidity = await ethers.getContractFactory(
      'StandardERC20',
      owner
    )

    tokenContract = await tokenSolidity.deploy('TestT', 'TT')

    const airdropSolidity = await ethers.getContractFactory(
      'AirDropper',
      owner
    )

    airdropContract = await airdropSolidity.deploy(
    )

    await tokenContract.connect(owner).mint(owner.address, 100000000)
  })

  describe('airdrop', () => {
    it('air drop erc20', async () => {
      await tokenContract.connect(owner).approve(airdropContract.address, 100000000)

      const receivers = []
      for (let i = 1; i < 50; i++) {
        receivers.push(solvers[i].address)
      }

      const amounts = []
      for (let i = 1; i < 50; i++) {
        amounts.push(i * 10)
      }

      const result = await airdropContract.connect(owner).airdrop(tokenContract.address, receivers, amounts)
      const txn = await result.wait()
      expect(txn.blockNumber).to.be.greaterThan(0)

      for (let i = 1; i < 50; i++) {
        const balance = await tokenContract.balanceOf(solvers[i].address)
        console.log('account %s balance %s', solvers[i].address, balance.toString())
      }
    })

    it('air drop eth', async () => {
      const receivers = []
      for (let i = 1; i < 50; i++) {
        receivers.push(solvers[i].address)
      }

      const amounts = []
      for (let i = 1; i < 50; i++) {
        amounts.push(ethers.utils.parseEther('1'))
      }

      const ethBalance = await owner.provider.getBalance(owner.address)
      console.log('before airdrop  balance %s', ethBalance.toString())

      const result = await airdropContract.connect(owner).airdrop(zeroAddr, receivers, amounts, { value: ethers.utils.parseEther('20') })
      const txn = await result.wait()
      expect(txn.blockNumber).to.be.greaterThan(0)

      for (let i = 1; i < 50; i++) {
        const ethBalance = await owner.provider.getBalance(solvers[i].address)
        console.log('account %s balance %s', solvers[i].address, ethBalance.toString())
      }
    })
  })
})
