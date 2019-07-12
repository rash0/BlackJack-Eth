
pragma solidity >= 0.5.0;

contract test3 {
    
    uint result;
    
    uint housePoints;
    uint playerPoints;
    
    address payable houseAddress;
    address payable playerAddress;
    
    uint houseAmount;
    uint playerAmount;
    
    modifier isHouse(){
        require(msg.sender == houseAddress, "sorry! you are not the house!");
        _;
    }
    
    modifier isPlayer(){
        require(msg.sender == playerAddress, "Sorry! you are not the player!");
        _;
    }
    
    constructor(address payable _playerAddress) payable public{
        houseAddress = msg.sender;
        houseAmount = msg.value;
        playerAddress = _playerAddress;
    }
    
    function setPoints(uint _housePoints, uint _playerPoints) public isHouse {
        housePoints = _housePoints;
        playerPoints = _playerPoints;
    }
    
    function setPlayerEtherValue() public isPlayer payable {
        playerAmount = msg.value;
    }
    
    function judge() public isHouse {
        // due to solididty complicated relationship with string
        // so i used number instead of string
        // 0 = 'tie'
        // 1 = 'house' wins
        // 2 = 'player' wins
        if (housePoints == playerPoints){
            result = 0;
        }if(housePoints > playerPoints){
            result = 1;
        }if (housePoints < playerPoints){
            result = 2;
        }if(playerPoints > 21){
            result = 1;
        }if(housePoints > 21){
            result = 2;
        }
        return result;
    }
    
    function payMent() public isHouse payable {
        if(result == 0){
            houseAddress.transfer(houseAmount);
            playerAddress.transfer(playerAmount);
        }if(result == 1){
            houseAddress.transfer(houseAmount + playerAmount);
        }if(result == 2){
            playerAddress.transfer(houseAmount + playerAmount);
        }
    }
}