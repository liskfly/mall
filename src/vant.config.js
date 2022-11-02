import {
    NavBar,
    Tabbar,
    Search,
    Slider,
    Popup,
    TabbarItem,
    Icon,
    NoticeBar,
    Tab,
    Tabs,
    Swipe,
    SwipeItem,
    List,
    Cell,
    PullRefresh,
    Lazyload,
    ActionSheet,
    GoodsAction, 
    GoodsActionIcon, 
    GoodsActionButton,
    Stepper
} from 'vant'

const vantComponents = [
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    Slider,
    Popup,
    NoticeBar,
    Tab,
    Tabs,
    Swipe,
    SwipeItem,
    List,
    Cell,
    PullRefresh,
    Lazyload,
    ActionSheet,
    GoodsAction, 
    GoodsActionIcon, 
    GoodsActionButton,
    Stepper
]

export default {
    install (Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}