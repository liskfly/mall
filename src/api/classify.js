export const getClassGoodsApi = ({ pid, order, price_on, price_off, brand_id, keyword }) => {
    return `/product/spu/lst?cate_pid=${pid}&order=${order}&price_on=${price_on}&price_off=${price_off}&brand_id=${brand_id}&keyword=${keyword}&page=1&limit=30`
}
export const getBrandApi = ({ pid, keyword }) => { return `/store/product/brand/lst?cate_id=${pid}&keyword=${keyword}` }
export const getNextGoodsApi = ({ pid, order, price_on, price_off, brand_id, keyword }, b) => {
    return `/product/spu/lst?cate_pid=${pid}&order=${order}&price_on=${price_on}&price_off=${price_off}&brand_id=${brand_id}&keyword=${keyword}&page=${b}&limit=30`
}