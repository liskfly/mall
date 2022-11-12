<template>
  <div class="hot">
    <div class="background-top"></div>
    <img :src="banner" class="banner">
    <div class="recommend">
      <div class="recommend_count">
        <div class="title">{{name}}</div>
        <div class="recommend_goods">
          <div v-for="({product_id,image,store_name}) in recommend" :key="product_id" class="item"
            @click="goShop(product_id)">
            <img v-lazy="image">
            <span>{{store_name}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="({store_name,image,product_id,merchant,price}) in list" :key="product_id" class="list_item" @click="goShop(product_id)">
          <img v-lazy="image" class="store">
          <div class="store_title">
            <span class="store_name">{{store_name}}</span>
            <div class="type_name">
              <div>{{merchant.type_name}}</div>
            </div>
            <div class="Price">
              <span>{{'¥' + price}}</span>
              <img src="../assets/img/3-002.png">
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <PageReturn />
  </div>
</template>

<script>
import { hotTop, hotList } from "@/api/homeview.js"
import PageReturn from "./PageReturn.vue";
export default {
  data () {
    return {
      type: this.$route.query.hot_type,
      banner: '',
      recommend: [],
      list: [],
      name: this.$route.query.hot_name,
      page: 0,
      loading: false,
      finished: false,
    }
  },
  created () {
    this.getHot()
  },
  watch: {
    "$route.query.hot_type" (a, b) {
      if (a != b && a) {
        this.type = a
        this.page = 0
        this.recommend = []
        this.list = []
        this.getHot();
        this.getHotList()
      }
    },
  },
  methods: {
    async getHot () {
      let { data } = await this.$axios(hotTop(this.type))
      this.banner = data[0].pic
    },
    async getHotList () {
      this.page++
      let { data } = await this.$axios(hotList(this.type, this.page))
      data.list.forEach((item, index) => {
        if (index < 3 && this.page < 2) {
          this.recommend.push(item)
        } else {
          this.list.push(item)
        }
      })
      this.loading = false;
    },
    onLoad () {
      setTimeout(() => {
        this.getHotList()
        if (this.page >= 3) {
          this.finished = true;
        }
      }, 1000);
    },
    goShop (id) {
      this.$router.push(`/store?store_id=${id}`)
    }
  },
  components: {
    PageReturn
  }
}
</script>

<style lang="scss" scoped>
.hot {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: #f5f5f5;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .background-top {
    width: 100vw;
    height: 13vh;
    background-color: #e93323;
    border-radius: 0 0 10px 10px;
    position: absolute;
    top: 0;
    z-index: -1;
  }

  .banner {
    box-sizing: border-box;
    width: calc(100% - 20px);
    margin: 15px 10px 0;
    border-radius: 10px;
  }

  .recommend {
    width: 100%;
    min-height: 208px;
    max-height: 208px;
    box-sizing: border-box;
    padding: 15px 10px 0;

    .recommend_count {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      background-image: url(../assets/img/background.png);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      background-color: white;

      .title {
        padding: 10px 0;
        font-size: 16px;
        font-weight: 700;
      }

      .recommend_goods {
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;

        .item {
          width: 30%;
          max-width: 125px;
          display: flex;
          flex-direction: column;

          img {
            width: 100%;
            border-radius: 10px 10px 0 0;
          }

          span {
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 13px;
            margin-top: 10px;
          }
        }
      }
    }
  }

  .list {
    width: calc(100% - 20px);
    margin: 15px 10px 0;
    display: flex;
    flex-direction: column;

    .list_item {
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      margin-bottom: 10px;
      border-radius: 10px;

      .store {
        width: 90px;
        border-radius: 5px;
        margin-right: 20px;
      }

      .store_title {
        width: 225px;
        height: 90px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .store_name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 15px;
        }

        .type_name {
          width: 58px;
          color: #fff;
          padding: 5px;
          border-radius: 5px;
          font-size: 12px;
          background-color: #e93323;
          display: flex;

          div {
            margin: auto;
          }
        }

        .Price {
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            color: #e93323;
          }

          img {
            width: 24px;
          }
        }
      }
    }
  }
}
</style>