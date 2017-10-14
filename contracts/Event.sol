pragma solidity ^0.4.4;

contract Event {
  address owner;
  int16[10] public availableTickets;

  function Event(int16[10] _availableTickets) {
    owner = msg.sender;
    availableTickets = _availableTickets;
  }

  function purchaseTicket() payable {
  }

  function getArray() public returns (int16[10]) {
    return testArray;
  }
}
