<template>
  <div class="store">
    <TopBanner :data="data" />
    <div class="choice" v-if="data">
      <van-cell is-link title="已选择" @click="show = true" class="grey" />
    </div>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="data.product_id"
      :quota="0"
      :quota-used="0"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
    <BottomIntroduce :data="data" />
    <van-goods-action class="footer" style="z-index: 1999">
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
        @click="show = true"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="show = true"
      />
    </van-goods-action>
    <div class="return">
      <img class="goback" src="../assets/img/bn.png" @click="goBack" />
      <span class="line">|</span>
      <img class="gohome" src="../assets/pic2.svg" @click="goHome" />
    </div>
     <van-popup
      v-model="showPlay"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
    <PurchasePage @cancel="cancelPlay" @cancelShow='cancelShow' :playGoods="playGoods"/>
    </van-popup>
  </div>
</template>

<script>
import { store } from "@/api/homeview.js";
import { getSku } from "@/utilis/sku.js";
import { Toast } from "vant";
import { mapMutations } from "vuex";
import TopBanner from "@/components/store/TopBanner.vue";
import BottomIntroduce from "@/components/store/BottomIntroduce.vue";
import PurchasePage from './PurchasePage.vue';
export default {
  data() {
    return {
      id: this.$route.query.store_id,
      data: {},
      show: false,
      collection: false,
      showPlay:false,
      value: 1,
      sku: {},
      goods: {},
      playGoods:{}
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
    goBack() {
      this.$router.go(-1);
    },
     cancelPlay() {
      this.showPlay = false;
    },
      cancelShow() {
      this.show = false;
    },
    async getStoreData() {
      let { data } = await this.$axios(store(this.id));
      this.data = data;
      this.goods = { picture: data.image };
      let { image, product_id, price } = data;
      let footPrintData = {
        id:new Date().getTime(),
        image,
        product_id,
        price,
      }; 
      this.HistoricalFootprint(footPrintData)
      this.sku = getSku(data);
      this.isCollection(data);
      this.collection = this.$store.state.ischoice;
    },
    onBuyClicked(a) {
      this.showPlay = true;
      let { goodsId, selectedNum, selectedSkuComb } = a;
      let { price, s1, s2 } = selectedSkuComb;
      let { store_name, image, mer_id, merchant } = this.data;
       this.playGoods = {
        price: price / 100,
        product_id: goodsId,
        value: selectedNum,
        store_name,
        image,
        mer_id,
        mer_avatar: merchant.mer_avatar,
        mer_name: merchant.mer_name,
        s1,
        s2,
      };
    },
    addCollection() {
      this.collectionAdd(this.data)
      this.collection = !this.collection
    },
    onAddCartClicked(a) {
      Toast("加入成功");
      this.show = false;
      let { goodsId, selectedNum, selectedSkuComb } = a;
      let { price, s1, s2 } = selectedSkuComb;
      let { store_name, image, mer_id, merchant } = this.data;
      let data = {
        price: price / 100,
        product_id: goodsId,
        value: selectedNum,
        store_name,
        image,
        mer_id,
        mer_avatar: merchant.mer_avatar,
        mer_name: merchant.mer_name,
        s1,
        s2,
      };
      //  console.log(data);
      this.addgoods(data);
    },
    ...mapMutations([
      "addgoods",
      "collectionAdd",
      "isCollection",
      "paymentAdd",
      "HistoricalFootprint",
    ]),
  },
  components: {
    TopBanner,
    BottomIntroduce,
    PurchasePage,
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