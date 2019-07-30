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
    housePoints: 0,
    userPoints: 0,
    userCards: [],
    isBetDoubleDown: false, // double button
    isControlsDisabled: false,
    houseTurn: false,
    gameState: "playing", // 'finished',
    Escrow: 0,
    msgParams: Params
  },
  getters: {
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
              name: cardType[type],
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
      // var deck = state.fullDeck;
      // for (var i = 0; i < 1000; i++) {
      //   var location1 = Math.floor(Math.random() * deck.length);
      //   var location2 = Math.floor(Math.random() * deck.length);
      //   var tmp = deck[location1];

      //   deck[location1] = deck[location2];
      //   deck[location2] = tmp;
      // }
      // state.fullDeck = deck;
    },
    userNewCard(state) {
      state.userCards.push(state.fullDeck.pop());
      state.userPoints = sumPoints(state.userCards);
    },
    // stand button
    standButton(state) {
      state.houseTurn = true;
      state.isControlsDisabled = true;
      state.housePoints = sumPoints(state.houseCards);
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
      state.userCards = [];
      state.housePoints = 0;
      state.userPoints = 0;
      state.isBetDoubleDown = false
      state.isControlsDisabled = false;
      state.houseTurn = false;
    },
    // remove cards from table
    removeCardOneByOne(state) {
      var tmr = setInterval(() => {
        if (state.houseCards.length != 0) {
          state.houseCards.pop();
        } else if (state.userCards.length != 0) {
          state.userCards.pop();
        } else {
          clearInterval(tmr);
        }
      }, 80);
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

  actions: {
    startTheGame(context) {
      context.commit("createDeck");
      context.commit("shuffleDeck");
      setTimeout(() => context.dispatch("distrubateCard"), 1300);
    },
    distrubateCard(context) {
      for (var i = 0; i < 4; i++) {
        if (i % 2 === 0) {
          setTimeout(() => {
            context.commit("houseNewCard");
          }, i * 400);
        }
        if (i % 2 !== 0) {
          setTimeout(() => {
            context.commit("userNewCard");
            if (context.state.userPoints === 21) {
              context.commit("standButton");
              context.state.gameState = "finished";
            }
          }, i * 400);
        }
      }
    },
    houseTurn(context) {
      context.commit("standButton");
      var tmr = setInterval(() => {
        if (context.state.housePoints <= 17) {
          context.commit("houseNewCard");
        } else if (context.state.userPoints > 21) {
          context.state.gameState = "finished";
          clearInterval(tmr);
        }else {
          context.state.gameState = "finished";
          clearInterval(tmr);
        }
      }, 1200);
    },
    removeCards({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("removeCardOneByOne");
          resolve();
        }, 700);
      });
    },
    newRound(context) {
      context.commit("changeGameState");
      context.state.isBetDoubleDown = false
      context.dispatch("removeCards").then(() => {
        setTimeout(() => {
          context.commit("resetRound");
          context.dispatch("distrubateCard");
        }, 1300);
      });
    },
    // controls
    hitButton(context) {
      // TODO //
      // make sure to allow only one card withdrawl at time,
      // wait till the card touch the table and can click again
      if (context.state.userPoints < 21) {
        context.commit("userNewCard");
      }
      if (context.state.userPoints > 21 || context.state.userPoints === 21) {
        context.commit("standButton");
        context.state.gameState = "finished";
      }
    },
    doubleBetButton(context) {
      // Should double the bet first, then
      // withdraw on card only, then
      context.commit("userNewCard");
      context.state.isBetDoubleDown = true
      // disable controls and turn to house to play
      setTimeout(() => {
        context.commit("standButton");
        // context.state.gameState = "finished";
        context.dispatch("houseTurn");
      }, 700);
    },
    // supposdly fetch all the first requests from server
    allFetch(context) {
      request("http://localhost:7070/init", (err, res, body) =>
        // eslint-disable-next-line
        err ? console.log(err) : context.commit("fetchAddress", body)
      );
    },
    postSignature(context, signature) {
      request.post(
        {
          url: "http://localhost:7070/user-signature",
          form: { msgParams: context.state.msgParams, sig: signature }
        },
        (err, res, body) => (err ? console.log(err) : console.log(body))
      );
    }
  }
});
