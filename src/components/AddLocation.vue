<template>
  <div class="addlocation">
    <div class="top">
      <img src="../assets/prev.svg" @click="hidden">
      <img src="../assets/more.svg">
    </div>
    <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
      :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
      @change-detail="onChangeDetail" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import { mapMutations } from "vuex"
import { areaList } from "../dataModel/areaList";
import { Toast } from 'vant'
export default {
  data () {
    return {
      areaList,
      searchResult: [],
      save: []
    };
  },
  computed: {
    ...mapState(['location'])
  },
  methods: {
    hidden () {
      this.$emit('hidden', this.$store.state.location)
    },
    onSave (a) {
      Toast('save');
      console.log(a);
      this.createLocation(a)
      this.hidden()
    },
    onDelete () {
      Toast('delete');
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    ...mapMutations(['createLocation'])
  }
}
</script>

<style lang="scss" scoped>
.addlocation {
  width: 100vw;
  height: 100vh;
  background-color: white;

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