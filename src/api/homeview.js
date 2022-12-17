export const HomeNav = 'common/home'

export const Secondary = (id,page)  => `product/spu/lst?pid=${id}&page=${page}&limit=6`

export const banner = [{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/30de02022101916053666.jpg?imageMogr2/thumbnail/!100p`,
    page:'4',
    id:'1126'
},{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/8c494202210241703491556.jpg?imageMogr2/thumbnail/!100p`,
    page:'7',
    id:'1129'
},{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/6842a202210241704126596.jpg?imageMogr2/thumbnail/!100p`,
    page:'8',
    id:'1130'
},{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/a4fad202210241704407089.jpg?imageMogr2/thumbnail/!100p`,
    page:'9',
    id:'1131'
}]

export const classification = [{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/530fb202210251509322145.jpg?imageMogr2/thumbnail/!100p`,
    type:'labels',
    id:'1126',
    name:'干货汤料',
    page:'4'
},{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/20d37202210251504121819.jpg?imageMogr2/thumbnail/!100p`,
    type:'merchant',
    id:'268',
    name:'零食专区',
    page:''
},{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/db7ea202210211628414216.jpg?imageMogr2/thumbnail/!100p`,
    type:'merchant',
    id:'87',
    name:'海淘专区',
    page:''
},{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/00df2202210221730496474.jpg?imageMogr2/thumbnail/!100p`,
    type:'labels',
    id:'1127',
    name:'家用电器',
    page:'5'
},{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/50f2d202210251514583643.jpg?imageMogr2/thumbnail/!100p`,
    type:'labels',
    id:'1125',
    name:'宠物用品',
    page:'3'
},{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/1b378202210251559064566.jpg?imageMogr2/thumbnail/!100p`,
    type:'labels',
    id:'1128',
    name:'美容护肤',
    page:'6'
},{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/aee52202210251527444452.jpg?imageMogr2/thumbnail/!100p`,
    type:'merchant',
    id:'83',
    name:'SVip',
    page:''
},{
    src:`http://gdypyg-1306651434.file.myqcloud.com/def/e3bfe202210251540383710.jpg?imageMogr2/thumbnail/!100p`,
    type:'merchant',
    id:'201',
    name:'分公司',
    page:''
}]

export const Hot = [{
    src:'http://gdypyg-1306651434.file.myqcloud.com/def/7137e202210250933596012.jpg?imageMogr2/thumbnail/!100p',
    type:'new',
    name:'首发新品',
    id:'21512'
},{
    src:'http://gdypyg-1306651434.file.myqcloud.com/def/5b42820221025093458536.jpg?imageMogr2/thumbnail/!100p',
    type:'hot',
    name:'热门榜单',
    id:'21512'
},{
    src:'http://gdypyg-1306651434.file.myqcloud.com/def/cf06a202210250930475470.jpg?imageMogr2/thumbnail/!100p',
    type:'best',
    name:'精品推荐',
    id:'21512'
}]

export const HomeList = (page) => {return `product/spu/recommend?page=${page}&limit=30`}

export const categoryList = (id) => `store/product/category?pid=${id}`

export const labels = (labels,page) => `product/spu/labels?page=${page}&limit=30&labels=${labels}&mer_id=0`

export const labelsPic = (page) => `activity/info/${page}`

export const diy = (id) => `diy?mer_id=${id}`

export const hotTop = (type) => `http://m.gdypyg.cn/api/common/hot_banner/${type}`

export const hotList = (type,page) => `product/spu/hot/${type}?page=${page}&limit=8`

export const store = (id) => `http://m.gdypyg.cn/api/store/product/detail/${id}`