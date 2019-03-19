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
            redirect: {name: 'Home'},
        },
        {
            path: '/shop/home',
            name: 'Home',
            meta: {title: '全部商品', keepAlive: true},
            component: Home,
        },
        {
            path: '/shop/detail',
            name: 'Detail',
            meta: {title: '商品详情', keepAlive: false},
            component: Detail
        }
    ],

})