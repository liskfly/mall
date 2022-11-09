<template>
  <div class="shopHome">
    <div class="good" v-for="s in storeGoods" :key="s.product_id"  @click="goToGoods(s.product_id)">
      <img :src="s.image" alt="" />
      <div class="good-mg">
        <p>{{ s.store_name }}</p>
        <div class="goods-bottom">
          <span class="price">￥{{ s.price }}</span>
          <div>
            <span>{{ s.rate }}评分 </span
            ><span> {{ s.reply_count }}条评论</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["storeGoods"],
  methods:{
     goToGoods(a){
      this.$router.push(`/store?store_id=${a}`)
    },
  }
};
</script>
<style lang="scss" scoped>
.shopHome {
  width: 100%;
  // height: 120vh;
  padding: 0 15px;
  .good {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    img {
      width: 120px;
      height: 120px;
    }
    .good-mg {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-bottom {
        .price {
          color: red;
          font-size: 17px;
          font-weight: 700;
        }
        div {
          span {
            margin-top: 10px;
            font-weight: 500;
            font-size: 10px;
            line-height: 1;
            color: #737373;
          }
        }
      }
    }
  }
}
</style>