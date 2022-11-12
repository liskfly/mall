<template>
  <div class="classify">
    <div class="box">
      <div class="header">
        <img
          src="@/assets/img/weex_video_ic_return_back.png"
          alt="goBack"
          @click.stop="goBack"
        />
        <van-search
          v-model="searchStr"
          @search="onSearch"
          shape="round"
          background="#E93323"
          placeholder="请输入搜索关键词"
        />
        <div
          class="handoff"
          :class="{ clome: handoff }"
          @click="handoff = !handoff"
        ></div>
      </div>
      <div class="sift">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="value1"
            :options="option1"
            @change="setListType"
          />
          <van-dropdown-item
            v-model="value2"
            :options="option2"
            @change="setListType2"
          />
        </van-dropdown-menu>
        <div class="choose" @click="showSift = true">筛选</div>
      </div>
    </div>
    <van-popup
      v-model="showSift"
      round
      position="right"
      :style="{ width: '75%', height: '100%' }"
    >
      <div class="box-choose">
        <div class="price">
          <p>价格范围</p>
          <div class="price-box">
            <div class="input1">
              <input type="text" v-model="price1" placeholder="最低价" />
            </div>
            <span>--</span>
            <div class="input1">
              <input type="text" v-model="price2" placeholder="最高价" />
            </div>
          </div>
        </div>
        <div class="brand">
          <p>品牌</p>
          <div class="store-box">
            <span
              class="c-store"
              :class="{ active: brand == b.brand_id }"
              v-for="b in brandList"
              :key="b.brand_id"
              @click="setBrand(b.brand_id)"
            >
              {{ b.brand_name }}
            </span>
          </div>
        </div>
        <div class="btn">
          <div class="btn1 reset" @click="reset">重置</div>
          <div class="btn1 curr" @click="determine">确定</div>
        </div>
      </div>
    </van-popup>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="list-pane" :class="{ active: handoff }">
        <div
          class="goods-card"
          v-for="g in goodsList"
          :key="g.product_id"
          @click="goToGoods(g.product_id)"
        >
          <img v-lazy="g.image" :alt="g.store_info" />
          <div>
            <div class="product-megs">
              <p>{{ g.store_name }}</p>
              <span>&yen;{{ g.price }}</span>
            </div>
            <div class="comment">
              <span class="type">{{ g.merchant.type_name }}</span>
              <div class="scoce">
                <span>{{ g.rate }}评分</span>
                <span>{{ g.reply_count }}条评论</span>
              </div>
              <span class="store-name" @click.stop="goToStoreDetil(g.mer_id)">{{ g.merchant.mer_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <!-- </van-pull-refresh> -->
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { option1, option2, storeType } from "@/dataModel/type.js";
import { getStoreCoodsApi, getStoreBrandApi } from "@/api/classify.js";
export default {
  data() {
    return {
      option1: option1,
      option2: option2,
      storeType: storeType,
      goodsList: [],
      brandList: [],
      showSift: false,
      isLoading: false,
      loading: false,
      finished: false,
      handoff: false,
      page: 0,
      count: 0,
      shopId: "",
      searchStr: "",
      value1: "",
      value2: "",
      value3: "",
      price1: "",
      price2: "",
      brand: "",
    };
  },
  watch: {
    "$route.query.category_id": {
      handler(val) {
        if (val) {
          this.setListId(val);
        }
      },
      immediate: true,
    },
    "$route.query.mer_id": {
      handler(val) {
        if (val) {
          this.shopId = val;
          this.getGoodsList();
          this.getBrand();
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState(["listType"]),
  },
  methods: {
    async getGoodsList() {
      this.page++;
      let { data } = await this.$axios(
        getStoreCoodsApi(this.shopId, this.listType, this.page)
      );
      this.goodsList = [...this.goodsList, ...data.list];
      if (data.count == this.goodsList.length) {
        this.finished = true;
      }
      //   console.log(this.goodsList);
    },
    async getBrand() {
      let { data } = await this.$axios(
        getStoreBrandApi(this.shopId, this.listType)
      );
      this.brandList = data.list;
    },
    ...mapMutations(["setListId", "setListKeyword", "resetListType"]),
    onSearch(a) {
      this.listType.keyword = a;
      this.page=0
      this.goodsList = [];
      this.getGoodsList();
      this.getBrand();
    },
    setListType(a) {
      this.value2 = "";
      this.listType.order = a;
      if (a == "") {
        this.reset();
      }
      this.page = 0;
      this.goodsList = [];
      this.getGoodsList();
    },
    setListType2(a) {
      this.value1 = "";
      this.listType.order = a;
      this.page = 0;
      this.goodsList = [];
      this.getGoodsList();
    },
    setStore(a) {
      this.value3 = a;
    },
    setBrand(a) {
      this.brand = a;
    },
    reset() {
      this.price1 = "";
      this.price2 = "";
      this.value3 = "";
      this.brand = "";
    },
    determine() {
      this.showSift = false;
      this.listType.price_on = this.price1;
      this.listType.price_off = this.price2;
      this.listType.trader = this.value3;
      this.listType.brand_id = this.brand;
      this.page = 0;
      this.goodsList = [];
      this.getGoodsList();
    },
    goToGoods(a) {
      this.$router.push(`/store?store_id=${a}`);
    },
    goBack() {
      this.resetListType();
      this.goodsList = [];
      this.page = 0;
      this.$router.go(-1);
    },
     goToStoreDetil(a){
      this.$router.push(`/shop?shop_id=${a}`)
    },
    onRefresh() {
      setTimeout(() => {
        this.getGoodsList();
      }, 1000);
    },
    onLoad() {
      this.getGoodsList();
    },
  },
};
</script>
<style lang="scss" scoped>
.classify {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(248 245 245);
  overflow: auto;
  z-index: 11;
  &::-webkit-scrollbar {
    display: none;
  }
  .box {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    .header {
      display: flex;
      padding: 0 3vw;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 45px;
      background-color: #e93323;
      img {
        width: 24px;
        height: 24px;
      }
      .van-search {
        width: 280px;
        height: 45px;
      }
      .handoff {
        width: 20px;
        height: 20px;
        background-image: url(@/assets/handoff1.svg);
        background-repeat: no-repeat;
        background-size: contain;
      }
      .clome {
        background-image: url(@/assets/handoff2.svg);
      }
    }
    .sift {
      display: flex;
      justify-content: space-between;
      .van-dropdown-menu {
        width: 300px;
      }
      .choose {
        width: 30vw;
        height: 48px;
        text-align: center;
        line-height: 48px;
        background-color: #fff;
        box-shadow: 0px 2px 12px rgb(100 101 102 / 12%);
      }
    }
  }
  .box-choose {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    .price {
      display: flex;
      flex-direction: column;
      padding: 15px 0;
      p {
        font-size: 12px;
        font-weight: bold;
      }
      .price-box {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        gap: 10px;

        .input1 {
          display: flex;
          border-radius: 999px;
          width: 90px;
          height: 20px;
          padding: 0 15px;
          background-color: #d5d5d58c;
          input {
            margin: auto;
            width: 60px;
            height: 14px;
            outline: none;
            border: none;
            background-color: transparent;
          }
        }
      }
    }
    .brand {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 15px 0;

      p {
        font-size: 12px;
        font-weight: bold;
      }
      .store-box {
        display: flex;
        gap: 10px;
        // justify-content: flex-start;
        flex-wrap: wrap;
        width: 240px;
        max-height: 53vh;
        margin-top: 20px;
        overflow: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .c-store {
          // margin: 20px 10px;
          font-size: 13px;
          color: #666;
          padding: 0 10px;
          height: 30px;
          background: #f2f2f2;
          border-radius: 11px;
          line-height: 30px;
          text-align: center;
          width: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .btn {
      // margin-top: 22vh;
      display: flex;
      // margin-top: 25px;
      justify-content: space-between;
      .btn1 {
        border-radius: 999px;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
      .reset {
        border: 1px solid #999;
      }
      .curr {
        color: #fff;
        background-color: red;
      }
    }
    .active {
      color: red;
      border: 1px solid rgba(229, 17, 17, 0.6);
    }
  }
  .list-pane {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 10px;
    padding: 5px 2vw;
    // width: 100%;
    // height: calc(100vh - 93px);

    // overflow: auto;
    //   z-index: 200;
    .goods-card {
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      width: 175px;
      height: 300px;
      overflow: hidden;
      background-color: #fff;
      img {
        width: 175px;
        height: 175px;
      }
      .product-megs {
        margin-top: 5px;
        padding: 0 10px;
        p {
          font-size: 13px;
          line-height: 18px;
          margin-bottom: 5px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        span {
          color: red;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .comment {
        margin-top: 5px;
        padding: 0 10px;
        flex: 1;
        .type {
          border-radius: 3px;
          padding: 2px 5px;
          font-size: 12px;
          color: #fff;
          background-color: red;
        }
        .scoce {
          margin: 10px 0;
          color: #777;
          font-size: 1.5vw;
        }
        .store-name {
          color: #777;
          font-size: 3.5vw;
        }
      }
    }
  }
  .active {
    flex-direction: column;
    flex-wrap: wrap;
    background-color: #fff;
    .goods-card {
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: 0;
      height: 120px;
      overflow: hidden;
      background-color: #fff;
      img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
      div {
        .product-megs {
          p {
            width: 240px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>