<template>
    <div class="homeleft">
        <h2 class="title">专区</h2>
        <div class="classification">
            <div v-for="{name ,src, id , type ,page} in left" :key="id" class="item" @click="goCommodity(type,id,page)">
                <img :src="src">
                <span>{{name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['left'],
    data() {
        return {

        }
    },
    methods:{
        getprefecture() {

        },
        goCommodity(type,id,page) {
            if(type == 'merchant'){
                this.$router.push(`/merchant?merchant_id=${id}`)
            }if(type == 'labels') {
                this.$router.push(`/labels?labels_id=${id}&labels_page=${page}`)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.homeleft {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-size: 20px;
        font-weight: 700;
        margin: 40px 0;
    }

    .classification {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .item {
            width: 104px;
            height: 104px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            margin: 0 auto;

            img {
                width: 40px;
                margin-bottom: 10px;
            }
        }
    }
}
</style>