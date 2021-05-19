const Token = artifacts.require('Token');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('YDToken', ([owner, anotherAccount]) => {
  let token

  const name_ = 'YD Token';
  const symbol_ = 'YDT';
  const maxTotalSupply_=1000

  beforeEach(async function () {
    token = await Token.new(name_, symbol_,maxTotalSupply_);
  });

  describe('token attributes', function() {
    it('has the correct name', async function() {
      const name = await token.name();
      name.should.equal(name_);
    });

    it('has the correct symbol', async function() {
      const symbol = await token.symbol();
      symbol.should.equal(symbol_);
    });

    it('has the correct maxTotalSupply', async function() {
      const maxTotalSupply = await token.maxTotalSupply();
      maxTotalSupply.toNumber().should.equal(maxTotalSupply_);
    });

  });

  describe('Mint', function() {
    const amount = 100
    it('mints the requested amount', async function () {
      await token.mint(owner, amount, { from:owner });

      const balance = await token.balanceOf(owner);
      assert.equal(balance, amount);
    });

    it('mints the more than the maxTotalSupply', async function () {
      await token.mint(owner, amount+901, { from:owner }).should.be.rejectedWith("Above maxTotalSupply limit!");
    });

  });
});