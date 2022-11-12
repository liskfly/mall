<template>
  <div class="subscribe">
    <div class="head">
      <img
        src="@/assets/img/image_ic_undo_disable.png"
        alt="goBack"
        @click="cancel"
      />
      <p>已订阅店铺</p>
    </div>
    <div class="sub-box">
      <div v-for="s in storeArr" :key="s.mer_id">
        <van-swipe-cell>
          <div class="store" @click="goToStoreDetil(s.mer_id)">
            <img v-lazy="s.mer_avatar" :alt="s.mer_name" />
            <div class="meg">
              <span>{{ s.mer_name }}</span>
              <span class="text"
                >{{ s.care_count+1 }}人订阅</span
              >
            </div>
          </div>
          <template #right>
            <van-button
              square
              type="danger"
              text="取消订阅"
              @click="cancleSub(s)"
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
    ...mapState(["storeArr"]),
  },
  methods: {
    cancel() {
      let a = false;
      this.$emit("cancel", a);
    },
    cancleSub(s) {
      this.addStore(s);
    },
    goToStoreDetil(a) {
      this.$router.push(`/shop?shop_id=${a}`);
    },
    ...mapMutations(["addStore"]),
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
    border-bottom: 1px solid #eee;
    img {
      margin: 2px 10px;
      border-radius: 999px;
      border: 1px solid #eee;
      width: 40px;
      height: 40px;
    }
    .meg {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .text {
        width: 54px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>