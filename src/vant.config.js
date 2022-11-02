import {
    Search,
    popup,
    Sidebar,
    SidebarItem,
    Lazyload,
    Grid,
    GridItem,
    Tab,
    Tabs,
    Loading,
    DropdownMenu,
    DropdownItem,
    PullRefresh,
    List 
} from 'vant'

const vantComponents = [
    Search,
    popup,
    Sidebar,
    SidebarItem,
    Lazyload,
    Grid,
    GridItem,
    Tab,
    Tabs,
    Loading,
    DropdownMenu,
    DropdownItem,
    PullRefresh,
    List 
]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}