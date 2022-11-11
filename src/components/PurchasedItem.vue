<template>
  <div class="purchased-item">
    <div class="head">
      <img
        src="@/assets/img/image_ic_undo_disable.png"
        alt="goBack"
        @click="cancel"
      />
      <p>订单</p>
    </div>
    <div class="box">
      <div class="goods-item" v-for="p in paymentlist" :key="p.id">
        <div class="store">
          <img v-lazy="p.mer_avatar" alt="p.mer_name" />
          <p>{{p.mer_name}}</p>
        </div>
        <div class="goods">
          <img v-lazy="p.image" :alt="p.store_name" />
          <div class="goods-meg">
            <p class="store-name">{{ p.store_name }}</p>
            <div class="good">
              <span>{{p.s1}}{{ p.s2?','+p.s2:''}}</span> <span class="price">￥{{ p.price *  p.value}}</span>
            </div>
            <div>
              <span class="count">x{{ p.value }}</span>
            </div>
          </div>
        </div>
        <div class="store-bottom"><span>删除订单</span><span>加入购物车</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["paymentlist"]),
  },
  methods: {
    cancel() {
      let a = false;
      this.$emit("cancel", a);
    },
  },
};
</script>
<style lang="scss" scoped>
.purchased-item {
  width: 100%;
  height: 100vh;
  background-color: #eee;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .head {
    position: sticky;
    left: 0;
    top: 0;
    display: flex;
    padding: 0 3vw;
    // justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 45px;
    background-color: #fff;
    z-index: 11;
    img {
      width: 24px;
      height: 24px;
    }
    p {
      margin: auto;
    }
  }
  .box {
    padding: 10px 2vw;
    .goods-item {
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      background-color: #fff;
      margin-bottom: 10px;
      padding: 5px 2vw;
      gap: 5px;
      .store {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          width: 24px;
          height: 24px;
        }
      }
      .goods {
        display: flex;
        gap: 10px;
        img {
          width: 60px;
          height: 60px;
        }
        .goods-meg {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .store-name {
            width: 275px;
            font-size: 15px;
            line-height: 18px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          div {
            display: flex;
            justify-content: flex-end;
            .count {
              color: #999;
              font-size: 13px;
            }
          }
          .good{
              display: flex;
              justify-content: space-between;
              span{
                color: #999;
                font-size: 12px;
              }
              .price {
              color: red;
              font-size: 15px;
              font-weight: bold;
            }
          }
        }
      }
      .store-bottom {
        display: flex;
        justify-content: flex-end;
        gap: 15px;
        span {
          border-radius: 999px;
          border: 1px solid #999;
          padding: 5px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>