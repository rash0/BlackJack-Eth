<template>
  <div class="controls" >
    <button :disabled="isDisabled" @click="doubleButton">Double</button>
    <button :disabled="isDisabled" @click="splitButton">Split</button>
    <button :disabled="isDisabled" @click="standButton">Stand</button>
    <button :disabled="isDisabled" @click="hitButton">Hit</button>
  </div>
</template>

<script>
export default {
  name: "Controls",
  computed: {
    isDisabled(){
      return this.$store.state.isControlsDisabled
    }
  },
  methods:{
    hitButton(){
      this.$store.dispatch('hitButton')
    },
    doubleButton(){
      this.$store.dispatch('doubleBetButton')
    },
    splitButton(){},
    standButton(){
      this.$store.dispatch('houseTurn')
    }
  }
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
}
.controls button {
  background-color: white;
  border: .7px solid #cbd5e0;
  min-width: 7rem;
  height: 1.7rem;
  margin: 0.4rem;
  border-radius: 15px;
  cursor: pointer;
  outline: none;
}

.controls button:hover {
  background: #e9d8fd;
  border: none;
  color: #2a4365;
  font-weight: 700;
}
.controls button[disabled]:hover{
    background: none;
    color:grey;
    border: .7px solid #cbd5e0;
    font-weight: normal;
}
</style>
