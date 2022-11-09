<template>
    <div class="secondary"  v-if="index != 0">
        <div class="secondary-list" v-if="category[0]">
            <div v-for="({store_category_id,pic,cate_name},index) in category" :key="store_category_id" class="item" v-show="index <9" @click="goToClassify(store_category_id)">
                <img v-lazy="pic" />
                <span class="name">{{cate_name}}</span>
            </div>
            <div class="item" v-show="category.length > 9">
                <div class="circular">
                    <span>...</span>
                </div>
                <span class="name">更多</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['category', 'index'],
  data () {
    return {
        // list:[]
    }
  },
  methods: {
     goToClassify(id) {
      this.$router.push(`/classify?classify_id=${id}`);
    },
  },
//   watch:{
//     'category'(newValue){
//         this.list = newValue
//         console.log(newValue);
//     }
//   }
}
</script>

<style lang="scss" scoped>
.secondary {
    box-sizing: border-box;
    width: 100vw;
    height: 190px;
    padding: 2vw 2vw 0 2vw;
    background-color: #f1f1f1;

    .secondary-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 2vw;
        background-color: white;
        display: flex;
        flex-wrap: wrap;

        .item  {
            width: 20%;
            height: 52%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;

            img {
                width: 45px;
            }

            .name {
                font-size: 12px;
            }

            .circular{
                width: 45px;
                height: 45px;
                border-radius: 999px;
                background-color: #f8f8f8;
                position: relative;

                span {
                    margin: auto;
                    font-size: 20px;
                    font-weight: 700;
                    position: absolute;
                    top: calc(44% - 10px);
                    left: calc(65% - 17px);
                }
            }
        }
    }
}
</style>