import Vue from 'vue'
import Router from 'vue-router'
// 商品首页
import Home from '@/app/Home/index'
// 商品详情页
import Detail from '@/app/Home/detail'
Vue.use(Router);
export default new Router({
    routes:[
        {
            path: '/',
            name: 'Home',
            meta: {title: '全部商品'},
            component: Home
        },
        {
            path: '/detail',
            name: 'Detail',
            meta: {title: '商品详情'},
            component: Detail
        }
    ]
})