<template>
    <view class="index">
        <button @click="goToUserAgreement">用户服务协议</button>
        <button @click="goToPrivacy">隐私政策</button>
        <!-- 意见反馈-->
        <button @click="showToFeedback">意见反馈</button>
        <button @click="doLogOut">退出登录</button>
    </view>

    <!-- TODO 样式需要调整 @veeja-->
    <nut-popup
        position="bottom"
        closeable
        round
        :style="{ height: '80%' }"
        :overlay="false"
        :safe-area-inset-bottom="true"
        :destroy-on-close="false"
        v-model:visible="showPopup"
    >
        <nut-rate v-model="rate" />
        <nut-textarea v-model="textarea" limit-show max-length="500" />
        <nut-button type="primary" round block @click="doSubmitFeedback">提交</nut-button>
    </nut-popup>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import Taro from '@tarojs/taro';
import { BACKEND_URL } from '../../constant/Urls';
export default {
    name: 'Index',
    components: {},
    setup() {
        const state = reactive({});
        const showPopup = ref(false);
        const rate = ref(5);
        const textarea = ref('');

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

        const showToFeedback = () => {
            console.log('showToFeedback');
            showPopup.value = true;
        };

        const doSubmitFeedback = async () => {
            console.log('doSubmitFeedback');

            const rateValue = Number(rate.value);
            const textareaValue = textarea.value;
            if (rateValue < 1 || rateValue > 5) {
                Taro.showToast({
                    title: '请给出评分',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }

            if (textareaValue.trim() === '') {
                Taro.showToast({
                    title: '请填写反馈内容',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }

            await Taro.request({
                url: `${BACKEND_URL}/api/v1/feedback/`,
                method: 'POST',
                header: {
                    'content-type': 'application/json',
                    token: await Taro.getStorageSync('token'),
                },
                data: {
                    rate: rate.value,
                    content: textarea.value,
                },
            });

            await Taro.showToast({
                title: '感谢您的反馈!!!',
                icon: 'success',
                duration: 2000,
            });

            showPopup.value = false;
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
            showToFeedback,
            doSubmitFeedback,
            doLogOut,
            showPopup,
            rate,
            textarea,
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
