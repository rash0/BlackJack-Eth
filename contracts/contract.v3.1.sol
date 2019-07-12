pragma solidity >= 0.5.0;

contract BlackJack {
    
    struct Round{
        uint housePoints;
        uint playerPoints;
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
    
    function _indexOf(uint[] memory arr, uint value) internal pure returns (uint){
        
        uint tmp = 0;
        for (uint i = 0; i < arr.length; i++)
            if (arr[i] == value) {
                tmp++;
            }
            return tmp;
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
        require(gameStruct[playerAddress].playerBetAmount == msg.value, "Sorry,the bet is not the same as the user!");
        gameStruct[playerAddress].houseBetAmount = msg.value;
    }
    
    function setRounds(uint _housePoints, uint _playerPoints, uint _roundNum) public isHouse returns (bool) {
        gameStruct[playerAddress].roundStruct[_roundNum].housePoints = _housePoints;
        gameStruct[playerAddress].roundStruct[_roundNum].playerPoints = _playerPoints;

        uint result;
        if (_housePoints == _playerPoints){
            result = 0;
        }if(_housePoints > _playerPoints){
            result = 1;
        }if (_housePoints < _playerPoints){
            result = 2;
        }if(_playerPoints > 21){
            result = 1;
        }if(_housePoints > 21){
            result = 2;
        }
        gameStruct[playerAddress].resultArray.push(result);
    }
    
    // Called once after the three rounds
    function getPayment() public isHouse payable returns (bool){
        
        if (_indexOf(gameStruct[playerAddress].resultArray, 0) >= 2){
            houseAddress.transfer(gameStruct[playerAddress].houseBetAmount);
            playerAddress.transfer(gameStruct[playerAddress].playerBetAmount);
        }if(_indexOf(gameStruct[playerAddress].resultArray, 1) >= 2){
            houseAddress.transfer(address(this).balance);
        }if(_indexOf(gameStruct[playerAddress].resultArray, 2) >= 2){
            playerAddress.transfer(address(this).balance);
        }
    }

    // A space for view function (web3.call it have to gas)
    // that returns all history of player
    // by giving their address
    
    // A view function that returns all the saved structs
    // in the contract, that will be used for UI list
    // to show recent players with bets
    
    // A Space for changing the house address
    //  Or the ownership of the "house"
}