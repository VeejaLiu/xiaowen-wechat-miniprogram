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

<style lang="scss">
.home_page_root {
    height: 100vh;
    width: 100vw;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-image: url('../../../assets/images/homepage_bg_img.jpg');
    background-size: cover;
}

#homepage_login_btn {
    position: absolute;
    left: 0;
    right: 0;
    margin: 80vh auto;
    width: 62%;
    transform: translateY(-50%);
    background: radial-gradient(
            215.83% 83.33% at 100% 0%,
            rgba(255, 255, 255, 0.7) 0%,
            rgba(255, 255, 255, 0.07) 51.11%,
            rgba(255, 255, 255, 7e-5) 100%
        ),
        linear-gradient(46.59deg, rgba(13, 231, 255, 9e-5) 2.92%, rgba(13, 231, 255, 0.63) 88.7%), #9ff432;
    border: 0;
    border-radius: 131px;
}

#homepage_login_btn_text {
    font-family: 'PingFang SC', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.05em;
    color: #010101;
}

#homepage_popup {
    background-color: rgba(0, 0, 0, 0.5);
}

#homepage_popup_logo {
    position: absolute;
    left: 0;
    right: 0;
    margin: 10vh auto;
    //height: auto; /* 高度设置为自动，以保持宽高比 */
    //width: 70rem;
}
#homepage_popup_login_btn {
    position: absolute;
    left: 0;
    right: 0;
    margin: 30vh auto;
    width: 62%;
    transform: translateY(-50%);
    background: radial-gradient(
            215.83% 83.33% at 100% 0%,
            rgba(255, 255, 255, 0.7) 0%,
            rgba(255, 255, 255, 0.07) 51.11%,
            rgba(255, 255, 255, 7e-5) 100%
        ),
        linear-gradient(46.59deg, rgba(13, 231, 255, 9e-5) 2.92%, rgba(13, 231, 255, 0.63) 88.7%), #9ff432;
    border: 0;
    border-radius: 131px;
}

#homepage_popup_cancel_login_btn {
    position: absolute;
    left: 0;
    right: 0;
    margin: 38vh auto;
    width: 62%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0);
    color: gray;
    border: 0;
    border-radius: 131px;
}

#homepage_popup_checkbox {
    position: absolute;
    left: 0;
    right: 0;
    margin: 45vh auto;
    width: 80%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0);
    border: 0;
    border-radius: 131px;
}
</style>
