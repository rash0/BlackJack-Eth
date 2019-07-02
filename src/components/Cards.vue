<template>
  <span class="card" :style="'border: 1px solid ' + changeColor(card.name)">
    <div class="card-inner">
      <div class="card-front">
        <div class="card-head">
          <h4 :style="'color:' + changeColor(card.name)" >{{card.num}}</h4>
          <Shapes class="smallShape" :cardName="card.name" size="25px" width="21px" />
        </div>
        <div v-if="card.num !== 'A'" class="card-body">
          <Shapes class="bigShape" :cardName="card.name" size="19px" width="40px"/>
          <p :style="'color:' + changeColor(card.name)" >{{card.num}}</p>
          <Shapes class="bigShape" :cardName="card.name" size="19px" width="40px"/>
        </div>
        <div v-else class="card-body">
          <Shapes class="bigShape" :cardName="card.name" style="margin-top: 70px !important;" size="12px" width="100px"/>
        </div>
      </div>
      <div class="card-back">
        <h5>BACKKKKK</h5>
      </div>
    </div>
  </span>
</template>

<script>
import Shapes from './Shapes'

export default {
  name: 'Card',
  props: ['card'],
  components: {
    Shapes
  },
  methods:{
    changeColor(type){
      switch(type){
        case 'spade':
          return  "black;"
        case 'diamond':
          return "red;"
        case 'heart':
          return "red;"
        case 'clove':
          return "black;"
      }
    }
  }
}
</script>

<style>
.card {
  font-family: 'Raleway', sans-serif;
  text-rendering: optimizeLegibility !important;
  color: black;
  width: 7.5rem !important;
  height: 12rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 7px;
  align-self: center;
  position: relative;
  display: flex;
  padding: 9px ;
  flex-direction: column;
  margin-left: 5px ;
  margin-right: 5px;
  background-color: white;
  transition: all 250ms;
  perspective: 1000px;
}
.card div {
  width: 100%;
}

.card-inner{
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-back {
  background-color: dodgerblue;
  transform: rotateY(180deg);
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

