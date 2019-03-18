<template>
    <div class="home">
        <div class="top-flex-box">
            <!--搜索-->
            <div class="shop-search">
            <van-search placeholder="请输入搜索关键词" show-action v-model="searchString" >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            </div>
            <!--选择栏 tabs-->
            <ul class="tabs padding">
                <li class="tab-item" v-for="item in tabs" :key="item.active" @click="checkTab(item)">
                    <span class="text" :class="{activeTab: item.active === active}">{{ item.title }}</span>
                    <span v-if="active === 4" class="price-icon"></span>
                    <span v-if="active === 5" class="query-icon"></span>
                </li>
            </ul>
        </div>
        <!--列表-->
        <van-list v-model="loading" @load="getList">
            <div class="list-top-box"></div>
            <div @click="toDetail" class="list-item" v-for="(item, index) in list" :key="index">{{ item }}</div>
        </van-list>
        <!--弹层 选择筛选时展示-->
        <van-popup v-model="queryPopupShow"></van-popup>
    </div>
</template>

<script>
    /**
     * 商品首页
     * @author: heshenghuang-2019/03/18
     */
    export default {
        name: "Index",
        data () {
            return {
                searchString: "", // 搜索字符串
                active: 1,
                tabs: [
                    {
                        title: '默认',
                        active: 1
                    },
                    {
                        title: '销量',
                        active: 2
                    },
                    {
                        title: '价格',
                        active: 3,
                        status: 'up' // up=>向上排序 down=>向下排序
                    },
                    {
                        title: '时间',
                        active: 4
                    },
                    {
                        title: '筛选',
                        active: 5
                    }
                ],
                list: [],
                loading: false
            }
        },
        computed: {
            // 是否展示弹层
            queryPopupShow () {
                return this.active === 5
            }
        },
        created () {
          this.getList();
        },
        methods: {
            /**
             * 搜索
             */
            onSearch () {
                console.log(this.searchString)
            },
            /**
             * 切换搜索条件
             * @param {Object} item 需要搜索的项
             */
            checkTab (item) {
                this.active = item.active;
                this.list = [];
                this.getList()
            },
            /**
             * 根据搜索条件获取列表
             */
            getList () {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    for (let i = 1; i< 30; i++) {
                        this.list.push(i);
                    }
                }, 1500)
            },
            /**
             * 前往详情页
             */
            toDetail () {
                this.$router.push({name: 'Detail'})
            }
        }
    }
</script>

<style scoped lang="less">
.home{
    .padding{padding: 0 0.24rem;}
    .top-flex-box{position: fixed;width: 100%;top:0;left: 0;z-index: 3000;background-color: white;}
    .list-top-box{height: 2.02rem;}
    .shop-search{margin-top: 0.24rem;padding: 0.12rem 0.24rem;height: 0.6rem;line-height: 0.6rem;border-top: 1px solid #ededed;}
    .tabs{display: flex;height: 0.88rem;line-height: 0.88rem;border-bottom: 1px solid #eff3f6;border-top: 1px solid #eff3f6;
        .tab-item{width: 20%;width: border-box;font-size: 0.25rem;text-align: center;}
        .activeTab{color: #ec4125}
    }
    .list-item{height: 0.5rem;text-align: center;}
}
</style>