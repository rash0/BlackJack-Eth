pragma solidity >= 0.5.0;

contract test {

    struct Round {
        string house;
        string player;
        uint winner_Side;
        uint betAmount_in_ETH;
    }

    struct Game {
        bytes32 gameId;
        address houseAddress;
        address playerAddress;
        uint Escrow_in_ETH;
        uint currentBet_in_ETH;
        mapping(uint => Round)rounds; // get the sequence of games from it
    }

    mapping(bytes32 => Game) games;
    enum WinnerSide { HOUSE , PLAYER, TIE }

    event PlayerDeposit(address _playerAddress, uint amount); // Event

    function startGame(bytes32 _gamelId, address _houseAddress) public payable {
        require(msg.value > 0.1 ether, 'Sorry, The Escrow bet is too Low!');
        // require(games[msg.sender] == , 'Sorry, Game exist alread!');

        Game memory _game = Game(
            _gamelId,
            _houseAddress,
            msg.sender, // player
            msg.value, // Escrow_in_ETH
            0 // currentBet_in_ETH
        );

        games[_gamelId] = _game;
        emit PlayerDeposit(msg.sender, msg.value);
    }

    function getPayment()


}