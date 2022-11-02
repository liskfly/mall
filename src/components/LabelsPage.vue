<template>
  <div class="label" v-if="pic">
    <div class="return">
      <img class="goback" src="../assets/img/bn.png" @click="goBack">
      <span class="line">|</span>
      <img class="gohome" src="../assets/pic2.svg" @click="goHome">
    </div>
    <div class="label-top" :style="{backgroundImage:`url(${pic})`}">
      <div class="shadow"></div>
      <div class="showcase">
        <img v-lazy="pic">
      </div>
    </div>
    <div class="title">
      <span>总有一款你喜欢的</span>
      <span class="small">hope you can find your favorite products</span>
    </div>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="label-list">
        <div v-for="({product_id,image,store_name,price,rate,reply_count}) in list" :key="product_id" class="item">
          <img v-lazy="image">
          <div class="character">
            <span class="keyword">{{store_name}}</span>
            <span class="price">{{'¥' + price}}</span>
            <div class="reader">
              <span>{{rate + '评分'}}</span>
              <span>{{reply_count + '回复'}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>

  </div>
</template>

<script>
import { labels, labelsPic } from "@/api/homeview.js"
export default {
  data () {
    return {
      id: this.$route.query.labels_id,
      page: this.$route.query.labels_page,
      pic: '',
      list: [],
      pages: 0,
      loading: false,
      finished: false,
    }
  },
  created () {
    this.getLabelsPic()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push(`/home`)
    },
    async getLabels () {
      this.pages++
      let { data } = await this.$axios(labels(this.page, this.pages))
      let result = data.list
      result.forEach(item => this.list.push(item))
      this.loading = false;
    },
    async getLabelsPic () {
      let { data } = await this.$axios(labelsPic(this.id))
      this.pic = data.image
    },
    onLoad () {
      setTimeout(() => {
        this.getLabels()
        if (this.pages >= 3) {
          this.finished = true;
        }
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: #f5f5f5;
  overflow: auto;

  .return {
    padding: 5px;
    border-radius: 90px;
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    align-items: center;
    position: fixed;
    top: 10px;
    left: 20px;
    z-index: 18;

    .line {
      margin: 0 10px 0 10px;
      color: white;
      font-size: 20px;
    }

    .goback {
      width: 30px;
      height: 30px;
    }

    .gohome {
      width: 23px;
      height: 23px;
      margin: 0 8px;
    }
  }

  .label-top {
    width: 100%;
    height: 30%;
    position: relative;
    background-size: 100% 80%;
    background-repeat: no-repeat;
    background-color: white;

    .shadow {
      width: 100%;
      height: 80%;
      position: absolute;
      backdrop-filter: blur(1px);
      top: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }

    .showcase {
      width: 100%;
      height: 80%;
      position: absolute;
      bottom: 0;
      display: flex;

      img {
        width: 80%;
        border-radius: 10px;
        margin: auto;
      }
    }
  }

  .label-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 172px;
      margin: 10px 7px;
      background-color: white;

      img {
        width: 172px;
      }

      .character {
        display: flex;
        padding: 5px;
        flex-direction: column;

        .keyword {
          height: 26px;
          font-size: 13px;
          margin: 3px 0 10px 0;
        }

        .price {
          margin: 3px 0;
          color: rgb(255, 41, 41);
          font-size: 13px;
        }
        .reader {
          display: flex;
          font-size: 12px;
          margin: 3px 0;

          span {
            margin-right: 5px;
          }
        }
      }
    }
  }

  .title {
    width: 100vw;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-family: "穿越寒冬拥抱你";
    align-items: center;
    margin: 15px 0 10px 0;

    .small {
      font-size: 13px;
    }
  }
}
</style>