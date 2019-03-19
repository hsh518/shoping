<template>
    <div class="detail">
        <div>
            {{$route.query.data}}
        </div>
        <van-button type="primary" @click="goBack" size="large">返回</van-button>
    </div>
</template>

<script>
    export default {
        name: "Detail",
        data() {
          return {
              scrollTop: 0
          }
        },
        created() {
          document.documentElement.scrollTop = 0;
        },
        methods: {
            /**
             * 返回
             */
            goBack () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="less">
    .detail{text-align: center;
        .van-button{margin-top: 4rem;width: 50vw;}
    }
</style>