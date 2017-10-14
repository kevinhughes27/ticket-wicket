pragma solidity ^0.4.4;

contract Ticket {
  int32 price;
  enum Type { Floor, General, Assigned }
  string identifier;

  function Ticket(string _identifier, int32 _price) {
    identifier = _identifier;
    price = _price;
  }
}

contract Event {
  address owner;
  address[] public availableTickets;
  int32 public eventDate;
  int32 public saleDate;

  modifier onlyOwner {
    if (msg.sender != owner) throw;
    _;
  }

  function Event(address[] _availableTickets, int32 _eventDate, int32 _saleDate) {
    owner = msg.sender;
    availableTickets = _availableTickets;
    eventDate = _eventDate;
    saleDate = _saleDate;
  }

  function purchaseTicket() payable {
  }

  function createTicket(string identifier, int32 price) {
    address newTicket = new Ticket(identifier, price);
    availableTickets.push(newTicket);
  }

  function refundTicket(int16 ticket) {
  }

  function transferTicket(int16 ticket, string newName) {
  }

  function disableEvent() onlyOwner {
  }
}
