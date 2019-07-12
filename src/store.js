import Vue from "vue";
import Vuex from "vuex";
import { sumPoints } from "./helper.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fullDeck: [],
    houseCards: [],
    housePoints: 0,
    userPoints: 0,
    userCards: [],
    isControlsDisabled: false,
    houseTurn: false,
    gameState: 'playing', // 'finished',
    web3Instance: null
  },
  getters: {
    tableState: state => sideName => {
      var points = (sideName === 'houseSide') ? state.housePoints : state.userPoints
      var oppositePoints = (sideName !== 'houseSide') ? state.housePoints : state.userPoints

      if(state.gameState !== 'playing'){
      if (points === 21) 
        return "background-color: RGBA(0, 255, 0, 0.2)"; //green
      if (points < 22 && points > oppositePoints)
        return "background-color: RGBA(0, 255, 0, 0.2)"; //green
      if (points > 22 || points < oppositePoints)
        return "background-color: RGBA(255, 0, 0, 0.2)"; //red
      }else{
        return "background-color: white;"
      }
    }
  },
  mutations: {
    createDeck(state) {
      const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
      const cardType = ["spade", "diamond", "heart", "clove"];
      // Create a deck
      const deck = [];
      for (let card in cards) {
        for (let type in cardType) {
          let ca = {
            name: cardType[type],
            num: cards[card]
          };
          deck.push(ca);
        }
      }
      state.fullDeck = deck;
    },
    shuffleDeck(state) {
      // TODO //
      // Try fisher-yatis shuffle (firefox bookmark --> dapp folder)
      // OR //
      // Try shuffle with a seed, so the player can access this seed later
      // to re-create the shuffle
      var deck = state.fullDeck;
      for (var i = 0; i < 1000; i++) {
        var location1 = Math.floor(Math.random() * deck.length);
        var location2 = Math.floor(Math.random() * deck.length);
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
      }
      state.fullDeck = deck;
    },
    distrubateCard(state) {
      var fullDeck = state.fullDeck;
      for (var i = 0; i < 4; i++) {
        if (i % 2 === 0) {
          setTimeout(() => {
            // deal a card
            state.houseCards.push(fullDeck.pop());
            // hide the house second card point
            if (state.houseCards.length !== 1) {
              state.housePoints =
                state.housePoints - (sumPoints(state.houseCards[1]) || 0);
            } else {
              state.housePoints = sumPoints(state.houseCards, state.housePoints);
            }
          }, i * 700);
        }
        if (i % 2 !== 0) {
          setTimeout(() => {
            state.userCards.push(fullDeck.pop());
            state.userPoints = sumPoints(state.userCards, state.userPoints);
          }, i * 700);
        }
      }
    },
    userNewCard(state) {
      if (state.userPoints < 21) {
        state.userCards.push(state.fullDeck.pop());
        state.userPoints = sumPoints(state.userCards, state.userPoints);
      }
      if (state.userPoints > 21 || state.userPoints === 21) {
        state.isControlsDisabled = true;
        state.houseTurn = true
        state.gameState = "finished";
      }
    },
    // stand button
    standButton(state) {
      state.houseTurn = true;
      state.isControlsDisabled = true;
      state.housePoints = sumPoints(state.houseCards, state.housePoints);
    },
    houseNewCard(state) {
      state.houseCards.push(state.fullDeck.pop());
      state.housePoints = sumPoints(state.houseCards, state.housePoints);
    },
    changeGameState(state) {
      state.gameState = "playing";
    },
    resetRound(state) {
      state.houseCards = [];
      state.userCards = [];
      state.housePoints = 0;
      state.userPoints = 0;
      state.isControlsDisabled = false;
      state.houseTurn = false;
    }
  },

  actions: {
    startTheGame(context) {
      context.commit("createDeck");
      context.commit("shuffleDeck");
      context.commit("distrubateCard");
    },
    houseTurn(context) {
      context.commit("standButton");
      var tmr = setInterval(() => {
        if (
          context.state.housePoints <= 17
          // && context.state.housePoints <= context.state.userPoints
        ) {
          context.commit("houseNewCard");
        } else {
          context.state.gameState = "finished";
          clearInterval(tmr);
        }
      }, 1200);
    },
    // TODO //
    // enhance the duration between every move and the other, for better ui
    newRound(context) {
      context.commit("changeGameState");
      setTimeout(() => {
        context.commit("resetRound");
        context.commit("distrubateCard");
      }, 1200);
    }
  }
});
