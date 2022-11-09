export const getStoreApi = a => { return `store/merchant/detail/${a}` }
export const getStoreGoods =  (a, b,c) => {
   return `product/spu/merchant/${a}?order=${b}&keyword=&page=${c}&limit=30`

}

export const getStoreClassify=a=>{
    return `store/merchant/category/lst/${a}`
}

export const options1=[
    {
      text: "默认",
      value: "",
    },
    { text: "评分", value: "rate" },
    {
      text: "销量",
      value: "sales",
    },
    {
      text: "价格",
      value: "price_asc",
    },
    {
      text: "新品",
      value: "is_new",
    },
    {
      text: "活动",
      value: "",
    },
  ]