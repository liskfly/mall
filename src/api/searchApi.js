export const getHotWord='common/hot_keyword'
export const getKeywordApi=(a)=>{
    return `product/spu/lst?cate_id=&order=&price_on=&price_off=&brand_id=&keyword=${a}&is_trader=&page=1&limit=30`
}