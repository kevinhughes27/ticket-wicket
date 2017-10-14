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

  function getTickets() public returns (uint[10], uint[10]) {
    uint[10] memory identifiers;
    uint[10] memory prices;

    for (uint i = 0; i < 10; i++) {
      identifiers[i] = tickets[i].identifier;
      prices[i] = tickets[i].price;
    }

    return (identifiers, prices);
  }

  function getTicket(uint ticketID) public returns (uint, uint) {
    return (tickets[ticketID].identifier, tickets[ticketID].price);
  }

  function purchaseTicket() payable {
  }
}
