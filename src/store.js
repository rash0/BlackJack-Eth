import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [2,3,4,5,6,7,8,9,10,'J','Q', 'K', 'A'],
    cardType:[
      {
        name: 'spade',
        img: require('./assets/spade.svg')
      },
      {
        name: 'diamond',
        img: require('./assets/diamond.svg')
      },
      {
        name: 'heart',
        img: require('./assets/heart.svg')
      },
      {
        name: 'clover',
        img: require('./assets/clover.svg')
      }
    ]
  },
  getters: {
    fullCardDeck(state){
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
      return deck;
    }
  },
  mutations: {
  },
})
