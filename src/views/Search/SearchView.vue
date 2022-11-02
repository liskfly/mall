<template>
  <div class="search">
    <div class="header">
      <van-search
        v-model="searchStr"
        @search="onSearch"
        shape="round"
        placeholder="请输入搜索关键词"
      />
      <div class="searchbtn" @click="cancel">取消</div>
    </div>
    <div class="search-hositly">
      <div class="hositly">
        <span class="text">搜索历史</span
        ><span class="clear" @click="clearSearch">X</span>
      </div>
      <div class="search-box">
        <span
          v-for="s in searchList"
          :key="s.searchId"
          @click="onSearch(s.text)"
          >{{ s.text }}</span
        >
      </div>
    </div>
    <div class="hot">
      <p>热搜词</p>
      <div class="hot-box">
        <span
          v-for="h in hotKeyword"
          :key="h.group_data_id"
          @click="onSearch(h.keyword)"
          >{{ h.keyword }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { getHotWord } from "@/api/searchApi";
export default {
  data() {
    return {
      searchStr: "",
      searchList: JSON.parse(localStorage.getItem("SEARCH_LIST")) || [],
      hotKeyword: [],
    };
  },
  created() {
    this.getHotKeyword();
  },
  methods: {
    cancel() {
      let a = false;
       this.searchStr = "";
      this.$emit("cancel", a);
    },
    onSearch(a) {
      this.searchStr = a;
      let b = this.searchList.find(({ text }) => text == a);
      if (!b && a) {
        this.searchList.unshift({
          searchId: Date.now(),
          text: a,
        });
        let searchArr = JSON.stringify(this.searchList);
        localStorage.setItem("SEARCH_LIST", searchArr);
      }
      this.$router.push(`/classify?classify_keyword=${a}`);
    },
    async getHotKeyword() {
      let { data } = await this.$axios(getHotWord);
      this.hotKeyword = data;
    },
    clearSearch() {
      this.searchList = [];
      this.searchStr = "";
      let searchArr = JSON.stringify(this.searchList);
      localStorage.setItem("SEARCH_LIST", searchArr);
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100vh;
  background-color: #fff;

  .header {
    display: flex;
    padding: 0 3vw;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 45px;
    img {
      width: 24px;
      height: 24px;
    }
    .van-search {
      width: 280px;
      height: 45px;
    }
  }
  .search-hositly {
    padding: 0 3vw;
    margin-top: 20px;
    .hositly {
      display: flex;
      justify-content: space-between;
      .clear {
        color: #999;
      }
    }

    .search-box {
      margin: 10px 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      span {
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
  .hot {
    padding: 0 3vw;
    margin-top: 20px;
    .hot-box {
      margin: 10px 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      span {
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
}
</style>