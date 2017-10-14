var Event = artifacts.require("./Event.sol");

module.exports = function(deployer) {
  var identifiers = [1,2,3,4,5,6,7,8,9,10];
  var prices = [100,100,100,100,100,100,100,100,100,100];
  deployer.deploy(Event, identifiers, prices);
};
