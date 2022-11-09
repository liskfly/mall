<template>
  <div class="shopClassify">
    <div class="item" v-for="s in storeClassify" :key="s.store_category_id">
      <div class="item-header" @click.stop="goToClassify(s.store_category_id)">
        <span>{{ s.cate_name }}</span>
        <img src="" alt="" />
      </div>
      <div class="list" >
        <div
          v-for="c in s.children"
          :key="c.store_category_id"
          class="list-item"
          @click.stop="goToClassify(c.store_category_id)"
        >
          {{ c.cate_name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["storeClassify",'shopId'],
  methods:{
     goToClassify(a) {
      this.$router.push(`/classify-store?mer_id=${this.shopId}&category_id=${a}`);
    },
  }
};
</script>
<style lang="scss" scoped>
.shopClassify {
  background-color: #f5f5f5;
  .item {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin: 10px 0;
    .item-header {
      position: relative;
      display: flex;
      align-items: center;
      height: 45px;
      padding-right: 10px;
      padding-left: 18px;
      font-weight: 700;
      color: #282828;
      &::before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 10px;
        width: 3px;
        height: 12px;
        background-color: red;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }
      
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 4px 18px 7px;
        .list-item {
          width: 157px;
          height: 42px;
          padding-right: 15px;
          padding-left: 15px;
          border-radius: 5px;
          background-color: #f5f5f5;
          margin-bottom: 5px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: 500;
          font-size: 13px;
          line-height: 42px;
          color: #282828;
        }
      }
  }
}
</style>
