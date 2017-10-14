pragma solidity ^0.4.4;

contract Event {
  address owner;

  struct Ticket {
    address owner;
    string ownerHash;
    uint identifier;
    uint256 price;
  }

  uint public numTickets;
  Ticket[] tickets;

  function Event(uint _numTickets, uint[] _identifiers, uint[] _prices) {
    owner = msg.sender;
    createTickets(_numTickets, _identifiers, _prices);
  }

  function createTickets(uint _numTickets, uint[] _identifiers, uint[] _prices) {
    numTickets = _numTickets;
    tickets.length = numTickets;

    for (uint i = 0; i < numTickets; i++) {
      uint identifier = _identifiers[i];
      uint price = _prices[i];
      tickets[i] = Ticket(address(0), "", identifier, price);
    }
  }

  function getTickets() public returns (uint[], uint[]) {
    uint[] memory identifiers = new uint[](numTickets);
    uint[] memory prices = new uint[](numTickets);

    for (uint i = 0; i < numTickets; i++) {
      identifiers[i] = tickets[i].identifier;
      prices[i] = tickets[i].price;
    }

    return (identifiers, prices);
  }

  function getTicket(uint ticketID) public returns (uint, uint) {
    return (tickets[ticketID].identifier, tickets[ticketID].price);
  }

  function purchaseTicket(uint ticketID, string hash) payable {
    require(msg.value >= tickets[ticketID].price);
    require(sha3(tickets[ticketID].ownerHash) == sha3("")); // seriously?

    tickets[ticketID].owner = msg.sender;
    tickets[ticketID].ownerHash = hash;
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
