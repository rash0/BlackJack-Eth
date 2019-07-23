export const Params = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" }
      ],
      Game: [
        { name: "HouseAddress", type: "address" },
        { name: "PlayerAddress", type: "address" },
        { name: "Escrow_in_ETH", type: "uint256" },
        { name: "CurrentBet_in_ETH", type: "uint256" },
        { name: "Rounds", type: "Round" }
      ],
      Round: [
        { name: "House", type: "string" },
        { name: "Player", type: "string" },
        { name: "Winner_Side", type: "uint256" },
        { name: "BetAmount_in_WEI", type: "uint256" },
      ]
    },
    primaryType: "Game",
    domain: {
      name: "ELJoker",
      version: "1",
      chainId: "3",
      verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
    },
    message: {
      HouseAddress: '',
      PlayerAddress: '',
      Escrow_in_WEI: undefined,
      CurrentBet_in_WEI: undefined,
      Rounds: [
        {
          House: '',
          Player: '',
          Winner_Side: undefined,
          BetAmount_in_WEI:undefined
        }
      ]
    }
  }