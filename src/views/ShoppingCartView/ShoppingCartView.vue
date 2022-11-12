<template>
  <div class="shoppingcart">
    <div class="title">
      <span>购物车</span>
      <span class="control">管理</span>
    </div>
    <div>
      <div v-for="({product_id,image,mer_avatar,mer_name,store_name,price,value},index) in goodscar" :key="product_id"
        class="goodslist">
        <van-swipe-cell>
          <div class="shop">
            <img :src="mer_avatar">
            <span>{{mer_name}}</span>
            <img src="../../assets/img/mP.png" class="enter">
          </div>
          <div class="goods">
            <input type="checkbox" ref="fff" @click="listCheck">
            <img :src="image">
            <div class="goodsdata">
              <span class="store_name">{{store_name}}</span>
              <div class="price">
                <span class="univalent">¥{{price}}</span>
                <div>
                  <span @click="reduceValue(index)">-</span>
                  <span>{{value}}</span>
                  <span @click="addValue(index)">+</span>
                </div>
              </div>
            </div>
          </div>
          <template #right>
            <van-button square type="danger" text="删除" class="delete-button" @click="deleteGoods(index)" />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <div class="submit">
      <div class="all">
        <input type="checkbox" ref="isAllCheck" @click="allCheck">
        <span>全选</span>
      </div>
      <div class="totalsubmit">
        <span>总价:¥{{Total}}</span>
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="addPayment" round>
          提交订单
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
export default {
  data () {
    return {
      check: [],
      Total: 0
    }
  },
  computed: {
    ...mapState(['goodscar'])
  },
  methods: {
    addValue (index) {
      this.goodscar[index].value++
      this.getTotal()
      this.replacegoodscar(this.goodscar)
    },
    reduceValue (index) {
      if (this.goodscar[index].value > 1) {
        this.goodscar[index].value--
        this.getTotal()
        this.replacegoodscar(this.goodscar)
      }
    },
    getTotal () {
      this.Total = 0
      this.$refs.fff.forEach(({ checked }, index) => {
        if (checked == true) {
          this.Total = this.Total + parseFloat(parseFloat(this.goodscar[index].value * parseFloat(this.goodscar[index].price)).toFixed(2))
        }
      })
    },
    allCheck () {
      let num = 0
      this.$refs.fff.forEach(({ checked }) => {
        if (checked == false) {
          num++
        }
      })
      this.$refs.isAllCheck.checked = num > 0 ? true : false
      this.$refs.fff.forEach((item) => { item.checked = this.$refs.isAllCheck.checked ? true : false })
      this.getTotal()
    },
    listCheck () {
      let num = 0
      this.$refs.fff.forEach(({ checked }) => {
        if (checked == false) {
          num++
        }
      })
      this.$refs.isAllCheck.checked = num > 0 && this.$refs.fff.length > 1 ? false : true
      this.getTotal()
    },
    deleteGoods (index) {
      let car = this.goodscar.filter((item, i) => {
        if (i == index) {
          return false
        } else {
          return true
        }
      })
      this.replacegoodscar(car)
      this.getTotal()
    },
    addPayment () {
      let data = []
      let car = this.goodscar.filter((item, i) => {
        if (this.$refs.fff[i].checked == true) {
          data.push(...item)
          return false
        } else {
          return true
        }
      })
      this.paymentAdd(data)
      this.replacegoodscar(car)
      this.Total = 0
    },
    ...mapMutations(['replacegoodscar', 'paymentAdd'])
  }
}
</script>

<style lang="scss" scoped>
.shoppingcart {
  width: 100vw;
  height: 100vh;
  padding-bottom: 50px;
  overflow: auto;
  position: relative;

  .van-submit-bar {
    bottom: 50px;
  }

  .delete-button {
    height: 100%;
  }

  .title {
    width: 100vw;
    height: 50px;
    display: flex;
    position: sticky;
    top: 0;
    z-index: 2;
    background-image: linear-gradient(to right, #f6d864, #f1596b);

    .control {
      position: absolute;
      top: 15px;
      right: 20px;
    }

    span {
      font-size: 20px;
      margin: auto;
      color: #fff;
    }
  }

  .goodslist {
    width: 100vw;
    height: 150px;
    border-bottom: 5px solid rgb(232, 232, 232);

    .shop {
      width: 100vw;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      // background-image: linear-gradient(to right, rgb(233, 233, 233), #fff);

      img {
        border-radius: 999px;
        width: 35px;
        margin-right: 20px;
      }

      span {
        font-size: 14px;
        font-weight: 700;
      }

      .enter {
        width: 8px;
        height: 14px;
        margin-left: 10px;
      }
    }

    .goods {
      width: 100vw;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      // background-image: linear-gradient(to right, rgb(233, 233, 233), #fff);

      img {
        width: 90px;
        margin-right: 10px;
      }

      .goodsdata {
        flex: 1;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .store_name {
          font-weight: 700;
        }

        .price {
          display: flex;
          justify-content: space-between;

          .univalent {
            font-size: 16px;
            color: red;
          }

          span {
            margin: 0 5px;
          }
        }
      }
    }
  }

  .submit {
    width: 100vw;
    height: 50px;
    padding: 0 10px;
    position: fixed;
    bottom: 50px;
    left: 0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .all {
      display: flex;
      align-items: center;
    }

    .totalsubmit {
      display: flex;
      align-items: center;

      span {
        margin-right: 10px;
        text-align: center;
      }
    }
  }
}
</style>