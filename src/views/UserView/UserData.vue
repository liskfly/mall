<template>
  <div class="userdata">
    <div class="top">
      <img src="../../assets/prev.svg" @click="goBack">
      <span>个人信息</span>
      <img src="../../assets/more.svg">
    </div>
    <div class="head">
      <img src="../../assets/img/me.jpg">
    </div>
    <div class="data">
      <span class="data-left">账号</span>
      <div class="data-center">
        <div>{{data.user}}</div>
      </div>
      <img class="data-right" src="../../assets/img/mP.png">
    </div>
    <div class="data" @click="showPopup">
      <span class="data-left">地址</span>
      <div class="data-center">
        <div>{{data.location}}</div>
      </div>
      <img class="data-right" src="../../assets/img/mP.png">
    </div>
    <div class="cancellation" @click="cancellation">
      <span>注销</span>
    </div>
    <van-popup v-model="show" position="right">
      <LocationPage :data="data" @hidden="pageHidden" />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex"
import LocationPage from "../../components/LocationWrite.vue"
export default {
  data () {
    return {
      show: false,
    }
  },
  computed: {
    ...mapState(['data'])
  },
  methods: {
    showPopup () {
      this.show = true;
    },
    goBack () {
      this.$router.go(-1)
    },
    pageHidden (value) {
      this.show = value
    },
    cancellation() {
        window.sessionStorage.setItem('token', JSON.stringify(''))
        this.$router.push(`/home`);
    }
  },
  components: {
    LocationPage
  }
}
</script>

<style lang="scss" scoped>
.userdata {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  background-color: rgb(245, 245, 245);

  .top {
    width: 100vw;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;

    img {
      width: 40px;
    }
  }

  .head {
    width: 100vw;
    height: 100px;
    display: flex;
    background-color: white;
    margin-bottom: 10px;

    img {
      width: 80px;
      border-radius: 999px;
      margin: auto;
    }
  }

  .data {
    width: 100vw;
    height: 40px;
    padding: 2px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid rgb(205, 205, 205);

    .data-left {
      font-size: 18px;
      margin-right: 30px;
      font-weight: 700;
    }

    .data-center {
      flex: 1;

      div {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .data-right {
      width: 10px;
      height: 20px;
    }
  }
  
  .cancellation {
    width: 100vw;
    height: 60px;
    background-color: white;
    position: absolute;
    bottom: 0;
    display: flex;

    span {
        font-size: 20px;
        font-weight: 700;
        margin: auto;
    }
  }
}
</style>