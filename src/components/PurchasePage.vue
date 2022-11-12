<template>
  <div class="purchase-page">
    <div class="head">
      <img
        src="@/assets/img/image_ic_undo_disable.png"
        alt="goBack"
        @click="cancel"
      />
      <p>购买</p>
    </div>
    <div class="box">
      <div class="goods-item">
        <div class="store">
          <img v-lazy="playGoods.mer_avatar" :alt="playGoods.mer_name" />
          <p>{{ playGoods.mer_name }}</p>
        </div>
        <div class="goods">
          <img v-lazy="playGoods.image" :alt="playGoods.store_name" />
          <div class="goods-meg">
            <p class="store-name">{{ playGoods.store_name }}</p>
            <div class="good">
              <span
                >{{ playGoods.s1
                }}{{ playGoods.s2 ? "," + playGoods.s2 : "" }}</span
              >
              <span class="price"
                >￥{{
                  parseFloat(playGoods.price * playGoods.value).toFixed(2)
                }}</span
              >
            </div>
            <div>
              <span class="count">x{{ playGoods.value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="address">
        <p class="title">收货地址</p>
        <div class="xo" v-for="(a, i) in addres" :key="i">
          <div class="addres">
            <span class="tel">{{ a.name }},{{ a.tel }}</span>
            <span class="qu">{{ a.address }}</span>
          </div>
          <img src="../assets/img/mP.png" alt="" @click="showLocation = true" />
        </div>
      </div>
    </div>
    <div class="play">
      <div class="price">
        实付款：<span class="text">￥</span
        ><span class="count">{{
          parseFloat(playGoods.price * playGoods.value).toFixed(2)
        }}</span>
      </div>
      <div class="confime" @click="play(a)" v-for="(a, i) in addres" :key="i">
        确认购买
      </div>
    </div> 
    <van-popup v-model="showLocation" position="right">
      <LocationWrite @hidden="pageHidden" />
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";
import LocationWrite from "@/components/LocationWrite.vue";
export default {
  props: ["playGoods"],
  data() {
    return {
      showLocation: false,
    };
  },
  computed: {
    ...mapState(["addressList"]),
    addres() {
      return this.addressList.filter((t) => t.isDefault == true);
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    pageHidden() {
      this.showLocation = false;
    },
    play(a) {
      Toast("购买成功");
      let data = {
        ...this.playGoods,
        id: new Date().getTime(),
        address: a,
      };
      this.paymentAdd(data);
      this.$emit("cancel");
      this.$emit("cancelShow");
    },
    ...mapMutations(["paymentAdd"]),
  },
  components: {
    LocationWrite,
  },
};
</script>
<style lang="scss" scoped>
.purchase-page {
  width: 100%;
  height: 100vh;
  background-color: rgb(247 244 244);
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
    padding: 20px 3vw;
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
          .good {
            display: flex;
            justify-content: space-between;
            span {
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
    }
    .address {
      margin-top: 20px;
      display: flex;
      gap: 20px;
      padding: 10px;
      background-color: #fff;
      align-items: center;
      border-radius: 10px;
      .title {
        flex: 1;
      }
      p {
        font-size: 12px;
      }
      .xo {
        display: flex;
        // flex-direction: column;
        .addres {
          font-size: 12px;
          display: flex;
          flex-direction: column;
          .tel {
            font-size: 14px;
            font-weight: bolder;
          }
          .qu {
            color: #999;
          }
        }
        img {
          width: 10px;
          height: 20px;
          margin-left: 10px;
        }
      }
    }
  }
  .play {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0 20px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    align-items: center;
    background-color: #fff;

    .price {
      font-size: 13px;
      color: #777;
      .text {
        color: red;
      }
      .count {
        font-size: 16px;
        color: red;
      }
    }
    .confime {
      padding: 10px 20px;
      border-radius: 999px;
      font-weight: bold;
      background-image: linear-gradient(-90deg, #f67a38, #f11b09);
      color: #fff;
    }
  }
}
</style>