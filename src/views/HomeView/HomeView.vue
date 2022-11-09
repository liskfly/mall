<template>
  <div class="homeview" v-if="navlist[1]">
    <div class="homeview-top sticky">
      <img src="../../assets/pic1.svg" @click="showPopup" class="classification">
      <van-popup v-model="show" position="left" :style="{ width: '250px',height:'100%'}">
        <HomeLeft :left="left" />
      </van-popup>
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
      <div></div>
    </div>
    <van-tabs animated lazy-render sticky offset-top="54">
      <van-tab v-for="({cate_name,store_category_id},index) in navlist" :key="index">
        <template #title>
          <span @click="onClick(store_category_id)">{{cate_name}}</span>
        </template>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <FirstPage :topBanner="topBanner" :index="index" />
          <SecondaryPage :category="category" :index="index" />
          <div>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
              :immediate-check="false">
              <div class="recommend">
                <div v-for="({product_id,image,store_name,price,merchant}) in recommendList" :key="product_id"
                  class="recommend-list" @click="goStore(product_id)">
                  <img v-lazy="image" class="list-img" />
                  <div class="word">
                    <span class="store-name">{{store_name}}</span>
                    <span class="price">{{'¥' + price}}</span>
                    <span class="name">{{merchant.type_name}}</span>
                  </div>
                </div>
              </div>
            </van-list>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { HomeNav, banner, classification, Hot, HomeList, Secondary, categoryList } from "@/api/homeview.js"
import HomeLeft from "@/views/HomeView/HomeLeft.vue"
import FirstPage from "@/views/HomeView/FirstPage.vue"
import SecondaryPage from "@/views/HomeView/SecondaryPage.vue"
export default {
  data () {
    return {
      value: '',
      navlist: [{ cate_name: '首页', store_category_id: 0 }],
      topBanner: banner,
      show: false,
      left: classification,
      hot: Hot,
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      listNum: 0,
      recommendList: [],
      titleId: 0,
      category: []
    }
  },
  created () {
    this.getHomeNav()
    this.getrecommendList(this.recommendList, this.titleId)
  },
  methods: {
    async getHomeNav () {
      let { data } = await this.$axios(HomeNav)
      data.category.forEach((item) => {
        this.navlist.push(item)
      })
    },
    showPopup () {
      this.show = true;
    },
    onRefresh () {
      setTimeout(() => {
        this.listNum = 0
        this.recommendList = []
        this.getrecommendList(this.recommendList, this.titleId)
        this.getCategoryList(this.titleId)
        Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    onLoad () {
      setTimeout(() => {
        this.getrecommendList(this.recommendList, this.titleId)
        if (this.listNum >= 10) {
          this.finished = true;
        }
      }, 1000);
    },
    async getrecommendList (list, id) {
      this.listNum++
      if (id == 0) {
        let { data } = await this.$axios(HomeList(this.listNum))
        let result = data.list
        result.forEach(item => list.push(item))
        this.loading = false;
      } else {
        let { data } = await this.$axios(Secondary(id, this.listNum))
        let result = data.list
        result.forEach(item => list.push(item))
        this.loading = false;
      }

    },
    async getCategoryList (id) {
      let { data } = await this.$axios(categoryList(id))
      this.category = data
    },
    onClick (id) {
      if (this.titleId != id) {
        this.listNum = 0
        this.recommendList = []
        this.titleId = id
        this.getrecommendList(this.recommendList, this.titleId)
        this.getCategoryList(this.titleId)
      }
    },
    goStore(id) {
      this.$router.push(`/store?store_id=${id}`)
    }
  },
  components: {
    HomeLeft,
    FirstPage,
    SecondaryPage
  },
}
</script>

<style lang="scss" scoped>
.homeview {
  width: 100%;

  .sticky {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: white;
  }

  .homeview-top {
    height: 54px;
    justify-content: space-between;
    display: flex;
    align-items: center;

    .classification {
      margin-left: 10px;
      width: 24px;
    }

    .van-search {
      width: 300px;

      .van-search__content {
        background-color: #ededed;
      }
    }
  }

  .recommend {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    background-color: #f5f5f5;

    .recommend-list {
      width: calc((100vw - 2 * 10px - 10px) / 2);
      padding-bottom: 8px;
      display: flex;
      margin: 10px auto;
      flex-direction: column;
      border-radius: 10px;
      background-color: white;

      .list-img {
        height: 161px;
        border-radius: 10px 10px 0 0;
      }

      .word {
        padding: 8px;
        display: flex;
        flex-direction: column;

        .store-name {
          font-size: 13px;
          margin: 10px 0 5px 0;
        }

        .price {
          font-size: 17px;
          color: #e93323;
        }

        .name {
          box-sizing: border-box;
          width: 54px;
          font-size: 12px;
          padding: 3px;
          margin-top: 6px;
          color: white;
          background-color: #e93323;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>