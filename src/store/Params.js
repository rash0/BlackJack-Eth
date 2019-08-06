export const Params = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" }
      ],
      Game: [
        { name: "houseAddress", type: "address" },
        { name: "playerAddress", type: "address" },
        { name: "Escrow_in_ETH", type: "uint256" },
        { name: "currentBet_in_ETH", type: "uint256" },
        { name: "Rounds", type: "Round" }
      ],
      Round: [
        { name: "house", type: "string" },
        { name: "player", type: "string" },
        { name: "winner_Side", type: "uint256" },
        { name: "betAmount_in_WEI", type: "uint256" },
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
      houseAddress: '',
      playerAddress: '',
      Escrow_in_WEI: undefined,
      currentBalance_in_WEI: undefined,
      currentBetAmount_in_WEI: undefined,
      Rounds: [ // used as a detailed nounce/sequence for the player history
        {
          house: '',
          player: '',
          winner_Side: undefined,
          betAmount_in_WEI:undefined // user bet Amount only
        }
      ]
    }
  }