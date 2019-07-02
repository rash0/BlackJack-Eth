<template>
  <div class="controls" >
    <button :disabled="isDisabled" @click="doubleButton">Double Down</button>
    <button :disabled="isDisabled" @click="splitButton">Split</button>
    <button :disabled="isDisabled" @click="standButton">Stand</button>
    <button :disabled="isDisabled" @click="hitButton">Hit</button>
  </div>
</template>

<script>
export default {
  name: "Controls",
  props: ["doubleButton", "splitButton", "standButton", "hitButton", "isDisabled"]
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
}
.controls button {
  background-color: white;
  border: 1px solid grey;
  width: 5rem;
  margin: 0.4rem;
  border-radius: 10px;
  padding: 0.4rem;
  cursor: pointer;
}

.controls button:hover {
  background: blue;
  color: white;
  font-weight: 700;
}
.controls button[disabled]:hover{
    background: none;
    color:grey;
    font-weight: normal;
}
</style>
