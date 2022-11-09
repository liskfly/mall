<template>
    <div>
        <div></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            goodscar:JSON.parse(window.localStorage.getItem('goodscar')) || []
        }
    },
    methods:{
        getGoodscar(){
            this.goodscar = JSON.parse(window.localStorage.getItem('goodscar')) || []
        }
    }
}
</script>