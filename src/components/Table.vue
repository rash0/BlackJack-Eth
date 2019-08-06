<template>
  <div class="Table">
    <div class="House Table-side">
      <transition-group class="hand" name="card-group" tag="div">
        <Cards
          v-for="(card, ind) in houseCards"
          :card="card"
          :cardIndex="ind"
          :name="'houseSide'"
          :key="ind"
        />
      </transition-group>
      <div class="total-points">
        <span>{{ this.$store.state.housePoints }}</span>
      </div>
    </div>
    <div class="User Table-side">
      <div style="display:flex">
        <transition-group
          class="hand"
          name="card-group"
          tag="div"
          :style="!this.playerHand[0].isActive ? 'transform: scale(.6);opacity: .6' : undefined"
        >
          <Cards
            v-for="(card, ind) in playerHand[0].cards"
            :card="card"
            :cardIndex="ind"
            :name="'userSide'"
            :key="ind"
          />
        </transition-group>
        <transition-group
          class="hand"
          name="card-group"
          tag="div"
          v-if="this.playerHand[1] != undefined"
          :style="!this.playerHand[1].isActive ? 'transform: scale(.6);opacity: .6' : undefined"
        >
          <Cards
            v-for="(card, index) in playerHand[1].cards"
            :card="card"
            :cardIndex="index"
            :name="'userSide'"
            :key="index"
          />
        </transition-group>
      </div>
      <div class="total-points">
        <span>{{ this.playerHand[0].points }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Cards from "./Cards";
import { mapState } from "vuex";

export default {
  name: "Table",
  components: {
    Cards
  },
  computed: {
    ...mapState({
      isCardSplit: "isCardSplit",
      isControlsDisabled: "isControlsDisabled",
      houseCards: "houseCards",
      playerHand: "playerHand"
    })
    // cardList() {
    //   if (this.name === "houseSide") {
    //     return this.houseCards;
    //   } else {
    //     // console.log(this.playerHand[1].cards)
    //     return this.playerHand[0].cards;
    //   }
    // },
    // totalPoints() {
    //   return this.name === "houseSide"
    //     ? this.$store.state.housePoints
    //     : this.playerHand[0].points;
    // },
    // roundResult() {
    //   return this.$store.state.gameState !== "playing"
    //     ? this.$store.getters.roundResult(this.name)
    //     : undefined;
    // }
  },
  methods: {}
};
</script>
<style scoped>
.card-group {
  transition: all 0.5s;
}
.card-group-enter {
  transform: translateX(90px);
}
.card-group-leave-to {
  transform: translateX(190px);
}
.card-group-leave-to {
  opacity: 0;
}

.hand {
  margin-left: 80px;
}
.Table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease-in;
  border: 1px solid red;
}
.Table-side {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease-in;
  border: 1px solid red;
}

.Table-side .hand {
  display: flex;
  justify-content: center;
  height: 13rem;
}

.total-points {
  width: 1.8rem;
  height: 2rem;
  border-radius: 50%;
  border: 0.7px solid #3182ce;
  color: #3182ce;
  font-weight: 300;
  padding: 0rem 0.1rem 0rem 0.1rem;
  line-height: 2rem;
  transition: all 0.3s ease-in;
}
</style>
