<template>
    <div class="home">
        <div class="top-flex-box">
            <!--搜索-->
            <div class="shop-search">
                <van-search placeholder="请输入商品关键词" show-action v-model="searchString">
                    <div slot="action" @click="onSearch">搜索</div>
                </van-search>
            </div>
            <!--选择栏 tabs-->
            <ul class="tabs padding">
                <li class="tab-item" v-for="item in tabs" :key="item.active" @click="checkTab(item)">
                    <span class="text" :class="{activeTab: item.active === active}">{{ item.title }}</span>
                    <span v-if="item.active === 3" class="price-icon">
                        <van-icon name="arrow-up" size="0.12rem" :class="{activeIcon: item.status}"></van-icon>
                        <van-icon name="arrow-down" size="0.12rem" :class="{activeIcon: !item.status}"></van-icon>
                    </span>
                    <span v-if="item.active === 5" class="query-icon">
                        <van-icon name="arrow-up" size="0.26rem" v-show="queryPopupShow"></van-icon>
                        <van-icon name="arrow-down" size="0.26rem" v-show="!queryPopupShow"></van-icon>
                    </span>
                </li>
            </ul>
            <!--筛选弹出框-->
            <div class="query-dialog" v-show="queryPopupShow">
                <p class="padding title">请输入积分值</p>
                <div class="input-box padding">
                    <input v-model="queryData.integralMin"/> -
                    <input v-model="queryData.integralMax"/>
                </div>
                <div class="button-box">
                    <van-button type="default" @click="resetIntegral">重置</van-button>
                    <van-button type="danger" @click="queryIntegral">确定</van-button>
                </div>
            </div>
        </div>
        <!--列表-->
        <van-list class="padding" v-model="loading" @load="getList">
            <div class="list-top-box"></div>
            <div class="list-item" @click="toDetail(item)" v-for="(item, index) in list" :key="index">
                <img class="img-box" :src="item.imgUrl">
                <div class="tag-list">
                    <van-tag class="tag-1" v-show="item.tag.tag1">京东</van-tag>
                    <van-tag class="tag-2" v-show="item.tag.tag2">严选</van-tag>
                    <van-tag class="tag-3" v-show="item.tag.tag3">热销</van-tag>
                </div>
                <p class="text-overflew">{{ item.title }}</p>
                <p class="integral"><span class="num">{{ item.num }}</span> 积分</p>
            </div>
        </van-list>
        <!--弹层 选择筛选时展示-->
        <van-popup style="z-index: 2000" v-model="queryPopupShow" :closeOnClickOverlay="false"></van-popup>
    </div>
</template>

<script>
    /**
     * 商品首页
     * @author: heshenghuang-2019/03/18
     */
    export default {
        name: "Index",
        data() {
            return {
                searchString: "", // 搜索字符串
                active: 1, // 选中标识
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
                        status: true // true=>向上排序 false=>向下排序
                    },
                    {
                        title: '时间',
                        active: 4
                    },
                    {
                        title: '筛选',
                        active: 5,
                        query: false
                    }
                ],
                activeItem: null, // 选中的项
                // 搜索条件
                queryData: {
                    type: 1,
                    integralMin: '', // 最小积分
                    integralMax: '' // 最大积分
                },
                list: [],// 商品列表
                loading: false // 列表loading
            }
        },
        computed: {
            // 是否展示弹层
            queryPopupShow: {
                get: function () {
                    if (!this.active) {
                        return false;
                    }
                    if (!this.activeItem) {
                        return false
                    }
                    if (!this.activeItem.query) {
                        return false
                    }
                    return this.active === 5
                },
                set() {
                }
            }
        },
        created() {
            this.getList();
        },
        methods: {
            /**
             * 搜索
             */
            onSearch() {
                console.log(this.searchString)
            },
            /**
             * 切换搜索条件
             * @param {Object} item 需要搜索的项
             */
            checkTab(item) {
                this.active = item.active;
                this.activeItem = item;
                switch (this.active) {
                    case 5:
                        this.activeItem.query = !this.activeItem.query;
                        break;
                    case 3:
                        this.activeItem.status = !this.activeItem.status;
                        this.list = [];
                        this.getList();
                        this.tabs[4].query = false;
                        break;
                    default:
                        this.list = [];
                        this.getList();
                        this.tabs[4].query = false;
                }
            },
            /**
             * 根据搜索条件获取列表
             */
            getList() {
                this.loading = true;
                this.$axios.post('/shoping/list1', {}).then((res) => {
                    console.log(res.data)
                    this.list = this.list.concat(res.data);
                    this.loading = false;
                })
            },
            /**
             * 前往详情页
             */
            toDetail(item) {
                this.$router.push({name: 'Detail', query: {data: JSON.stringify(item)}})
            },
            /**
             * 通过积分搜索
             */
            queryIntegral() {
                if (!this.queryData.integralMin || !this.queryData.integralMax) {
                    return this.$notify('请填写正确的积分区间');
                }
                this.getList();
                this.activeItem.query = false;
            },
            /**
             * 重置积分
             */
            resetIntegral() {
                this.queryData.integralMax = '';
                this.queryData.integralMin = '';
            }
        }
    }
</script>

<style lang="less">
    .home {
        .padding {
            padding: 0 0.24rem;
        }

        .top-flex-box {
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 3000;
            background-color: white;
            max-width: 100%;
        }

        .list-top-box {
            height: 2.02rem;
            width: 100%;
        }

        .shop-search {
            margin-top: 0.24rem;
            padding: 0.12rem 0.24rem;
            height: 0.6rem;
            line-height: 0.6rem;
            border-top: 1px solid #ededed;
            .van-search{padding-left: 0}
            .van-search__content{background-color: #f4f4f4;height: 0.6rem;line-height: 0.6rem;padding-left: 0.4rem;border-radius: 0.3rem;
            input{height: 0.6rem;}}
            .van-search__action{font-size: 0.3rem;padding-left: 0.2rem;}
            .van-field__left-icon{line-height: 0.6rem;
                .van-icon{font-size: 0.3rem!important;}
            }
        }

        .tabs {
            display: flex;
            height: 0.88rem;
            line-height: 0.88rem;
            border-bottom: 1px solid #eff3f6;
            border-top: 1px solid #eff3f6;

            .tab-item {
                width: 20%;
                box-sizing: border-box;
                font-size: 0.3rem;
                position: relative;
                &:nth-child(4){padding-left:0.2rem }
                &:last-child{text-align: center}
            }

            .activeTab {
                color: #ec4125
            }

            .price-icon {
                width: 14px;
                line-height: 0;
                position: absolute;
                top: 0.15rem;
                bottom: 0;
                left: 0.62rem;
                margin: auto;
                transform: scale(0.7);
                .activeIcon {
                    color: #f82222
                }
            }

            .query-icon {
                padding-left: 0.04rem;
                position: absolute;
                transform: translateY(0.03rem)
            }
        }

        .query-dialog {
            .title {
                line-height: 0.76rem;
                color: #666666;
                font-size: 0.28rem;
            }

            .input-box {
                padding-bottom: 0.9rem;

                input {
                    width: 2.3rem;
                    height: 0.48rem;
                    line-height: 0.48rem;
                    border-radius: 0.04rem;
                    border: 1px solid #d2d2d2;
                }
            }

            .button-box {
                .van-button {
                    width: 50%;
                    box-sizing: border-box;
                    height: 0.9rem;
                }
            }
        }

        .van-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .list-item {
            width: 49%;
            text-align: left;

            .img-box {
                min-height: 46vw;
                width: 100%;
            }

            .tag-list {
                padding: 0.16rem 0 0.09rem 0;
                height: 40px;
            }

            .van-tag {
                margin-right: 0.08rem;
            }

            .tag-1 {
                background-color: #e83632 !important;
            }

            .tag-2 {
                background-color: #c3a25e !important;
            }

            .tag-3 {
                background-color: #ffba00 !important;
            }

            .integral {
                padding-top: 0.2rem;
                padding-bottom: 0.4rem;

                .num {
                    color: #ee5740;
                }
            }
        }

        .text-overflew {
            line-height: 0.34rem;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: box;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }

    .van-notify {
        z-index: 4000 !important;
    }
</style>