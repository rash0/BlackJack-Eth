import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [2,3,4,5,6,7,8,9,10,'J','Q', 'K', 'A'],
    cardType:[
      {
        name: 'spade',
      },
      {
        name: 'diamond',
      },
      {
        name: 'heart',
      },
      {
        name: 'clove',
      }
    ]
  },
  getters: {
    // selectCard(state, getters) {
    //   var rand = Math.floor(Math.random() * 51) + 1
    //   var deck = getters.fullCardDeck
    //   console.log(deck[rand])
    //   return deck[rand]
    // },
    fullCardDeck(state){
      // Create a deck
      const deck = []
      
      for (let card in state.cards) {
        for (let type in state.cardType) {
          let ca = {
            name: state.cardType[type].name,
            img: state.cardType[type].img,
            num: state.cards[card]
          }
          deck.push(ca);
        }
      }
      // Shuffle the deck
      for (var i = 0; i < 1000; i++) {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];
    
        deck[location1] = deck[location2];
        deck[location2] = tmp;
      }
      return deck;
    }
  },
  mutations: {
  },
})
