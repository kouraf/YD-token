const Token = artifacts.require("Token");


module.exports = async function (deployer) {
    const name_ = "YD Token";
    const symbol_ = "YDT";
    const maxTotalSupply_=1000
  
    await deployer.deploy(Token, name_, symbol_,maxTotalSupply_);

};