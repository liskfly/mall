<template>
  <div class="firstpage" v-if="index == 0">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="{src,page,id} in topBanner" :key="page" @click="goLabel(id,page)">
        <img :src="src" style="width:100vw" class="banner">
      </van-swipe-item>
    </van-swipe>
    <div class="hot">
      <div class="item" @click="goHot('store',data.product_id)">
        <img :src="data.image">
        <span>促销单件</span>
      </div>
      <div v-for="({src,name,type,id},index) in hot" :key="index" class="item" @click="goHot(type,id,name)">
        <img :src="src">
        <span>{{name}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { Hot , HomeList } from "@/api/homeview.js"
export default {
  props: ['topBanner', 'index'],
  data () {
    return {
      hot: Hot,
      list: [],
      loading: false,
      finished: false,
      data:{}
    }
  },
  created(){
    this.getrecommendList()
  },
  methods: {
    goLabel(id,page) {
      this.$router.push(`/labels?labels_id=${id}&labels_page=${page}`)
    },
    goHot (type,id,name) {
      if(type == 'store'){
        this.$router.push(`/store?store_id=${id}`)
      }else {
        this.$router.push(`/hot?hot_type=${type}&hot_name=${name}`)
      }
    },
    async getrecommendList () {
        let { data } = await this.$axios(HomeList(1))
        this.data = data.list[0]
        console.log(this.data);
    }
  }
}
</script>

<style lang="scss" scoped>
.firstpage {
  width: 100%;

  .banner {
    box-sizing: border-box;
    padding: 8px;
    border-radius: 15px;
  }

  .hot {
    width: 100vw;
    display: flex;
    justify-content: space-around;
    // background-color: #f5f5f5;
    .item {
      width: 76px;
      height: 110px;
      padding: 10px 5px;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      border-radius: 10px;
      margin: 10px auto;
      border-radius: 5;
      background-color: white;
      justify-content: space-between;
      box-shadow: darkgrey 0px 0px 10px 0px;
      font-weight: 700;

      img {
        width: 65px;
        height: 65px;
      }
    }
  }
}
</style>