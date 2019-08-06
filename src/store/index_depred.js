import Vue from "vue";
import Vuex from "vuex";
import request from "request";
import { sumPoints } from "../helper.js";
import { Params } from "./Params.js";
// TODO //
// NOTIFICATION for the finishing of the deck.
// Give a notification or ask player to wait fro creation of another deck

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fullDeck: [],
    houseCards: [],
    userCards: [],
    // th user hand data should be like this
    playerHand: [
      {
        cards: [],
        isActive: true,
        isStand: true, // bool, if the player split hands this shows one of them is active
        bet: 0.3,
        points: 14, // the sum of total points of cards
        isBetDoubleDown: false
      },
      // In case split then there will be another object
      {
        cards: [],
        isStand: false,
        bet: 0.1,
        points: 10,
        isBetDoubleDown: false
      }
    ],
    housePoints: 0,
    isBetDoubleDown: false, // double button
    isCardSplit: false, // changes on pressing 'split' button
    isControlsDisabled: {
      hit: false,
      stand: false,
      double: false,
      split: true
    },
    houseTurn: false,
    gameState: "playing", // 'finished',
    Escrow: 0,
    msgParams: Params
  },
  getters: {
    // not working
    roundResult: state => sideName => {
      var points =
        sideName === "houseSide" ? state.housePoints : state.userPoints;
      var oppositePoints =
        sideName !== "houseSide" ? state.housePoints : state.userPoints;
      var baseStyle = "color: white;border: none; font-weight: bold;";
      // TODO //
      // FIX the judge
      if (state.gameState !== "playing") {
        if (points === 21 || (points < 21 && points > oppositePoints))
          return `background-color: RGBA(81, 211, 153, 0.7); ${baseStyle}`; //green

        if (points < 21 && points < oppositePoints && oppositePoints > 21)
          return `background-color: RGBA(81, 211, 153, 0.7); ${baseStyle}`; //green

        if (oppositePoints === 21 || points < oppositePoints || points > 21)
          return `background-color: RGBA(255, 0, 0, 0.5); ${baseStyle}`; //red

        if (points === oppositePoints)
          return `background-color: rgba(42, 117, 245, 0.5); ${baseStyle}`;
        // Tie Blue
        else return undefined;
      }
    }
  },
  mutations: {
    // game
    createDeck(state) {
      const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
      const cardType = ["spade", "diamond", "heart", "clove"];
      // Create a deck
      const deck = [];
      // how many card deck to play with
      for (var i = 0; i < 5; i++) {
        for (let card in cards) {
          for (let type in cardType) {
            let ca = {
              type: cardType[type],
              num: cards[card]
            };
            deck.push(ca);
          }
        }
      }
      state.fullDeck = deck;
    },
    shuffleDeck(state) {
      var array = state.fullDeck;
      var m = array.length;
      var t;
      var i;
      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      state.fullDeck = array;
    },
    PlayerNewCard(state) {
      state.playerHand[0].cards.push(state.fullDeck.pop());
      state.playerHand[0].points = sumPoints(state.playerHand[0].cards);
      // state.userCards.push(state.fullDeck.pop());
      // state.userPoints = sumPoints(state.userCards);
    },
    // stand button
    standButton(state) {
      // TODO //
      // stand button have to change, if the player split then
      // its not the player turn, but the other hand of the player
      // but for now will do it like this
      state.playerHand[0].isStand = true;
      state.houseTurn = true;
      state.isControlsDisabled = {
        hit: true,
        stand: true,
        double: true,
        split: true
      };
      state.housePoints = sumPoints(state.houseCards);
    },
    splitButton(state) {
      state.isCardSplit = true;
      // extract the last/second card from the card array
      const cardSet2 = state.playerHand[0].cards.splice(1);
      // init a second object
      state.playerHand.push({
        cards: [],
        isStand: false,
        bet: 0,
        points: 10,
        isBetDoubleDown: false
      });
      state.playerHand[1].cards.push(cardSet2);
      // sum the count of the two arrays
      // maybe loop instead of repaet code
      state.playerHand[0].points = sumPoints(state.playerHand[0].cards);
      state.playerHand[1].points = sumPoints(state.playerHand[1].cards);
      // copy the bet
      state.playerHand[1].bet = state.playerHand[0].bet;
    },
    houseNewCard(state) {
      state.houseCards.push(state.fullDeck.pop());
      // Dont calcualte the house second card points
      if (state.houseCards.length === 2) {
        state.housePoints =
          state.housePoints - (sumPoints(state.houseCards[1]) || 0);
      } else {
        state.housePoints = sumPoints(state.houseCards);
      }
    },
    changeGameState(state) {
      state.gameState = "playing";
    },
    resetRound(state) {
      state.houseCards = [];
      state.playerHand = [
        {
          cards: [],
          isStand: false,
          bet: 0,
          points: 0,
          isBetDoubleDown: false
        }
      ];
      // state.userCards = [];
      state.housePoints = 0;
      // state.isBetDoubleDown = false;
      state.isControlsDisabled = {
        hit: false,
        stand: false,
        double: false,
        split: true
      };
      state.houseTurn = false;
    },
    // remove cards from table
    removeCardOneByOne(state) {
      var tmr = setInterval(() => {
      if (state.houseCards.length != 0) {
        state.houseCards.pop();
      } else if (state.playerHand[0].cards.length != 0) {
        state.playerHand[0].cards.pop();
      } else if (state.playerHand[1].cards.length != 0) {
        state.playerHand[1].cards.pop();
      }
    },
    // message state paramaters
    // only called once in the first of the game
    initGameState(state, HouseAddress, PlayerAddress, EscrowInWEI) {
      var base = state.msgParams.message;
      base.houseAddress = HouseAddress;
      base.playerAddress = PlayerAddress;
      base.Escrow_in_WEI = web3.utils.toWei(EscrowInWEI.toString(), "ether");
    },
    // called everytime a new Bet is made
    currentBetState(state, currentBetAmount) {
      // TODO //
      // For the currentBalance_in_WEI paramter, it will be calculated after the game
      // but the currentBetAmount_in_WEI paramter will be inputed before the game start
      // In general, usually the signing will happen after the round finishes,
      // but the question is 'what if the user doesnt want to sign ??'
      var base = state.msgParams.message;
      base.currentBetAmount_in_WEI = web3.utils.toWei(
        currentBetAmount.toString(),
        "ether"
      );
    },
    // called after the finish of every round
    roundState(state, HousePoints, PlayerPoints) {
      var base = state.msgParams.message;
      base.House = HousePoints.toString();
      base.Player = PlayerPoints.toString();
      // calculate the winner side based on the result
      // base.Winner_Side
      base.BetAmount_in_WEI = base.CurrentBet_in_WEI;
    },
    sendSignaure(state) {}
  },

});
