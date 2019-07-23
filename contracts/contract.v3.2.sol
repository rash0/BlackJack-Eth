pragma solidity >= 0.5.0;

contract BlackJack {
    //     const msgParams = JSON.stringify({
    //   types: {
    //     EIP712Domain: [
    //       { name: "name", type: "string" },
    //       { name: "version", type: "string" },
    //       { name: "chainId", type: "uint256" },
    //       { name: "verifyingContract", type: "address" }
    //     ],
    //     Game: [
    //       { name: "House_Address", type: "address" },
    //       { name: "Player_Address", type: "address" },
    //       { name: "Escrow_in_ETH", type: "uint256" },
    //       { name: "Round_bet_Amount", type: "string" },
    //     ]
    //   },
    //   primaryType: "Game",
    //   domain: {
    //     name: "ELJoker",
    //     version: "1",
    //     chainId: '1',
    //     verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
    //   },
    //   message: {
    //     House_Address:"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    //     Player_Address: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    //     Escrow_in_ETH: 50,
    //     Round_bet_Amount: 1
    //   }
    // });
    struct Round{
        uint housePoints;
        uint playerPoints;
    }
    
    
    struct Game {
        uint playerBetAmount;
        uint[] resultArray;
        mapping(uint => Round) roundStruct;
    }
    
    mapping(address => Game) gameStruct;
    
    address payable public houseAddress;
    address payable public playerAddress;
    bool public shutDownGame;

    modifier isHouse(){
        require(msg.sender == houseAddress, "sorry! you are not the house!");
        _;
    }

    modifier noAmount(){
        require(msg.value != 0, "Sorry, the eth amount is too low!");
        _;
    }
    
    constructor() public{
        houseAddress = msg.sender;
    }
    
    function setPlayerBet() public noAmount payable {
        require(!shutDownGame, "Game is Closed!");
        playerAddress = msg.sender;
        gameStruct[playerAddress].playerBetAmount = msg.value;
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
            // tie
            playerAddress.transfer(gameStruct[playerAddress].playerBetAmount);
        }if(_indexOf(gameStruct[playerAddress].resultArray, 1) >= 2){
            // house wins
            houseAddress.transfer(gameStruct[playerAddress].playerBetAmount);
        }if(_indexOf(gameStruct[playerAddress].resultArray, 2) >= 2){
            // player wins
            uint left = address(this).balance - gameStruct[playerAddress].playerBetAmount;
            playerAddress.transfer(address(this).balance - left);
        }
    }

    // VIEW FUNCATIONS //
    function getSpecificPlayer(address _addressToSearch, uint _roundNumber) public isHouse view returns(uint, uint, uint, uint){
        return (
            gameStruct[_addressToSearch].playerBetAmount,
            gameStruct[_addressToSearch].resultArray[_roundNumber],
            gameStruct[_addressToSearch].roundStruct[_roundNumber].housePoints,
            gameStruct[_addressToSearch].roundStruct[_roundNumber].playerPoints
        );
    }
    
    // CONTRACT SETTINGS //
    function getContractBalance() public isHouse view returns(uint){
        return address(this).balance;
    }

    // top up the contract balance
    function topUpContract() public isHouse noAmount payable returns (bool){}
    
    // in case of shutdown, dont accept registering new players,
    // and wait tell everyone finishes their game
    function shutDownBusines() public isHouse returns(bool){
        shutDownGame = true;
    }
    // withdraw ALL Contract eth to house account
    function transferAllToHouse() public isHouse payable returns(bool){
        houseAddress.transfer(address(this).balance);
    }
    
    // Change Contract ownership
    function setHouseOwner(address payable _tempHouse) public isHouse returns(bool){
        houseAddress = _tempHouse;
    }
    
    // HELPER FUNCTIONS //
    function _indexOf(uint[] memory arr, uint value) internal pure returns (uint){
        
        uint tmp = 0;
        for (uint i = 0; i < arr.length; i++)
            if (arr[i] == value) {
                tmp++;
            }
            return tmp;
    }
}