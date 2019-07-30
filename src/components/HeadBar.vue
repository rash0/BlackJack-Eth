<template>
  <div class="Header">
    <img src="../assets/logo.svg" width="35" />
    <div class="details">
      <NetworkStatus />
      <Wallet />
    </div>
  </div>
</template>

<script>
import NetworkStatus from "./NetworkStatus";
import Wallet from "./Wallet";

export default {
  components: {
    NetworkStatus,
    Wallet
  }
};
</script>

<style>
.Header {
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  padding: 0rem 1rem 0rem 1rem;
}

.details {
  display: flex;
  justify-content: space-between;
}

</style>
