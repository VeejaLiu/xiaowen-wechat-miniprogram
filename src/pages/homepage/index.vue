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
            <img id="homepage_popup_logo" :src="logoImage" width="70px" height="70px" />
            <nut-button id="homepage_popup_login_btn" block @click="goToGenerate">
                <p id="homepage_login_btn_text">手机号快捷登录</p>
            </nut-button>
            <nut-button id="homepage_popup_cancel_login_btn" block @click="showPopup = false">
                <p id="homepage_login_btn_text">暂不登录</p>
            </nut-button>
            <nut-checkbox id="homepage_popup_checkbox" label="我同意《用户服务协议》和《隐私政策》" v-model="checkbox">
                我同意《用户服务协议》和《隐私政策》
                <template #checkedIcon>
                    <img :src="checkedIcon" width="20px" height="20px" />
                </template>
            </nut-checkbox>
        </nut-popup>
    </view>
</template>

<script lang="js">
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import logoImage from '../../../assets/images/homepage_login_popup_logo.png';
import checkedIcon from '../../../assets/images/checkbox_checked_icon.png';
import './index.scss';

export default {
    name: 'Index',
    components: {},
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

        const goToGenerate = () => {
            console.log('goToGenerate');
            console.log('Checkbox.value: ', checkbox.value);
            if (checkbox.value) {
                Taro.navigateTo({
                    url: '/pages/generate/index',
                });
            } else {
                Taro.showToast({
                    title: '请先同意《用户服务协议》和《隐私政策》',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }
        };
        return {
            doPopup,
            doAgree,
            goToGenerate,
            showPopup,
            logoImage,
            checkedIcon,
            checkbox,
        };
    },
};
</script>
