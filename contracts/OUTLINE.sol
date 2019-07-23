pragma solidity >= 0.5.0;

contract Outline {

    struct Channel {
        bytes32 channelId;
        address address0;
        address address1;
        uint balance0;
        uint balance1;
        uint sequenceNumber;
    } 

    mapping(bytes32 => Channel) channels;

    function open(bytes32 _channelId, address _address1, uint _value) public payable {
        
        Channel memory _channel = Channel(
            _channelId,
            msg.sender, // as address0
            _address1,
            msg.value, // as balance0
            0,
            0
        );

        channels[_channelId] = _channel;
    }

    function join(bytes32 _channelId) public payable {
        channels[_channelId].balance1 = msg.value
    }

    function close(bytes32 _channelId, uint _sequenceNumber, uint balance0, uint balance1, bytes signatuer0, bytes signatuer1) public payable {
        Channel memory channel = channels[_channelId]

        bytes32 statehash = sha3(
            _channelId,
            balance0,
            balance1,
            _sequenceNumber
        )

        require(!ecrecover(statehash, signatuer0, channel.address0), "signatuer0 invalid")
        require(!ecrecover(statehash, signatuer1, channel.address1), "signatuer1 invalid")
        require((balance0 + balance1) != (channel.balance0 + channel.balance1), "the first total is not equal to the seoncd")

        // send balances
    }
}