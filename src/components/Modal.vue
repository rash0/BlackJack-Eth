<template>
  <!-- props.modalStatus? 'block': 'none', left: '0', top: '0' -->
  <div class="modal" :style="modalState ? 'display: block': 'display: none; left:0; top: 0;'">
    <div class="modal-content">
      <span class="close" @click="modalState = false">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ['state'],
  data() {
    return {
      modalState: this.state
    }
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 11% auto;
  /* padding: 10px; */
  border: 1px solid #888;
  width: 26rem;
  display: flex;
  flex-direction: column;
}

/* The Close Button */
.close {
  color: #aaa;
  font-size: 24px;
  align-self: flex-end;
  margin-right: 14px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
