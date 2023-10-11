<template>
    <view class="index">
        <!-- 个人信息-->
        <nut-avatar size="large" @click="goToMy">
            <img
                src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
                alt=""
            />
        </nut-avatar>
        <view class="text"> Veeja Liu</view>
        <nut-button block color="" @click="">剩余钻石: 110000</nut-button>

        <!-- 生成历史-->
        <view class="text">生成历史</view>
        <view class="text"> 历史1</view>
        <view class="text"> 风格 时间 描述 图片</view>

        <view class="text"> 历史2</view>
        <view class="text"> 风格 时间 描述 图片</view>
        <view class="text"> 历史3</view>
        <view class="text"> 风格 时间 描述 图片</view>
        <view class="text"> 历史4</view>
        <view class="text"> 风格 时间 描述 图片</view>
        <view class="text"> ...</view>

        <!-- 生成按钮 -->
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
        const handleClick = () => {};
        const goToGenerate = () => {
            Taro.navigateTo({
                url: '/pages/index/index',
            });
        };

        return {
            goToGenerate,
            handleClick,
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
