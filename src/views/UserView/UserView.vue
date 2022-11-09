<template>
  <div class="user">
    <div class="top">
      <div class="flex topbox justify-SB">
        <img src="../../assets/img/me.jpg" class="head">
        <div class="flex flex-1 justify-SB flex-d-c userdata">
          <span>{{'用户名:' +name}}</span>
          <div>
            <span>{{'关注:0'}}</span>
            <span>{{'收藏:0'}}</span>
          </div>
        </div>
        <div class="enter flex">
          <img src="../../assets/img/mP.png">
        </div>
      </div>
    </div>
    <div class="buy">
      <div class="payment buy-list">
        <img src="../../assets/payment.svg">
        <span>待付款</span>
      </div>
      <div class="delivery buy-list">
        <img src="../../assets/delivery.svg">
        <span>待发货</span>
      </div>
      <div class="Receipt buy-list">
        <img src="../../assets/Receipt.svg">
        <span>待送到</span>
      </div>
      <div class="collection buy-list">
        <img src="../../assets/collection.svg">
        <span>收藏</span>
      </div>
      <div class="subscribe buy-list">
        <img src="../../assets/subscribe.svg">
        <span>订阅</span>
      </div>
    </div>
    <div class="list">
      <div class="listbox">
        <div class="flex">
          <img src="../../assets/goodscar.svg" class="pic">
          <span>购物车</span>
        </div>
        <img src="../../assets/img/mP.png" class="enter">
      </div>

      <div class="listbox">
        <div class="flex">
          <img src="../../assets/affiliate.svg" class="pic">
          <span>分公司</span>
        </div>
        <img src="../../assets/img/mP.png" class="enter">
      </div>

      <div class="listbox">
        <div class="flex">
          <img src="../../assets/aboutus.svg" class="pic">
          <span>关于我们</span>
        </div>
        <img src="../../assets/img/mP.png" class="enter">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  created () {
    this.getUserName()
  },
  methods: {
    getUserName () {
      this.name = JSON.parse(window.sessionStorage.getItem('token')).user
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/img/bg.jpg);
  background-size: 100% 100%;

  .flex {
    display: flex;
  }

  .justify-SB {
    justify-content: space-between;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-d-c {
    flex-direction: column;
  }

  .top {
    padding: 30px 10px 10px;
    align-items: center;

    .topbox {
      padding: 15px;
      background-color: white;
      border-radius: 10px;
      .head {
        width: 70px;
        border-radius: 10px;
        margin-right: 20px;
      }

      .enter {
        height: 70px;
        img {
          margin: auto;
          width: 8px;
          height: 16px;
        }
      }

      .userdata {
        height: 70px;
      }
    }
  }

  .list {
    padding: 10px;

    .listbox {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background-color: white;
      margin: 15px 0;
      border-radius: 10px;

      .pic {
        width: 16px;
        margin-right: 10px;
      }

      .enter {
        width: 8px;
        height: 16px;
      }
    }
  }

  .buy {
    margin: 10px;
    padding: 15px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;

    .buy-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 30px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>