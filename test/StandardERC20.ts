import { Contract, Wallet } from 'ethers'
import { ethers, waffle } from 'hardhat'
import { expect } from 'chai'
import { parseEther } from 'ethers/lib/utils'

describe('StandardERC20', function () {
  const [deployer, owner, nonSolver, ...solvers] = waffle.provider.getWallets()

  let tokenContract: Contract

  console.log('current owner is ', owner.address)

  beforeEach(async () => {
    const tokenSolidity = await ethers.getContractFactory(
      'StandardERC20',
      owner
    )

    tokenContract = await tokenSolidity.deploy('Funny', 'FUN')
  })

  describe('mint test', () => {
    it('owner mint', async () => {
      const receiver = solvers[0]
      const amount = ethers.utils.parseEther('1')

      const result = await tokenContract.connect(owner).mint(receiver.address, amount)
      const txn = await result.wait()
      expect(txn.blockNumber).to.be.greaterThan(0)

      const balance = await tokenContract.balanceOf(receiver.address)
      console.log('account %s balance %s', receiver.address, balance.toString())
    })

    it('operator mint', async () => {
      const operator = solvers[1]
      let result = await tokenContract.connect(owner).addOperator(operator.address)
      let txn = await result.wait()
      expect(txn.blockNumber).to.be.greaterThan(0)
      console.log('add operator %s', operator.address)

      const receiver = solvers[0]
      const amount = ethers.utils.parseEther('1')

      result = await tokenContract.connect(operator).mint(receiver.address, amount)
      txn = await result.wait()
      expect(txn.blockNumber).to.be.greaterThan(0)

      const balance = await tokenContract.balanceOf(receiver.address)
      console.log('account %s balance %s', receiver.address, balance.toString())
    })

    it('not permitted mint', async () => {
      const receiver = solvers[0]
      const amount = ethers.utils.parseEther('1')

      const result = await tokenContract.connect(receiver).mint(receiver.address, amount)
      const txn = await result.wait()
      expect(txn.blockNumber).to.be.greaterThan(0)

      const balance = await tokenContract.balanceOf(receiver.address)
      console.log('account %s balance %s', receiver.address, balance.toString())
    })
  })
})
