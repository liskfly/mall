<template>
  <div class="foot-print">
    <div class="head">
      <img
        src="@/assets/img/image_ic_undo_disable.png"
        alt="goBack"
        @click="cancel"
      />
      <p>我的足迹</p>
    </div>
    <div class="box">
      <div
        class="goods"
        v-for="f in footPrint"
        :key="f.id"
        @touchstart.prevent="gtouchstart(f.id)"
        @touchend="touchend(f.product_id)"
      >
        <img v-lazy="f.image" />
        <div class="price">
          <span class="text">￥</span><span class="sum">{{ f.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { Dialog } from "vant";
export default {
  data() {
    return { longTouch: false };
  },
  computed: {
    ...mapState(["footPrint"]),
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    goToGoods(a) {
      this.$router.push(`/store?store_id=${a}`);
    },
    gtouchstart(a) {
      clearTimeout(this.timeOutEvent);
      this.longTouch = false;
      this.timeOutEvent = setTimeout(() => {
        this.longTouch = true;
        if (this.longTouch) {
          Dialog.confirm({
            message: "是否删除该条历史记录",
          })
            .then(() => {
              this.removeFootPrint(a);
            })
            .catch(() => {});
        }
      }, 500);
      return false;
    },
    touchend(a) {
      clearTimeout(this.timeOutEvent);
      if (!this.longTouch) {
        this.goToGoods(a);
      }
    },
    ...mapMutations(["removeFootPrint"]),
  },
};
</script>
<style lang="scss" scoped>
.foot-print {
  width: 100%;
  height: 100vh;
  background-color: #fff;
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
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    .goods {
      width: 100px;
      display: flex;
      flex-direction: column;
      img {
        border-radius: 10px;
        width: 100%;
      }
      .price {
        margin-top: 10px;
        color: red;
        .text {
          font-size: 13px;
        }
        .sum {
          font-size: 15px;
        }
      }
    }
  }
}
</style>