<template>
  <div class="store">
    <TopBanner :data="data" />
    <div class="choice" v-if="data">
      <van-cell is-link title="已选择" @click="show = true" class="grey" />
    </div>
    <van-action-sheet v-model="show" title=" ">
      <div class="content">
        <div class="show">
          <img :src="data.image" />
          <div class="details">
            <span class="store_name">{{ data.store_name }}</span>
            <div>
              <span class="price">{{ "¥" + data.price }}</span>
              <span class="stock">{{ "库存:" + data.stock }}</span>
            </div>
          </div>
        </div>
        <div class="carnum">
          <span>数量</span>
          <van-stepper
            v-model="value"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>
      </div>
    </van-action-sheet>
    <BottomIntroduce :data="data" />
    <van-goods-action class="footer" style="z-index: 2011">
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />

      <van-goods-action-icon
        icon="star"
        text="已收藏"
        @click="addCollection()"
        color="#ff5000"
        v-show="collection"
      />
      <van-goods-action-icon
        icon="star"
        text="未收藏"
        @click="addCollection()"
        color="grey"
        v-show="!collection"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addShoppingCart(data)"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="addPayment()"
      />
    </van-goods-action>
    <div class="return">
      <img class="goback" src="../assets/img/bn.png" @click="goBack" />
      <span class="line">|</span>
      <img class="gohome" src="../assets/pic2.svg" @click="goHome" />
    </div>
  </div>
</template>

<script>
import { store } from "@/api/homeview.js"
import { mapMutations } from "vuex"
import TopBanner from "@/components/store/TopBanner.vue"
import BottomIntroduce from "@/components/store/BottomIntroduce.vue"
export default {
  data() {
    return {
      id: this.$route.query.store_id,
      data: {},
      show: false,
      collection: false,
      // loading: true,
      value: 1,
    };
  },
  created() {
    this.getStoreData();
  },
  watch: {
    "$route.query.store_id"(a, b) {
      this.id = a;
      if (a != b && a) {
        this.getStoreData();
      }
    },
  },
  methods: {
    goHome() {
      this.$router.push(`/home`);
    },
    goBack () {
      this.$router.go(-1)
    },
    async getStoreData () {
      let { data } = await this.$axios(store(this.id))
      this.data = data
      this.isCollection(data)
      this.collection = this.$store.state.ischoice
    },
    addShoppingCart (data) {
      let { price, product_id, store_name, image, mer_id, merchant } = data
      let mer_avatar = merchant.mer_avatar
      if (!this.show) {
        data = { price, product_id, store_name, image, mer_id, mer_avatar, value: 1 }
      } else {
        data = { price, product_id, store_name, image, mer_id, mer_avatar, value: this.value }
        console.log(this.value);
      }
      this.addgoods(data)
    },
    addCollection () {
      let { price, product_id, store_name, image, mer_id, merchant } = this.data
      let mer_avatar = merchant.mer_avatar
      let data = { price, product_id, store_name, image, mer_id, mer_avatar }
      this.collectionAdd(data)
      this.collection = !this.collection
    },
    addPayment () {
      let { price, product_id, store_name, image, mer_id, merchant } = this.data
      let mer_avatar = merchant.mer_avatar
      let data = { price, product_id, store_name, image, mer_id, mer_avatar, value: this.value }
      this.paymentAdd(data)
    },
    ...mapMutations(['addgoods', 'collectionAdd', 'isCollection','paymentAdd'])
  },
  components: {
    TopBanner,
    BottomIntroduce,
  },
};
</script>

<style lang="scss" scoped>
.store {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: #f5f5f5;
  overflow: auto;
  position: relative;
  .grey {
    color: grey;
  }
  .choice {
    margin-top: 10px;
  }
  .loading {
    position: absolute;
    padding-top: 75%;
    padding-left: 45%;
  }
  .content {
    padding: 16px 16px 100px;
    position: relative;

    .carnum {
      width: calc(100% - 32px);
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 60px;
      left: 16px;
    }

    .show {
      display: flex;
      justify-content: center;

      img {
        width: 73px;
      }

      .details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px;

        .price {
          color: rgb(233 51 35);
          font-size: 18px;
          margin-right: 5px;
        }

        .stock {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }

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
      width: 30px;
      height: 30px;
    }

    .gohome {
      width: 23px;
      height: 23px;
      margin: 0 8px;
    }
  }
}
</style>