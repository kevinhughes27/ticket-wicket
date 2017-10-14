var Event = artifacts.require("./Event.sol");

module.exports = function(deployer) {
  var numTickets = 20;
  var identifiers = [];
  var prices = [];

  for (let i = 0; i < numTickets; i++) {
    identifiers.push(i);
    prices.push(2000);
  }

  deployer.deploy(Event, numTickets, identifiers, prices);
};
