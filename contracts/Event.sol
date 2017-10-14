pragma solidity ^0.4.4;

contract Event {
  int16[10] public testArray;

  function Event(int16[10] _initArray) {
    testArray = _initArray;
  }
}
