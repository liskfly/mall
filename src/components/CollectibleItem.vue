<template>
  <div class="subscribe">
    <div class="head">
      <img
        src="@/assets/img/image_ic_undo_disable.png"
        alt="goBack"
        @click="cancel"
      />
      <p>我的收藏</p>
    </div>
    <div class="sub-box">
      <div v-for="c in collectionlist" :key="c.product_id">
        <van-swipe-cell>
          <div class="store" @click="goToGoods(c.product_id)">
            <img v-lazy="c.image" :alt="c.mer_name" />
            <div class="meg">
              <div class="meg-head">
                <span class="goods-name">{{ c.store_name }}</span>
                <span class="content"
                  >{{ Math.ceil(Math.random() * 1000) }}+人收藏</span
                >
                <span class="text">￥{{ c.price }}</span>
              </div>
              <div class="gostore">
                <span @click.stop="goToStoreDetil(c.mer_id)">去店铺</span>
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              class="delete-button"
              square
              type="danger"
              text="删除"
              @click="cancleSub(c)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["collectionlist"]),
  },
  methods: {
    cancel() {
      let a = false;
      this.$emit("cancel", a);
    },
    cancleSub(s) {
      this.collectionAdd(s);
    },
    goToStoreDetil(a) {
      this.$router.push(`/shop?shop_id=${a}`);
    },
    goToGoods(a) {
      this.$router.push(`/store?store_id=${a}`);
    },
    ...mapMutations(["collectionAdd"]),
  },
};
</script>
<style lang="scss" scoped>
.subscribe {
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
  .store {
    display: flex;
    padding: 10px 10px;
    // border-bottom: 1px solid #eee;
    img {
      margin: 2px 10px;
      border-radius: 10px;
      border: 1px solid #eee;
      width: 100px;
      height: 100px;
    }
    .meg {
      flex: 1;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .meg-head {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .goods-name {
          font-size: 14px;
          line-height: 18px;
        }
        .content {
          font-size: 12px;
          color: #999;
        }
        .text {
          font-size: 16px;
          color: red;
        }
      }
      .gostore {
        display: flex;
        justify-content: flex-end;
        span {
          padding: 3px 4px;
          border: 1px solid #eee;
          font-size: 12px;
          border-radius: 999px;
          color: #999;
        }
      }
    }
  }
  .delete-button {
    height: 100%;
  }
}
</style>