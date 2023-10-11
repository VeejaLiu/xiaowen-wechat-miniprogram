<template>
    <view class="index">
        <view class="btn">
            <nut-button block color="black" type="primary" @click="goToGenerate">制作纹身</nut-button>
        </view>
    </view>
</template>

<script>
import Taro from '@tarojs/taro';

export default {
    name: 'Index',
    components: {},
    setup() {
        const goToGenerate = () => {
            Taro.navigateTo({
                url: '/pages/index/index',
            });
        };
        return {
            goToGenerate,
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
