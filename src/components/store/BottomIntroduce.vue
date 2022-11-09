<template>
  <div class="introduce" v-if="data.temp">
    <div class="freight" @click="show = true">
      <div>{{'运费:' + data.temp.name}}</div>
      <van-icon name="arrow" />
    </div>
    <van-action-sheet v-model="show" title="运费说明">
      <div class="content">
        <div>{{data.temp.name}}</div>
        <div class="confirm" @click="show = false">
          <span>确定</span>
        </div>
      </div>
    </van-action-sheet>
    <div class="shop" @click="goToStoreDetil(data.mer_id)">
      <div class="shop-top">
        <img :src="data.merchant.mer_avatar">
        <div class="flex flex-c flex-j-sb">
          <div>
            <span class="shop-name">{{data.merchant.mer_name}}</span>
            <span class="self-support">{{data.merchant.type_name}}</span>
          </div>
          <span class="count">{{data.merchant.care_count + '人关注'}}</span>
        </div>
      </div>
      <div class="flex flex-j-sb score-wrapper">
        <span>{{'商品描述' + data.merchant.product_score}}</span>
        <span>{{'卖家服务' + data.merchant.service_score}}</span>
        <span>{{'物流服务' + data.merchant.postage_score}}</span>
      </div>
    </div>
    <div class="flex introduce">
      <span>产品介绍</span>
    </div>
    <div v-html="data.content.content" class="introduce-pic">
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      show: false
    }
  },
  methods:{
    goToStoreDetil(a){
      this.$router.push(`/shop?shop_id=${a}`)
    }
  }
}
</script>

<style lang="scss">
.introduce {
  .flex {
    display: flex;
  }

  .flex-c {
    flex-direction: column;
  }

  .flex-j-sb {
    justify-content: space-between;
  }

  .flex-a-c {
    align-items: center;
  }

  .freight {
    width: 100vw;
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    color: #969799;
    background-color: white;
    margin-top: 10px;
  }

  .content {
    padding: 16px 16px 160px;
    font-size: 14px;
    color: grey;
    position: relative;

    .confirm {
      width: calc(100% - 32px);
      position: absolute;
      text-align: center;
      padding: 13px 0;
      border-radius: 999px;
      background-image: linear-gradient(to left, #f13020, #f6864a);
      bottom: 60px;
      left: 16px;
      font-size: 15px;
      color: #fff;
    }
  }

  .shop {
    width: 100vw;
    padding: 10px 16px;
    margin-top: 10px;
    background-color: white;

    .shop-top {
      display: flex;

      img {
        width: 43px;
        margin-right: 5px;
      }

      .shop-name {
        font-size: 14px;
        color: #282828;
        font-weight: 700;
      }

      .self-support {
        background: #e93424;
        color: #fff;
        font-size: 10px;
        text-align: center;
        border-radius: 2px;
        padding: 0 2px;
        line-height: 17px;
        font-weight: 700;
        margin-left: 3px;
      }

      .count {
        color: #666;
        font-size: 12px;
      }
    }

    .score-wrapper {
      margin-top: 20px;
      color: #948d8c;
      font-size: 13px;
    }
  }

  .introduce {
    align-items: center;
    width: 100vw;
    height: 50px;
    margin-top: 10px;
    background-color: white;

    span {
      margin: auto;
    }
  }

  .introduce-pic {
    p {

    img {
      width: 100vw;
      vertical-align: bottom;
    }

    }

  }
}
</style>