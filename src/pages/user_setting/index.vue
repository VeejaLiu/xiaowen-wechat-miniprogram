<template>
    <view class="index">
        <view class="item">
            <view class="content" @click="goToUserAgreement">
                <span>用户服务协议</span>
                <image class="icon" :src="right_arrow"></image>
            </view>
            <view class="line"></view>
        </view>
        <view class="item">
            <view class="content" @click="goToPrivacy">
                <span>隐私政策</span>
                <image class="icon" :src="right_arrow"></image>
            </view>
            <view class="line"></view>
        </view>
        <view class="item">
            <view class="content">
                <button class="feedback-btn" open-type="contact"></button>
                <span>意见反馈</span>
                <image class="icon" :src="right_arrow"></image>
            </view>
            <view class="line"></view>
        </view>
        <view class="logout" @click="doLogOut">
            <view class="btn">退出登录</view>
        </view>
    </view>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import Taro from '@tarojs/taro';
import { ICON_URL } from '../../constant/Urls';
export default {
    name: 'Index',
    components: {},
    setup() {
        const state = reactive({});
        const showPopup = ref(false);

        const goToPrivacy = () => {
            console.log('goToPrivacy');
            Taro.navigateTo({
                url: '/pages/privacy_policy/index',
            });
        };
        const goToUserAgreement = () => {
            console.log('goToUserAgreement');
            Taro.navigateTo({
                url: '/pages/user_service_agreement/index',
            });
        };

        const doLogOut = () => {
            Taro.clearStorageSync();
            Taro.redirectTo({
                url: '/pages/index/index',
            });
        };

        return {
            ...toRefs(state),
            goToPrivacy,
            goToUserAgreement,
            doLogOut,
            showPopup,
            right_arrow: ICON_URL.BASE.right_arrow
        };
    },
};
</script>

<style lang="scss">
.index {
    font-family: 'PingFang SC';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 32rpx;
    color: #000000;
    letter-spacing: 0.3rpx;
    padding: 20rpx;
    .item {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8rpx;
        .content {
            display: flex;
            height: 96rpx;
            justify-content: space-between;
            gap: 24rpx;
            padding: 24rpx;
            image {
                width: 52rpx;
                height: 52rpx;
            }
        }
    }
    .logout {
        margin-top: 132rpx;
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 24rpx;
        .btn {
            width: 100%;
            height: 84rpx;
            border: 2rpx solid #131619;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 40rpx;
        }
    }
}
.line {
    margin: 0 24rpx;
    height: 1rpx;
    background-color: #E8E8E8;
}
.feedback-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
}
</style>
