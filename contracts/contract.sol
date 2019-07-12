pragma solidity >= 0.5.0;

contract Escrow {
    
    address payable sender;
    address payable reciver;
    
    modifier isSender(){
        require(msg.sender == sender);
        _;
    }
    constructor(address payable _reciver) public  payable {
        sender = msg.sender;
        reciver = _reciver;
    }
    
    function payToUser() public isSender payable {
        reciver.transfer(address(this).balance);
    }
    
    function refundToHouse() public  isSender payable {
        sender.transfer(address(this).balance);
    }
}