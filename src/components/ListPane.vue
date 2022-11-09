<template>
  <div class="list-pane">
    <div class="goods-card" v-for="g in goodsList" :key="g.product_id" @click="goToGoods(g.product_id)">
      <img v-lazy="g.image" :alt="g.store_info" />
      <div class="product-megs">
        <p>{{ g.store_name }}</p>
        <span>&yen;{{ g.price }}</span>
      </div>
      <div class="comment">
        <span class="type">{{ g.merchant.type_name }}</span>
        <div class="scoce">
          <span>{{ g.rate }}评分</span> <span>{{ g.reply_count }}条评论</span>
        </div>
        <span class="store-name">{{ g.merchant.mer_name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["goodsList"],
  methods:{
    goToGoods(a){
      this.$router.push(`/store?store_id=${a}`)
    }
  }
};
</script>
<style lang="scss" scoped>
.list-pane {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
  padding: 5px 2vw;
  width: 100%;
  height: calc(100vh - 93px);
  background-color: rgb(233 233 233 / 69%);
  overflow: auto;
//   z-index: 200;
  &::-webkit-scrollbar {
    display: none;
  }
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
</style>