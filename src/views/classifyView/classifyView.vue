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
          background="rgb(202, 41, 41)"
          placeholder="请输入搜索关键词"
        />
        <img
          src="@/assets/img/weex_video_ic_return_back.png"
          alt="goBack"
          @click.stop="goBack"
        />
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
      :style="{ width: '70%', height: '100%' }"
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
        <div class="store">
          <p>店铺</p>
          <div class="store-box">
            <div
              class="c-store"
              :class="{ active: value3 == s.trader }"
              v-for="s in storeType"
              :key="s.text"
              @click="setStore(s.trader)"
            >
              {{ s.text }}
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
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="600"
      >
        <ListPane :goodsList="goodsList" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
import {  option1, option2, storeType } from "@/dataModel/type.js";
import {
  getClassGoodsApi,
  getBrandApi,
  getNextGoodsApi,
} from "@/api/classify.js";
import ListPane from "../../components/ListPane.vue";
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
      page: 1,
      count: 0,
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
    "$route.query.classify_id": {
      handler(val) {
        if (val) {
          this.setListId(val);
          this.getGoodsList(this.listType);
          this.getBrand(this.listType);
        }
      },
      immediate: true,
    },
    "$route.query.classify_keyword": {
      handler(val) {
        if (val) {
          this.setListKeyword(val);
          this.getGoodsList(this.listType);
          this.getBrand(this.listType);
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState(["listType"]),
  },
  methods: {
    async getGoodsList(a) {
      let { data } = await this.$axios(getClassGoodsApi(a));
      this.goodsList = data.list;
      this.count = data.count;
      if (data) {
        Toast("刷新成功");
        this.isLoading = false;
      }
      // console.log(this.goodsList);
    },
    async getBrand(a) {
      let { data } = await this.$axios(getBrandApi(a));
      this.brandList = data.list;
    },
    async getNextList(a) {
      // if (this.goodsList.length >= 30) {
      this.page++;
      let { data } = await this.$axios(getNextGoodsApi(a, this.page));
      this.goodsList.push(...data.list);
      this.loading = false;
      // }
    },
    ...mapMutations(["setListId", "setListKeyword","setListType"]),
    onSearch(a) {
      this.listType.keyword = a;
      // console.log(this.listType);
      this.getGoodsList(this.listType);
      this.getBrand(this.listType);
    },
    setListType(a) {
      this.value2 = "";
      this.listType.order = a;
      if (a == "") {
        this.reset();
      }
      this.getGoodsList(this.listType);
    },
    setListType2(a) {
      this.value1 = "";
      this.listType.order = a;
      this.getGoodsList(this.listType);
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
       this.listType.trader=this.value3
      this.listType.brand_id = this.brand;
      console.log(this.listType);
      this.getGoodsList(this.listType);
    },
    goBack() {
      this.setListType()
      this.goodsList = [];
      this.page = 1;
      this.$router.go(-1);
    },
    onRefresh() {
      setTimeout(() => {
        this.getGoodsList(this.listType);
      }, 1000);
    },
    onLoad() {
      setTimeout(() => {
        this.getNextList(this.listType);
        if (this.page > 6 || this.goodsList == this.count) {
          this.finished = true;
        }
      }, 1000);
    },
  },
  components: {
    ListPane,
  },
};
</script>
<style lang="scss" scoped>
.classify {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  // min-height: 100vh;
  background-color: #fff;
  //  overflow: auto;
  z-index: 11;
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
      background-color: rgb(202, 41, 41);
      img {
        width: 24px;
        height: 24px;
      }
      .van-search {
        width: 280px;
        height: 45px;
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
    position: relative;
    display: flex;
    flex-direction: column;
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
    .store {
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
        justify-content: space-between;
        margin-top: 20px;
        .c-store {
          border-radius: 999px;
          background-color: #d5d5d58c;
          width: 70px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 14px;
        }
      }
    }
    .brand {
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
        margin-top: 20px;
        height: 53vh;
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
          max-width: 75px;
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
}
</style>