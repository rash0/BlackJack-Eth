<template>
  <div class="network-status" :style="changeTextColor">
    <span :style="changeCircleColor" />
    {{ net }}
  </div>
</template>

><script>
export default {
  name: "NetworkStatus",
  data() {
    return {
      net: "No Connection"
    };
  },
  mounted() {
    this.getNetworkname();
  },
  beforeDestroy() {
    clearInterval(this.timr);
  },
  computed: {
    changeCircleColor() {
      return this.net === "No Connection"
        ? "background-color: rgb(223, 29, 29);animation: netStatus normal 1.6s infinite ease-in-out;"
        : undefined;
    },
    changeTextColor() {
      return this.net === "No Connection"
        ? "color: rgb(223, 29, 29)"
        : undefined;
    }
  },
  methods: {
    getNetworkname() {
      this.timr = setInterval(() => {
        const currentNetwork = Number(ethereum.networkVersion);
        this.$emit('network-id', currentNetwork)
        if (currentNetwork === 3) {
          this.net = "Ropsten Network";
        } else {
          this.net = "No Connection";
        }
      }, 1500);
    }
  }
};
</script>

<style>
.network-status {
  height: 1rem;
  border: 0.7px solid #cbd5e0;
  display: flex;
  font-size: 13px;
  font-weight: 300;
  align-self: center;
  align-items: center;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  border-radius: 20px;
}

.network-status span {
  width: 13px;
  height: 13px;
  background-color: #51d399;
  border-radius: 50%;
  margin: auto;
  margin-left: -3px;
  margin-right: 8px;
}

@keyframes netStatus {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
