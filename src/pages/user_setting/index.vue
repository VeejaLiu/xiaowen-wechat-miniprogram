<template>
    <view class="index">
        <button @click="goToUserAgreement">用户服务协议</button>
        <button @click="goToPrivacy">隐私政策</button>
        <button @click="doLogOut">退出登录</button>
    </view>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Taro from '@tarojs/taro';
export default {
    name: 'Index',
    components: {},
    setup() {
        const state = reactive({});

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
