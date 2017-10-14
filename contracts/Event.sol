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
    createTickets(_identifiers, _prices);
  }

  function createTickets(uint[10] _identifiers, uint[10] _prices) {
    for (uint i = 0; i < 10; i++) {
      uint identifier = _identifiers[i];
      uint price = _prices[i];
      tickets[i] = Ticket(address(0), identifier, price);
    }
  }

  function getTickets() public returns (uint[], uint[]) {
    uint[] memory identifiers = new uint[](10);
    uint[] memory prices = new uint[](10);

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

  // onlyTicketOwner
  function refundTicket() public {
  }

  // onlyTicketOwner
  function transferTicket() payable {
  }

  // onlyOwner
  function cancelEvent() public {
  }

  // onlyOwner
  function disable() public {
  }
}
