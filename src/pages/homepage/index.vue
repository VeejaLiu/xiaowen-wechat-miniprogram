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

export default {
    name: 'Index',
    components: {},

    // On Load
    onLoad() {
        console.log('[/homepage/index] onLoad()');
        Taro.login({
            success: function (res) {
                if (res.code) {
                    console.log('[/homepage/index] Taro.login success');
                    console.log(`[/homepage/index] res.code: ${res.code}`);
                    Taro.request({
                        method: 'POST',
                        url: 'http://localhost:10100/api/v1/login',
                        data: { code: res.code },
                        success: function (res) {
                            console.log('[/homepage/index] Taro.request success');
                            // result.userId = user.user_id;
                            // result.nickname = user.nickname;
                            // result.sessionKey = user.session_key;
                            console.log(`[/homepage/index] res.data: ${JSON.stringify(res.data)}`);
                            const { userId, nickname, sessionKey, inviteCode } = res.data;
                            Taro.setStorageSync('userId', userId);
                            Taro.setStorageSync('nickname', nickname);
                            Taro.setStorageSync('sessionKey', sessionKey);
                            Taro.setStorageSync('inviteCode', inviteCode);
                        },
                        fail: function (err) {
                            console.log('[/homepage/index] Taro.request fail');
                            console.log(`[/homepage/index] err: ${JSON.stringify(err)}`);
                        },
                    });
                } else {
                    console.log('[/homepage/index] Taro.login fail');
                }
            },
        });
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

        const doGetPhoneNumber = async (e) => {
            console.log('[doGetPhoneNumber] doGetPhoneNumber');

            console.log('[doGetPhoneNumber] Checkbox.value: ', checkbox.value);
            if (!checkbox.value) {
                Taro.showToast({
                    title: '请先同意《用户服务协议》和《隐私政策》',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }

            const sessionKey = await Taro.getStorageSync('sessionKey');
            const userId = await Taro.getStorageSync('userId');
            if (!sessionKey || !userId) {
                console.log('[doGetPhoneNumber] sessionKey or userId not exist');
                Taro.showToast({
                    title: '登录失败,请重试',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }

            if (e.detail.errMsg === 'getPhoneNumber:ok') {
                console.log('[doGetPhoneNumber] getPhoneNumber ok');
                const inviteBy = await Taro.getStorageSync('inviteBy');
                const callBackendResult = await Taro.request({
                    header: {
                        'content-type': 'application/json',
                        session_key: sessionKey,
                    },
                    method: 'POST',
                    url: 'http://localhost:10100/api/v1/login/getPhoneNumber',
                    data: {
                        user_id: userId,
                        inviteBy: inviteBy,
                        code: e.detail.code,
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                    },
                });
                console.log(`[doGetPhoneNumber] callBackendResult.data: ${callBackendResult.data}`);
                const { success, data } = callBackendResult.data;
                console.log(`[doGetPhoneNumber] success: ${success}`);
                console.log(`[doGetPhoneNumber] data: ${JSON.stringify(data)}`);
                if (success === true) {
                    const { token, openid } = data;

                    Taro.setStorageSync('token', token);
                    Taro.setStorageSync('openid', openid);

                    console.log('[doGetPhoneNumber] call backend ok');
                    await Taro.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000,
                    });

                    await Taro.redirectTo({
                        url: '/pages/index/index',
                    });
                } else {
                    console.log('[doGetPhoneNumber] call backend fail');
                    Taro.showToast({
                        title: '登录失败,请重试',
                        icon: 'none',
                        duration: 2000,
                    });
                }
            } else {
                console.log('[doGetPhoneNumber] getPhoneNumber fail');
                Taro.showToast({
                    title: '获取手机号码失败,请重试',
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
