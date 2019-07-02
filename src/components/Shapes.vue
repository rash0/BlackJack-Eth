<template>
  <div>
    <Heart v-if="cardName === 'heart'" :strokeWidth="size" :width="width" strokeColor="red"/>
    <Diamond v-if="cardName === 'diamond'" :strokeWidth="size" :width="width" strokeColor="red"/>
    <Clove v-if="cardName === 'clove'" :strokeWidth="size" :width="width" strokeColor="black"/>
    <Heart v-if="cardName === 'spade'" style="transform: rotate(180deg)" :width="width" :strokeWidth="size" strokeColor="black"/>
  </div>
</template>

<script>
import Heart from '../assets/heart.vue';
import Diamond from '../assets/diamond.vue';
import Clove from '../assets/clove.vue';

export default {
  name: 'Shapes',
  props: ['cardName', 'size', 'width'],
  components: {
    Heart, Diamond,
    Clove
  },
  methods:{
    tableState(points){
      // TODO //
      // use switch() instead
      if(points === 21) return 'background-color: RGBA(0, 255, 0, 0.2)'
      if(points > 21) return 'background-color: RGBA(255, 0, 0, 0.2)'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* transition Group style */
.modal-enter-active,
.modal-leave-active { transition: opacity 1000ms }

.modal-enter,
.modal-leave-to { opacity: 0 }

.modal-leave,
.modal-enter-to { opacity: 1 }

.Table-side{
  width: 100%;
  height: 45vh;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  transition: all 1s ease-in-out;
}
.Table-side div {
  display: flex;
}
.Table-side span:last-child {
  width: 50px;
  color: #a0aec0;
  font-weight:bolder;
  font-style: oblique;
  font-size: x-large;
  align-self: center
}
</style>
