<template>
  <div class="topbanner">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in data.slider_image" :key="index">
        <img v-lazy="image" class="banner_pic" />
      </van-swipe-item>
    </van-swipe>
    <div class="details" v-if="data.merchant">
      <span class="price">{{'¥' + data.price}}</span>
      <div>
        <span class="Securities">{{'现金券最高可抵扣' + data.price + '元'}}</span>
        <span class="self_support">{{data.merchant.type_name}}</span>
      </div>
      <div class="flex name">
        <span class="store_name">{{data.store_name}}</span>
      </div>
      <div class="state">
        <span>{{'市场价:¥' + data.ot_price}}</span>
        <span>{{'库存:' + data.stock + data.unit_name}}</span>
        <span>{{'销量:' + data.sales + data.unit_name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.topbanner {
  width: 100%;
  .flex {
    display: flex;
  }

  .banner_pic {
    width: 100vw;
  }

  .details {
    width: 100vw;
    padding: 15px;
    background-color: white;
    display: flex;
    flex-direction: column;

    .price {
      font-size: 24px;
      color: red;
      font-weight: 700;
      padding: 10px 0;
    }

    .Securities {
      padding: 3px 10px;
      font-size: 12px;
      color: #ff9000;
      border-radius: 999px;
      background-color: #fff4e6;
    }

    .name {
      margin: 15px 0;
      align-items: center;

      .store_name {
        font-size: 17px;
        font-weight: 700;
      }
    }

    .self_support {
      background: #e93424;
      color: #fff;
      font-size: 10px;
      text-align: center;
      border-radius: 2px;
      padding: 0 2px;
      line-height: 17px;
      margin-right: 3px;
    }

    .state {
      font-size: 12px;
      color: #82848f;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>