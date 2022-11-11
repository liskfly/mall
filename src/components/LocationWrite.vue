<template>
  <div class="locationwrite">
    <div class="top">
      <img src="../assets/prev.svg" @click="hidden">
      <img src="../assets/more.svg">
    </div>
    <van-address-list v-model="chosenAddressId" :list="list" :disabled-list="disabledList" disabled-text="以下地址超出配送范围"
      default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="select" />
    <van-popup v-model="show" position="right">
      <AddLocation @hidden="pageHidden" />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
import AddLocation from './AddLocation.vue'
export default {
  data () {
    return {
      show: false,
      chosenAddressId: '1',
      list: JSON.parse(window.localStorage.getItem('location')) || [],
      disabledList: [
      ],
    };
  },
  created () {
    this.getChoiceID(JSON.parse(window.localStorage.getItem('location')) || [])
  },
  methods: {
    onAdd (a) {
      this.show = true
      console.log(a);
    },
    onEdit (item, index) {
      Toast('编辑地址:' + index);
    },
    hidden () {
      this.$emit('hidden', false)
    },
    pageHidden (value) {
      this.list = value
      this.getChoiceID(value)
      this.show = false
    },
    getChoiceID (data) {
      data.forEach(({ id, isDefault }) => {
        if (isDefault == true) {
          this.chosenAddressId = id
          console.log(id);
        }
      })
    },
    select (a) {
      this.chosenAddressId = a.id,
        this.list = JSON.parse(window.localStorage.getItem('location')).map((item) => {
          if (item.id == a.id) {
            console.log(1);
            return { ...item, isDefault: true }
          } else {
            return {...item,isDefault: false}
          }
        })
        window.localStorage.setItem('location', JSON.stringify(this.list))
    }
  },
  components: {
    AddLocation
  }
};
</script>
<style lang="scss" scoped>
.locationwrite {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: white;

  .van-address-list {
    overflow: auto;
  }

  .top {
    width: 100vw;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;

    img {
      width: 40px;
    }
  }
}
</style>