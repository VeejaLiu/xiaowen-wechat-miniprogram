<template>
    <view class="home_page_root">
        <nut-button id="homepage_login_btn" block @click="doPopup">
            <p id="homepage_login_btn_text">开始制作</p>
        </nut-button>

        <nut-popup
            id="homepage_popup"
            position="bottom"
            closeable
            round
            :style="{ height: '55%' }"
            :overlay="false"
            :safe-area-inset-bottom="true"
            :destroy-on-close="false"
            v-model:visible="showPopup"
        >
            <img id="homepage_popup_logo" :src="logoImage" />
            <nut-button
                id="homepage_popup_login_btn"
                open-type="getPhoneNumber"
                @getphonenumber="doGetPhoneNumber"
                block
            >
                <p id="homepage_login_btn_text">手机号快捷登录</p>
            </nut-button>
            <nut-button id="homepage_popup_cancel_login_btn" block @click="showPopup = false">
                <p id="homepage_login_btn_text">暂不登录</p>
            </nut-button>
            <nut-checkbox id="homepage_popup_checkbox" label="" v-model="checkbox">
                <p>
                    我同意
                    <b @click.stop="goToUserAgreement">《用户服务协议》</b>
                    和
                    <b @click.stop="goToPrivacy">《隐私政策》</b>
                </p>
            </nut-checkbox>
        </nut-popup>
    </view>
</template>

<script lang="js">
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import logoImage from '../../../assets/images/homepage_login_popup_logo.png';
import './index.scss';

async function login() {
    console.log('login');
    await Taro.checkSession({
        success() {
            console.log('checkSession success');
            const token = Taro.getStorageSync('token');
            const sessionKey = Taro.getStorageSync('sessionKey');
            if (token && sessionKey) {
                console.log('token: ', token);
                console.log('sessionKey: ', sessionKey);
                Taro.navigateTo({
                    url: '/pages/index/index',
                });
            }
        },
        async fail() {
            console.log('checkSession fail');
            const loginRes = await Taro.login();
            console.log('loginRes: ', loginRes);

            const res = await Taro.request({
                method: 'POST',
                url: 'http://localhost:10100/api/v1/login',
                data: { code: loginRes.code },
            });
            console.log('res.data: ', res.data);

            const { token, sessionKey } = res.data;
            Taro.setStorageSync('token', token);
            Taro.setStorageSync('sessionKey', sessionKey);
        },
    });
}

export default {
    name: 'Index',
    components: {},

    // On Load
    onLoad() {
        console.log('[/homepage/index] onLoad()');
    },
    // On ready
    onReady() {
        console.log('[/homepage/index] onReady()');
    },

    // On show
    onShow() {
        console.log('[/homepage/index] onShow()');
    },

    setup() {
        const showPopup = ref(false);
        let checkbox = ref(false);

        const doAgree = () => {
            console.log('doAgree');
            console.log('before checkbox.value: ', checkbox.value);
            checkbox = !checkbox;
            console.log('after checkbox.value: ', checkbox.value);
        };
        const doPopup = () => {
            console.log('doPopup');
            showPopup.value = true;
        };

        const goToIndex = () => {
            console.log('goToIndex');
            console.log('Checkbox.value: ', checkbox.value);
            if (checkbox.value) {
                login().then(() => {
                    console.log('login successfully!');
                    Taro.navigateTo({
                        url: '/pages/index/index',
                    });
                });
            } else {
                Taro.showToast({
                    title: '请先同意《用户服务协议》和《隐私政策》',
                    icon: 'none',
                    duration: 2000,
                });
            }
        };

        const doGetPhoneNumber = async (e) => {
            console.log('doGetPhoneNumber');

            console.log('Checkbox.value: ', checkbox.value);
            if (!checkbox.value) {
                Taro.showToast({
                    title: '请先同意《用户服务协议》和《隐私政策》',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }

            /*
             * Login
             */
            const res = await Taro.login();
            console.log(res);
            const loginRes = await Taro.request({
                method: 'POST',
                url: 'http://localhost:10100/api/v1/login',
                data: {
                    code: res.code,
                },
            });
            console.log(`loginRes.data: ${JSON.stringify(loginRes.data)}`);
            Taro.setStorageSync('token', loginRes.data.token);
            console.log(`loginRes.data.token: ${loginRes.data.token}`);
            Taro.setStorageSync('sessionKey', loginRes.data.sessionKey);
            console.log(`loginRes.data.sessionKey: ${loginRes.data.sessionKey}`);

            if (e.detail.errMsg === 'getPhoneNumber:ok') {
                console.log('getPhoneNumber ok');
                const callBackendResult = await Taro.request({
                    header: {
                        'content-type': 'application/json',
                        token: loginRes.data.token,
                        session_key: loginRes.data.sessionKey,
                    },
                    method: 'POST',
                    url: 'http://localhost:10100/api/v1/login/getPhoneNumber',
                    data: {
                        code: e.detail.code,
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                    },
                });
                console.log(callBackendResult.data);
                if (callBackendResult.data === true) {
                    console.log('call backend ok');
                    Taro.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000,
                    });
                    Taro.navigateTo({
                        url: '/pages/index/index',
                    });
                } else {
                    console.log('call backend fail');
                    Taro.showToast({
                        title: '登录失败,请重试',
                        icon: 'none',
                        duration: 2000,
                    });
                }
            } else {
                console.log('getPhoneNumber fail');
                console.log('getPhoneNumber fail');
                Taro.showToast({
                    title: '登录失败,请重试',
                    icon: 'none',
                    duration: 2000,
                });
            }
        };

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

        return {
            doPopup,
            doAgree,
            goToIndex,
            goToPrivacy,
            goToUserAgreement,
            doGetPhoneNumber,
            showPopup,
            logoImage,
            checkbox,
        };
    },
};
</script>
