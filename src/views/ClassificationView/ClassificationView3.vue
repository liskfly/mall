<template>
  <div class="cation">
    <div class="header">
      <div class="title">
        <span>商品分类</span>
      </div>
      <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
      />
    </div>

    <div class="classList">
      <div class="loading" v-if="loading">
        <van-loading text-color="red" color="red" size="24px" vertical
          >加载中...</van-loading
        >
      </div>

      <div class="classList-left" ref="sidebar">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(c, i) in classGoodlist"
            :title="c.cate_name"
            :key="i"
            @click="choose(i)"
          />
        </van-sidebar>
      </div>
      <div
        class="list"
        ref="scrollbar"
        id="list"
        @scroll.passive="handleScroll"
      >
        <div
          class="item"
          v-for="(c, i) in classGoodlist"
          :key="i"
          :id="'scroll' + i"
        >
          <div class="good" v-for="b in c.children" :key="b.cate_name">
            <div class="good-name">{{ b.cate_name }}</div>
            <div class="good-card">
              <div class="card" v-for="a in b.children" :key="a.cate_name">
                <img v-lazy="a.pic" :alt="a.cate_name" />
                <p>{{ a.cate_name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getClassGoods } from "@/api/classification";
export default {
  data() {
    return {
      classGoodlist: [],
      loading: true,
      value: "",
      activeKey: 0,
      listscrollTop: 0,
      listHeight: [
        0, 7845, 10128, 11175, 12459, 13601, 14457, 18117, 19259, 21685, 23636,
        24160, 25398, 25541, 25922, 26351, 27112, 27255,
      ],
    };
  },
  mounted() {
    this.getClassList();
  },
  watch: {
    listscrollTop(a) {
      this.activeTitle(a);
    },
    activeKey(a) {
      if (a >= 5) {
        this.$refs.sidebar.scrollTop = (a - 5) * 48;
      }
    },
  },
  methods: {
    async getClassList() {
      let { data } = await this.$axios(getClassGoods);
      this.classGoodlist = data.list;
      this.loading = false;
    },
    choose(index) {
      this.activeKey = index;
      let navPage = document.querySelector("#scroll" + index);
      this.$refs.scrollbar.scrollTop = navPage.offsetTop - 70;
    },
    handleScroll() {
      this.listscrollTop = parseInt(document.querySelector("#list").scrollTop);
    },
    activeTitle(a) {
      for (let b = 0; b < this.listHeight.length; b++) {
        if (a < 7400) {
          this.activeKey = 0;
        } else {
          if (
            a >= this.listHeight[b - 1] - 400 &&
            a < this.listHeight[b] - 400
          ) {
            this.activeKey = b - 1;
          }
        }
        if (a > 26936) {
          this.activeKey = 17;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.cation {
  background-color: #f7f8fa;
  .header {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 10;
    .title {
      display: flex;
      width: 100%;
      padding: 10px 0;
      background-color: #f7f8fa;
      span {
        margin: auto;
      }
    }
    .van-search {
      padding: 5px 12px;
      height: 34px;
      .van-search__content {
        height: 24px;
        .van-cell {
          padding: 0;
          .van-field__body {
            .van-field__control {
              height: 24px;
            }
          }
        }
      }
    }
  }
  .classList {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    .loading {
      position: absolute;
      padding-top: 75%;
      padding-left: 45%;
    }
    .classList-left {
      width: 21%;
      height: calc(100vh - 120px);
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .van-sidebar-item {
        padding: 14px 12px;
        background-color: white;
      }
      .van-sidebar-item--select::before {
        left: 0;
        top: 0;
        width: 2px;
        height: 48px;
        transform: scale(1);
        transform-origin: top;
        transition: all 0.5s ease-in-out;
      }
      .van-sidebar-item--select,
      .van-sidebar-item--select:active {
        background-color: #f7f8fa;
        color: red;
        font-weight: bold;
        // transition: all .5s linear;
      }
      .van-sidebar-item--select:active::before {
        transform: scale(0);
      }
    }

    .list {
      flex: 1;
      height: calc(100vh - 120px);
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .good {
        display: flex;
        flex-direction: column;
        .good-name {
          font-size: 14px;
          font-weight: bold;
          padding: 17px 12px;
        }
        .good-card {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          // box-shadow: 1px 5px 5px gray;
          padding: 10px 20px;
          display: flex;
          background-color: #fff;
          flex-wrap: wrap;
          gap: 20px 34px;
          .card {
            // margin: 10px 0;

            display: flex;
            flex-direction: column;
            align-items: center;
            width: 60px;
            img {
              margin: auto;
              width: 60px;
              height: 60px;
            }
            p {
              width: 60px;
              font-size: 12px;
              color: #888;
              text-align: center;
              line-height: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  @keyframes load {
    0% {
      transform: translateY(48px);
    }
    100% {
      transform: translateY(0);
    }
  }
}
</style>