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
            <nut-button id="homepage_popup_login_btn" block @click="goToIndex">
                <p id="homepage_login_btn_text">手机号快捷登录</p>
            </nut-button>
            <nut-button id="homepage_popup_cancel_login_btn" block @click="showPopup = false">
                <p id="homepage_login_btn_text">暂不登录</p>
            </nut-button>
            <nut-checkbox id="homepage_popup_checkbox" label="我同意《用户服务协议》和《隐私政策》" v-model="checkbox">
                我同意《用户服务协议》和《隐私政策》
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
    const existingToken = Taro.getStorageSync('token');
    const existingSessionKey = Taro.getStorageSync('sessionKey');
    if (existingToken && existingSessionKey) {
        console.log('existingToken: ', existingToken);
        console.log('existingSessionKey: ', existingSessionKey);
        return;
    }
    console.log('login');
    const loginRes = await Taro.login();
    console.log('loginRes: ', loginRes);

    const res = await Taro.request({
        method: 'POST',
        url: 'http://localhost:10100/api/v1/login',
        data: {
            code: loginRes.code,
        },
    });
    console.log('res.data: ', res.data);

    const { token, sessionKey } = res.data;
    Taro.setStorageSync('token', token);
    Taro.setStorageSync('sessionKey', sessionKey);
}

export default {
    name: 'Index',
    components: {},

    // On Load
    onLoad() {
        console.log('onLoad');
        login().then(() => {
            console.log('login successfully!');
        });
    },
    // On ready
    onReady() {
        console.log('onReady');
    },

    // On show
    onShow() {
        console.log('onShow');
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
                Taro.navigateTo({
                    url: '/pages/index/index',
                });
            } else {
                Taro.showToast({
                    title: '请先同意《用户服务协议》和《隐私政策》',
                    icon: 'none',
                    duration: 2000,
                });
            }
        };
        return {
            doPopup,
            doAgree,
            goToIndex,
            showPopup,
            logoImage,
            checkbox,
        };
    },
};
</script>
