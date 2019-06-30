<template>
  <span class="card">
    <div style="display: flex; flex-flow: column;align-items: baseline;">
      <h4>{{card.num}}</h4>
      <img :src="card.img" width="20" />
    </div>
    <div style="display: flex; flex-flow: column-reverse;align-items: end;">
      <h4>{{card.num}}</h4>
      <img :src="card.img" width="20" />
    </div>
  </span>
</template>

<script>
export default {
  name: 'Card',
  props: ['card']
}
</script>

<style>
.card {
  width: 7.5rem;
  height: 12rem;
  border: 1px solid blue;
  border-radius: 7px;
  align-self: center;
  display: flex;
  padding: 15px;
  margin-left: 5px;
  margin-right: 5px;
}
.card div {
  width:100%;
}
</style>

