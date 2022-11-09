<template>
  <div class="return">
    <img class="goback" src="../assets/img/bn.png" @click="goBack">
    <span class="line">|</span>
    <img class="gohome" src="../assets/pic2.svg" @click="goHome">
  </div>
</template>

<script>
export default {
  methods: {
    goHome () {
      this.$router.push(`/home`)
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>


<style lang="scss" scoped>
.return {
  padding: 5px;
  border-radius: 90px;
  display: flex;
  background: rgba(0, 0, 0, 0.3);
  align-items: center;
  position: fixed;
  top: 10px;
  left: 20px;
  z-index: 18;

  .line {
    margin: 0 10px 0 10px;
    color: white;
    font-size: 20px;
  }

  .goback {
    width: 24px;
    height: 24px;
  }

  .gohome {
    width: 20px;
    height: 20px;
    margin: 0 8px;
  }
}
</style>