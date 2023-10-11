<template>
    <view class="index">
        <nut-avatar size="large" @click="goToMy">
            <img
                src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
                alt=""
            />
        </nut-avatar>
        <nut-button block color="" @click="">剩余钻石: 110000 </nut-button>

        <view class="text"> 风格: 点刺 </view>
        <view class="text"> 描述：xxxxxxxxxxxxx </view>

        <nut-grid :border="false" :column-num="2" square>
            <nut-grid-item v-for="(image, index) in imageData" :key="index">
                <img mode="heightFix" :src="image" alt="" />
            </nut-grid-item>
        </nut-grid>
        <view class="text"> 预计等待时间 xx 秒 </view>
        <view class="btn">
            <nut-button color="black" @click="">生成好了通知我</nut-button>
        </view>
        <view class="btn">
            <nut-button color="black" @click="goToGenerate">新的制作</nut-button>
        </view>
    </view>
</template>

<script>
import { ref } from 'vue';
import Taro from '@tarojs/taro';

export default {
    name: 'Index',
    components: {},
    setup() {
        const goToMy = () => {
            Taro.navigateTo({
                url: '/pages/my/index',
            });
        };
        const handleClick = () => {};
        const imageData = ref([
            'https://pss.bdstatic.com/static/superman/img/logo/logo_white-d0c9fe2af5.png',
            'https://pss.bdstatic.com/static/superman/img/logo/logo_white-d0c9fe2af5.png',
            'https://pss.bdstatic.com/static/superman/img/logo/logo_white-d0c9fe2af5.png',
            'https://pss.bdstatic.com/static/superman/img/logo/logo_white-d0c9fe2af5.png',
        ]);
        const goToGenerate = () => {
            Taro.navigateTo({
                url: '/pages/index/index',
            });
        };
        return {
            imageData,
            handleClick,
            goToGenerate,
            goToMy,
        };
    },
};
</script>

<style lang="scss">
.index {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>
