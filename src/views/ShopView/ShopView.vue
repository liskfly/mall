<template>
  <div class="shop">
    <div
      class="shopHeader"
      v-for="s in store"
      :key="s.mer_id"
      :style="{
        backgroundImage:
          'linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 100%),url(' +
          s.mer_banner +
          ')',
        backgroundColor: '#fff',
      }"
    >
      <div class="head">
        <PageReturn />
        <div class="search">
          <img src="../../assets/search.svg" alt="" @click="goToClassify" />
        </div>
      </div>
      <div class="store-message">
        <img :src="s.mer_avatar" :alt="s.mer_name" />
        <div class="store-name">
          <div class="message">
            <span>{{ s.type_name }}</span>
            <div>{{ s.mer_name }}</div>
          </div>
          <div class="commtent">
            <i></i><span>{{ s.product_score }}</span>
          </div>
        </div>
        <div class="concern">
          <i></i>
          <span :class="{active:true}" @click="subscribe(s)">订阅</span>
        </div>
      </div>
      <div class="nav" v-if="chooseShop == 'home'">
        <div class="store-nav">
          <div
            class="item"
            v-for="o in option1"
            :key="o.text"
            :class="{ active: o.text == chooseText }"
            @click="chageOrder(o.text, o.value)"
          >
            {{ o.text }}
          </div>
          <!-- <div class="item">评分</div>
          <div class="item">销量</div>
          <div class="item">价格</div>
          <div class="item">新品</div>
          <div class="item">活动</div> -->
        </div>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <component
        :is="choose"
        :storeGoods="storeGoods"
        :shopId="shopId"
        :storeClassify="storeClassify"
      />
    </van-list>
    <div class="tabbar">
      <div
        class="tab-bar-item"
        :class="{ active: chooseShop == 'home' }"
        @click="setClass('home')"
      >
        <div
          class="item home"
          :class="{ activeHome: chooseShop == 'home' }"
        ></div>
        <span class="text">首页</span>
      </div>
      <div
        class="tab-bar-item"
        :class="{ active: chooseShop == 'classify' }"
        @click="setClass('classify')"
      >
        <div
          class="item audio"
          :class="{ activeClassify: chooseShop == 'classify' }"
        ></div>
        <span class="text">分类</span>
      </div>
      <div
        class="tab-bar-item"
        :class="{ active: chooseShop == 'coupon' }"
        @click="setClass('coupon')"
      >
        <div
          class="item read"
          :class="{ activeCoupon: chooseShop == 'coupon' }"
        ></div>
        <span class="text">优惠</span>
      </div>
      <div
        class="tab-bar-item"
        :class="{ active: chooseShop == 'special' }"
        @click="setClass('special')"
      >
        <div
          class="item user"
          :class="{ activeSpecial: chooseShop == 'special' }"
        ></div>
        <span class="text">专场</span>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex"
import PageReturn from "../../components/PageReturn.vue";
import {
  getStoreApi,
  getStoreGoods,
  getStoreClassify,
  options1,
} from "@/api/storeApi.js";
import ShopHome from "@/views/ShopView/ShopChildren/ShopHome.vue";
import ShopCoupon from "@/views/ShopView/ShopChildren/ShopCoupon.vue";
import ShopClassify from "@/views/ShopView/ShopChildren/ShopClassify.vue";
import ShopSpecial from "@/views/ShopView/ShopChildren/ShopSpecial.vue";
export default {
  data() {
    return {
      shopId: this.$route.query.shop_id,
      chooseShop: "home",
      order: "",
      loading: false,
      chooseText: "默认",
      count: 0,
      page: 0,
      finished: false,
      list: "",
      option1: options1,
      store: [],
      storeGoods: [],
      storeClassify: [],
    };
  },
  watch: {
    "$route.query.shop_id": {
      handler(val) {
        if (val) {
          this.shopId = val;
          this.storeGoods = [];
          this.page = 0;
          this.getGoods();
          this.getStoreData();
          this.getClassify();
        }
      },
      immediate: true,
    },
    order(a, b) {
      if (a != b) {
        this.storeGoods = [];
        this.page = 0;
        this.getGoods();
      }
    },
  },
  computed: {
    choose() {
      if (this.chooseShop == "home") {
        return "ShopHome";
      } else if (this.chooseShop == "classify") {
        return "ShopClassify";
      } else if (this.chooseShop == "coupon") {
        return "ShopCoupon";
      } else {
        return "ShopSpecial";
      }
    },
  },
  methods: {
    setClass(a) {
      this.chooseShop = a;
    },
    async getStoreData() {
      let { data } = await this.$axios(getStoreApi(this.shopId));
      this.store = [{ ...data }];
    },
    async getGoods() {
      // if(this.chooseShop=='home'){
      this.page++;
      let { data } = await this.$axios(
        getStoreGoods(this.shopId, this.order, this.page)
      );
      this.storeGoods = [...this.storeGoods, ...data.list];
      this.loading = false;
      if (data.count == this.storeGoods.length || data.list == []) {
        this.finished = true;
      }
      // }
    },
    async getClassify() {
      let { data } = await this.$axios(getStoreClassify(this.shopId));
      this.storeClassify = data;
      // console.log(data);
    },
    chageOrder(a, b) {
      this.chooseText = a;
      this.order = b;
      if (a == "价格") {
        this.count++;
        if (this.count % 2 == 0) {
          this.order = "price_desc";
        } else {
          this.order = "price_asc";
        }
      } else {
        this.count = 0;
      }
    },
    onLoad() {
      this.getGoods();
    },
    goToClassify() {
      this.$router.push(`/classify-store?mer_id=${this.shopId}&category_id=`);
    },
    subscribe(s){
      let {mer_id,mer_name,mer_avatar,type_name,product_score}=s
      let storeArr={mer_id,mer_name,mer_avatar,type_name,product_score}
      this.addStore(storeArr)
    },
     ...mapMutations(["addStore"]),
  },
 
  components: { PageReturn, ShopHome, ShopCoupon, ShopClassify, ShopSpecial },
};
</script>
<style lang="scss" scoped>
.shop {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: #fff;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .shopHeader {
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 11;
    background: 0 0/375px 195px no-repeat fixed;
    overflow: hidden;
    .head {
      position: relative;
      width: 100%;
      height: 43px;
      .search {
        position: absolute;
        right: 20px;
        top: 12px;
        width: 24px;
        height: 24px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .store-message {
      display: flex;
      padding: 10px 3vw;
      img {
        width: 37px;
        height: 37px;
        border-radius: 6px;
      }
      .store-name {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 37px;
        margin-left: 10px;
        .message {
          display: flex;
          span {
            display: inline-block;
            background: #e93424;
            color: #fff;
            font-size: 10px;
            text-align: center;
            border-radius: 2px;
            padding: 0 2px;
            line-height: 14px;
            margin-right: 4px;
          }
          div {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 700;
            font-size: 15px;
            line-height: 1;
            color: #fff;
          }
        }
        .commtent {
          font-size: 12px;
          color: #fff;
          i {
            display: inline-block;
            position: relative;
            width: 55px;
            height: 9px;
            margin-right: 5px;
            background: url(@/assets/img/star_active.png) 0 0/55px 9px no-repeat;
          }
        }
      }
      .concern {
        flex: 1;
        height: 37px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        i {
          margin-right: 10px;
        }
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 56px;
          height: 24px;
          border-radius: 12px;
          background-image: linear-gradient(-90deg, #f67a38, #f11b09);
          font-weight: 500;
          font-size: 11px;
          color: #fff;
        }
        .active {
          color: #000;
          background-image: linear-gradient(-90deg, #cdcdcd, #ababab);
        }
      }
    }
    .nav {
      position: relative;
      .store-nav {
        padding: 0 5px;
        display: flex;
        align-items: center;
        height: 42px;
        color: #fff;
        .item {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 58px;
          height: 22px;
          border-radius: 11px;
          font-weight: 500;
          font-size: 12px;
          color: #fff;
        }
        .active {
          background-color: #fff;
          font-weight: 700;
          color: #f11b09;
        }
      }
      .selet {
        position: fixed;
        top: 142px;
        left: 0;
        z-index: 2;
        width: 100%;
        padding-right: 20px;
        padding-bottom: 14px;
        padding-left: 37px;
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
        background-color: #fff;
        box-shadow: 0 2px 10px 0 rgb(0 0 0 / 6%);
      }
    }
  }
  .tabbar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 55px;
    border-top: 1px solid #eee;
    background-color: #fff;
    // z-index: 999;
    .tab-bar-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      font-size: 13px;

      .item {
        width: 25px;
        height: 25.5px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .home {
        background-image: url(@/assets/home.svg);
      }
      .audio {
        background-image: url(@/assets/classify.svg);
      }
      .read {
        background-image: url(@/assets/coupon.svg);
      }
      .user {
        background-image: url(@/assets/special.svg);
      }
      .activeHome {
        background-image: url(@/assets/home1.svg);
      }
      .activeClassify {
        background-image: url(@/assets/classify2.svg);
      }
      .activeCoupon {
        background-image: url(@/assets/coupon2.svg);
      }
      .activeSpecial {
        background-image: url(@/assets/special2.svg);
      }
    }
    .active {
      color: #ff0000;
    }
  }
}
</style>