<template>
  <div class="Header">
    <img src="../assets/logo.svg" width="50" />
    <div class="details">
      <NetworkStatus />
      <div class="account-amount">0.5 ETH</div>
    </div>
  </div>
</template>

<script>
import NetworkStatus from "./NetworkStatus";

export default {
  components: {
    NetworkStatus
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

.account-amount {
  align-self: center;
  margin-left: 1rem;
  font-size: 13px;
  font-weight: 300;
}
</style>
