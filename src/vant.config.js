import {
    NavBar,
    Sidebar,
    SidebarItem,
    Tabbar,
    Search,
    Slider,
    Popup,
    TabbarItem,
    Icon,
    NoticeBar,
    Grid,
    GridItem,
    Tab,
    Tabs,
    Swipe,
    Loading,
    SwipeItem,
    List,
    Cell,
    PullRefresh,
    Lazyload,
    ActionSheet,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Stepper,
    DropdownMenu,
    DropdownItem,
    Form,
    Field,
    Button,
    SwipeCell,
    Sku,
    Dialog 
} from 'vant'

const vantComponents = [
    NavBar,
    Sidebar,
    SidebarItem,
    Tabbar,
    Search,
    Slider,
    Popup,
    TabbarItem,
    Icon,
    NoticeBar,
    Grid,
    GridItem,
    Tab,
    Tabs,
    Swipe,
    Loading,
    SwipeItem,
    List,
    Cell,
    PullRefresh,
    Lazyload,
    ActionSheet,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Stepper,
    DropdownMenu,
    DropdownItem,
    Form,
    Field,
    Button,
    SwipeCell,
    Sku,
    Dialog 

]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}