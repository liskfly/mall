<template>
  <div id="app">
    <div class="tab-bar">
      <router-link tag="div" class="tab-bar-item" to="/home">
        <div class="item home"></div>
        <span class="text">首页</span>
      </router-link>
      <router-link tag="div" class="tab-bar-item" to="/classification">
        <div class="item classification"></div>
        <span class="text">分类</span>
      </router-link>
      <router-link tag="div" class="tab-bar-item" to="/shoppingcart">
        <div class="item shoppingcart"></div>
        <span class="text">购物车</span>
      </router-link>
      <router-link tag="div" class="tab-bar-item" to="/user">
        <div class="item user"></div>
        <span class="text">我的</span>
      </router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss" scoped>
.tab-bar {
  width: 100vw;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  background-color: white;
  border-top: 1px solid grey;
  z-index: 10;
  .tab-bar-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .item {
      width: 30px;
      height: 30px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .text {
      font-size: 12px;
    }

    .home {
      background-image: url(./assets/img/1-001.png);
    }
    .classification {
      background-image: url(./assets/img/2-001.png);
    }
    .shoppingcart {
      background-image: url(./assets/img/3-001.png);
    }
    .user {
      background-image: url(./assets/img/4-001.png);
    }
    &.router-link-active {
      .home {
        background-image: url(./assets/img/1-002.png);
      }
      .classification {
        background-image: url(./assets/img/2-002.png);
      }
      .shoppingcart {
        background-image: url(./assets/img/3-002.png);
      }
      .user {
        background-image: url(./assets/img/4-002.png);
      }
      .text {
        color: #e93323;
      }
    }
  }
}
</style>
