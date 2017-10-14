pragma solidity ^0.4.4;

contract Event {
  address owner;

  struct Ticket {
    address owner;
    uint identifier;
    uint price;
  }

  Ticket[10] public tickets;

  function Event(uint[10] _identifiers, uint[10] _prices) {
    owner = msg.sender;

    for (uint i = 0; i < 10; i++) {
      uint identifier = _identifiers[i];
      uint price = _prices[i];
      tickets[i] = Ticket(address(0), identifier, price);
    }
  }

  function getTicket(uint ticketID) public returns (uint, uint) {
    return (tickets[ticketID].identifier, tickets[ticketID].price);
  }

  function purchaseTicket() payable {
  }
}
