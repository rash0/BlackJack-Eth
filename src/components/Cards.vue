<template>
  <!-- TODO add more card animation in and out -->
  <!--  -->
  <!-- :style="splitCards" -->
  <div class="flip-card">
    <div class="flip-card-inner" :class="cardOrientation">
      <div class="flip-card-front">
        <div class="card" :class="cardColors">
          <div class="card-head">
            <h4>{{card.num}}</h4>
            <Shapes class="smallShape" :cardName="card.type" size="30" width="21" />
          </div>
          <div v-if="card.num !== 'A'" class="card-body">
            <Shapes class="bigShape" :cardName="card.type" size="19" width="40" />
            <p>{{card.num}}</p>
            <Shapes class="bigShape" :cardName="card.type" size="19" width="40" />
          </div>
          <div v-else class="card-body">
            <Shapes
              class="bigShape"
              :cardName="card.type"
              style="margin-top: 70px !important;"
              size="12"
              width="100"
            />
          </div>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="card" style="border: 1px solid black">
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Shapes from "./Shapes";
import { mapState } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true
    },
    cardIndex: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  components: {
    Shapes
  },
  computed: {
    ...mapState({
      isCardSplit: "isCardSplit",
      playerHand: "playerhand",
      isControlsDisabled: "isControlsDisabled"
    }),
    isFliped() {
      var houseTurn = this.$store.state.houseTurn;
      if (this.cardIndex === 1 && this.name === "houseSide" && !houseTurn)
        return true;
      return false;
    },
    cardOrientation() {
      var c = [];
      // var double = this.$store.state.isBetDoubleDown;
      // var currentHand = this.playerHand[0].isActive? this.playerHand[0].cards : this.playerHand[1].cards
      // var arrLen = currentHand.length - 1;
      // flip card if house and second card in hand
      if (this.isFliped) c.push("is-fliped");
      // if double down and user side and last card in hand, then rotate card to 90 deg
      // if (double && this.cardIndex === arrLen && this.name === "userSide")
      //   c.push("is-doubled");
      return c;
    },
    cardColors() {
      var c = [];
      if (!this.isFliped) {
        switch (this.card.type) {
          case "spade":
          case "clove":
            c.push("card-colors-black");
          case "diamond":
          case "heart":
            c.push("card-colors-red");
        }
        return c;
      }
      c.push("card-is-fliped");
      return c;
    }
    // splitCards() {
    //   if (
    //     !this.isControlsDisabled.split &&
    //     this.name === "userSide" &&
    //     this.isCardSplit
    //   ) {
    //     return this.cardIndex === 0
    //       ? "margin-left: -14vh !important;"
    //       : "margin-left: 16vh !important;";
    //   }
    // }
  }
};
</script>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Muli:200|Open+Sans:300&display=swap'); */
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,600&display=swap");

.flip-card {
  margin-left: -80px;
  transition: all 1s;
  border: none !important;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 9rem;
  height: 12rem;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.flip-card-inner.is-fliped {
  transform: rotateY(180deg);
}
.flip-card-inner.is-doubled {
  transform: rotateZ(-90deg);
}

.flip-card-front {
  width: 9rem;
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
  position: absolute;
}

/* Style the back side */
.flip-card-back {
  transform: rotateY(180deg) rotate(-7deg);
}
/* Card back design */
.flip-card-back .card hr {
  width: 13.5rem;
  margin: auto;
  margin-top: 95px;
  margin-left: -45px;
  border-width: 0.5px;
  transform: rotate(59deg);
  border-color: black;
}

.card {
  font-family: "Montserrat", "Open Sans", "Muli", sans-serif;
  /* font-family: 'Open Sans', sans-serif !important;
  font-family: 'Muli', sans-serif !important; */
  /* font-weight: 100 !important; */
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 7.5rem !important;
  height: 12rem;
  border-radius: 10px;
  padding: 9px;
  background-color: white;
  transition: all 250ms;
  transform: scale(0.7);
}

.card.card-is-fliped {
  transform: scale(0.7) rotateY(180deg) rotate(-7deg);
}

.card-colors-black {
  border: 1px solid black !important;
  color: black !important;
}

.card.card-colors-red {
  border: 1px solid red;
  color: red;
}
.card-head h4 {
  width: 1.3rem;
  margin: 0px;
  font-size: 18px;
  font-weight: 600 !important;
  font-style: normal;
}
.card-head .smallShape {
  margin-top: 5px;
  padding-left: 1.8px;
}
.card-body {
  height: 100%;
  /* border: 1px solid red; */
  margin-top: -54px;
}

.card-body p {
  font-size: 60px;
  /* font-weight: 600; */
  margin: 0;
  padding-top: 23px;
  padding-bottom: 23px;
}

.card-body .bigShape {
  display: flex;
  justify-content: center;
  margin-top: 2px;
}
</style>

