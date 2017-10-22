pragma solidity ^0.4.2;

library DMSLibrary {
  struct data {
    address beneficiary;
    bytes32 data;
    bool isValue;
    uint32 time_left;
   }
}

contract DMSContract {

  using DMSLibrary for DMSLibrary.data;
  mapping (address => DMSLibrary.data) DMS_data;

  function DMSContract()
  {

  }

  function CreateDMSContract(address beneficiary, bytes32 data) returns(bool) {
    if( DMS_data[msg.sender].isValue) throw; // already exists

    DMS_data[msg.sender].isValue = true;
    DMS_data[msg.sender].beneficiary = beneficiary;
    DMS_data[msg.sender].data = data;
    DMS_data[msg.sender].time_left = 30;
  }

  function kick()
  {
    if( !DMS_data[msg.sender].isValue) throw; // does not exist  

    DMS_data[msg.sender].time_left = 30;
  }

  function tick()
  {
    if( !DMS_data[msg.sender].isValue) throw; // does not exist

    DMS_data[msg.sender].time_left = DMS_data[msg.sender].time_left - 1;
  }

  function getTimeLeft() returns(uint32 return_time) {
    if( !DMS_data[msg.sender].isValue) throw; // does not exist

    return DMS_data[msg.sender].time_left;
  }

}
