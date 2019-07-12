
pragma solidity >= 0.5.10;

contract BlackJack {
    
    struct Round{
        uint housePoints;
        uint playerPoints;
        uint winner;
    }
    
    
    struct Game {
        uint playerBetAmount;
        uint houseBetAmount;
        uint[] resultArray;
        mapping(uint => Round) roundStruct;
    }
    
    mapping(address => Game) gameStruct;
    
    address payable houseAddress;
    address payable playerAddress;
    
    modifier isHouse(){
        require(msg.sender == houseAddress, "sorry! you are not the house!");
        _;
    }
    
    // modifier isPlayer(){
    //     require(msg.sender == playerAddress, "Sorry! you are not the player!");
    //     _;
    // }
    
    function _indexOf(uint[] memory self, uint value) private pure returns (uint){
        uint[3] memory tmpArray;
        for (uint i = 0; i < self.length; i++)
            if (self[i] == value) {
                tmpArray[i] = value;
            }
            return tmpArray.length;
    }
    
    constructor() public{
        houseAddress = msg.sender;
    }
    
    function setPlayerBet() public payable {
        require(msg.value != 0, "Sorry, the eth amount is too low!");
        playerAddress = msg.sender;
        gameStruct[playerAddress].playerBetAmount = msg.value;
    }
    
    function setHouseBet() public payable isHouse {
        require(msg.value != 0, "Sorry, the eth amount is too low!");
        gameStruct[playerAddress].houseBetAmount = msg.value;
    }
    
    function setRounds(uint _housePoints, uint _playerPoints, uint _roundNum) public isHouse {
        gameStruct[playerAddress].roundStruct[_roundNum].housePoints = _housePoints;
        gameStruct[playerAddress].roundStruct[_roundNum].playerPoints = _playerPoints;
    }
    
    function judge() public isHouse{
        // due to solididty complicated relationship with string
        // so i used number instead of string
        // 0 = 'tie'
        // 1 = 'house' wins
        // 2 = 'player' wins
        // if any of them exist twice, pay them
        for (uint i = 0; i < 3; i++){
            uint result;
            uint house = gameStruct[playerAddress].roundStruct[i].housePoints;
            uint player = gameStruct[playerAddress].roundStruct[i].playerPoints;
            
            if (house == player){
                result = 0;
            }if(house > player){
                result = 1;
            }if (house < player){
                result = 2;
            }if(player > 21){
                result = 1;
            }if(house > 21){
                result = 2;
            }
            gameStruct[playerAddress].roundStruct[i].winner = result;
            gameStruct[playerAddress].resultArray[i] = result;
        }
        
    }
    
    // Called once after the three rounds
    function getPayment() public isHouse payable{
        
        if (_indexOf(gameStruct[playerAddress].resultArray, 0) == 2){
            houseAddress.transfer(gameStruct[playerAddress].houseBetAmount);
            playerAddress.transfer(gameStruct[playerAddress].playerBetAmount);
        }if(_indexOf(gameStruct[playerAddress].resultArray, 1) == 2){
            houseAddress.transfer(address(this).balance);
        }if(_indexOf(gameStruct[playerAddress].resultArray, 2) == 2){
            playerAddress.transfer(address(this).balance);
        }
    }

    // A space for view function (web3.call it have no gas)
    // that returns all history of player
    // by giving their address
}