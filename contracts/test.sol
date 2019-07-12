pragma solidity >=0.5.0;
contract Ballot {
    
    uint bank;
    uint receiv;
    
    function setAmount() payable public returns(bool) {
        bank += msg.value;
    }
    
    function subtractAmount() payable public returns(bool) {
        bank -= msg.value;
        receiv += msg.value;
    }
    
    function getAmount() public view returns(uint, uint, uint) {
        return (bank, receiv, address(this).balance);
    }
}
