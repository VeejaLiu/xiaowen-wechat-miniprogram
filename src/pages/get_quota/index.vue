<template>
    <view class="index">
        <!--        钻石图标-->
        <view class=""> 💎</view>

        ====================

        <!--        充钱-->
        <view class="text">充钱</view>
        <view class="btn">
            <nut-button color="black" type="primary" @click="doCharge">充钱</nut-button>
        </view>
        <!--        邀请好友-->
        <view class="text">邀请好友</view>
        <view class="btn">
            <nut-button color="black" type="primary" @click="doInvite">邀请好友</nut-button>
        </view>
        <!--        看广告-->
        <view class="text">看广告</view>
        <view class="btn">
            <nut-button color="black" type="primary" @click="doWatchAd">看广告</nut-button>
        </view>

        =====================
        <!--        钻石变更记录-->
        <view class="text">钻石变更记录</view>
        <view class="text"> 时间 描述 钻石变更</view>
        <view class="text"> 成功邀请好友 +25</view>
        <view class="text"> 成功邀请好友 +25</view>
        <view class="text"> 成功邀请好友 +25</view>
        <view class="text"> 成功邀请好友 +25</view>
        <view class="text"> 成功邀请好友 +25</view>
        <view class="text"> 成功邀请好友 +25</view>
        <view class="text"> 成功邀请好友 +25</view>
        <view class="text"> 成功邀请好友 +25</view>
        =====================

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
