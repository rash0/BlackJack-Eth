<template>
<!-- TODO add more card animation in and out -->
  <div class="flip-card">
    <div class="flip-card-inner" :style="isFliped ? 'transform: rotateY(180deg)' : null">
      <div class="flip-card-front">
        <div class="card" :style="!isFliped ? 'border: 1px solid ' + changeColor(card.name) : 'transform: scale(.1);'">
          <div class="card-head">
            <h4>{{card.num}}</h4>
            <Shapes class="smallShape" :cardName="card.name" size="25px" width="21px" />
          </div>
          <div v-if="card.num !== 'A'" class="card-body">
            <Shapes class="bigShape" :cardName="card.name" size="19px" width="40px"/>
            <p>{{card.num}}</p>
            <Shapes class="bigShape" :cardName="card.name" size="19px" width="40px"/>
          </div>
          <div v-else class="card-body">
            <Shapes class="bigShape" :cardName="card.name" style="margin-top: 70px !important;" size="12px" width="100px"/>
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
import Shapes from './Shapes'

export default {
  name: 'Card',
  props: ['card', 'isFliped'],
  components: {
    Shapes
  },
  computed: {
    cardBorder(cardName){
      `border: 1px solid ' + ${this.changeColor(cardName)}`
    }
  },
  methods:{
    changeColor(type){
      switch(type){
        case 'spade':
        case 'clove':
          return  "black;"
          break;
        case 'diamond':
        case 'heart':
          return "red;"
          break;
      }
    },
    rotateCard(){
      const rand = Math.floor(Math.random() * (5 - 1) + 1)
      switch(rand){
        case 1:
          return 'transform: rotateZ(5deg);'
          break;
        case 2:
          return 'transform: rotateZ(18deg);'
          break;
        case 3:
          return 'transform: rotateZ(-25deg);'
          break;
        case 4:
          return 'transform: rotateZ(-17deg);'
          break;
      }
    }
  }
}
</script>

<style>
.flip-card {
  float: left;
  transition: all 1s;
  border:none !important;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 6.5rem !important;
  height: 12rem;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
/* .flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
} */

/* Position the front and back side */
.flip-card-front, .flip-card-back {
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
  border-width: .5px;
  transform: rotate(59deg);
  border-color: black;
}

.card {
  font-family: 'Raleway', sans-serif;
  text-rendering: optimizeLegibility !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /* color: black; */
  width: 7.5rem !important;
  height: 12rem;
  border-radius: 10px;
  /* display: inline-block; */
  /* align-self: center; */
  /* display: flex; */
  padding: 9px ;
  /* flex-direction: column; */
  margin-left: 5px ;
  margin-right: 5px;
  background-color: white;
  transition: all 250ms;
  transform: scale(.7)
}
.card div {
  width: 100%;
}

.card-head h4 {
  width: 1.3rem;
  margin:0px;
  font-size: 18px;
  font-weight: 600;
  font-style: normal;
}
.card-head .smallShape {
  margin-top:5px;
  padding-left: 1.8px;
}
.card-body{
  height: 100%;
  /* border: 1px solid red; */
  margin-top: -40px;
}

.card-body p {
  font-size: 60px;
  font-weight: 600;
  margin: 0;
  padding-top:23px;
  padding-bottom:23px;
}

.card-body .bigShape {
  display: flex;
  justify-content: center;
  margin-top: 2px;
}
</style>

